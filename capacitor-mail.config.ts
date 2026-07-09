import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.xmed.mail',
  appName: 'XMed Mail',
  webDir: 'out',
  server: {
    url: 'https://mail.x-med.co',
    cleartext: true
  }
};

export default config;
