import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.siecon.req.app',
  appName: 'siecon-req',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      splashFullScreen: true,
      splashImmersive: false,
      spinnerColor: '#383D43',
      launchAutoHide: false,
      backgroundColor: '#000000'
    }
  },
  server: {
    androidScheme: 'http',
    hostname: 'localhost',
    iosScheme: 'http',
    allowNavigation: ['demo.poliview.com.br']
  }
};

export default config;
