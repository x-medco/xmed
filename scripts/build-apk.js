const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const target = process.argv[2];

if (target !== 'admin' && target !== 'mail') {
  console.error('Usage: node scripts/build-apk.js <admin|mail>');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const androidPath = path.join(rootDir, 'android');
const adminBackupPath = path.join(rootDir, '.android-admin');
const mailBackupPath = path.join(rootDir, '.android-mail');

console.log(`Setting up Android environment for: ${target.toUpperCase()}`);

// Ensure out directory exists (required by Capacitor even with server.url configuration)
const webDirPath = path.join(rootDir, 'out');
if (!fs.existsSync(webDirPath)) {
  console.log('Creating dummy "out" directory to satisfy Capacitor asset checks...');
  fs.mkdirSync(webDirPath);
}

// 1. Identify what is currently active in the 'android' folder
let currentActive = null;
if (fs.existsSync(androidPath)) {
  try {
    const buildGradle = fs.readFileSync(path.join(androidPath, 'app', 'build.gradle'), 'utf8');
    if (buildGradle.includes('co.xmed.mail')) {
      currentActive = 'mail';
    } else if (buildGradle.includes('co.xmed.admin')) {
      currentActive = 'admin';
    }
  } catch (e) {
    console.log('Could not identify active android project configuration, assuming admin');
    currentActive = 'admin';
  }
}

// 2. Perform the folder swaps
if (currentActive === target) {
  console.log(`Android folder is already set to ${target}. No swap needed.`);
} else {
  // Swap current active to its backup folder
  if (currentActive === 'admin') {
    console.log('Backing up current admin project to .android-admin');
    if (fs.existsSync(adminBackupPath)) {
      fs.rmSync(adminBackupPath, { recursive: true, force: true });
    }
    fs.renameSync(androidPath, adminBackupPath);
  } else if (currentActive === 'mail') {
    console.log('Backing up current mail project to .android-mail');
    if (fs.existsSync(mailBackupPath)) {
      fs.rmSync(mailBackupPath, { recursive: true, force: true });
    }
    fs.renameSync(androidPath, mailBackupPath);
  }

  // Restore the target from its backup or create new if not exists
  if (target === 'admin') {
    if (fs.existsSync(adminBackupPath)) {
      console.log('Restoring admin project from .android-admin');
      fs.renameSync(adminBackupPath, androidPath);
    } else {
      console.log('No admin backup found, generating a new one...');
      execSync('npx cap add android', { stdio: 'inherit', cwd: rootDir });
    }
  } else if (target === 'mail') {
    if (fs.existsSync(mailBackupPath)) {
      console.log('Restoring mail project from .android-mail');
      fs.renameSync(mailBackupPath, androidPath);
    } else {
      console.log('No mail backup found, generating a new android project for mail...');
      
      // Swap config files temporarily to ensure init uses the mail settings
      const originalConfig = path.join(rootDir, 'capacitor.config.ts');
      const tempConfig = path.join(rootDir, 'capacitor.config.ts.bak');
      const mailConfig = path.join(rootDir, 'capacitor-mail.config.ts');
      
      fs.renameSync(originalConfig, tempConfig);
      fs.copyFileSync(mailConfig, originalConfig);
      
      try {
        execSync('npx cap add android', { stdio: 'inherit', cwd: rootDir });
      } finally {
        fs.unlinkSync(originalConfig);
        fs.renameSync(tempConfig, originalConfig);
      }
    }
  }
}

// 3. Sync the project
const originalConfig = path.join(rootDir, 'capacitor.config.ts');
const tempConfig = path.join(rootDir, 'capacitor.config.ts.bak');
const mailConfig = path.join(rootDir, 'capacitor-mail.config.ts');

if (target === 'mail') {
  console.log('Temporarily swapping to mail configuration...');
  if (fs.existsSync(tempConfig)) {
    fs.unlinkSync(tempConfig);
  }
  fs.renameSync(originalConfig, tempConfig);
  fs.copyFileSync(mailConfig, originalConfig);
}

try {
  console.log('Running: npx cap sync');
  execSync('npx cap sync', { stdio: 'inherit', cwd: rootDir });
} finally {
  if (target === 'mail') {
    console.log('Restoring original configuration...');
    if (fs.existsSync(originalConfig)) {
      fs.unlinkSync(originalConfig);
    }
    fs.renameSync(tempConfig, originalConfig);
  }
}

console.log(`\nSuccess! The "android" folder is now fully configured for: ${target.toUpperCase()}`);
console.log(`To open it in Android Studio run: npx cap open android`);
console.log(`To build the release APK run: cd android && ./gradlew assembleRelease`);
