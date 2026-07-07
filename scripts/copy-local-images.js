const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'x-med');
const destDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory ${srcDir} does not exist!`);
  process.exit(1);
}

const files = fs.readdirSync(srcDir);
let count = 0;

files.forEach((file) => {
  if (file === '.DS_Store') return;
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  
  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, destPath);
    count++;
  }
});

console.log(`Successfully copied ${count} images from x-med to public/images.`);
