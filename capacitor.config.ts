import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.xmed.admin',
  appName: 'XMed Admin',
  webDir: 'out',
  server: {
    url: 'https://admin.x-med.co',
    cleartext: true
  }
};

export default config;
