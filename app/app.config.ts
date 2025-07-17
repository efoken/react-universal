import type { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: 'react-universal-app',
  slug: 'react-universal-app',
  version: '1.0.0',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.react-universal.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: 'com.react_universal.app',
  },
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      'expo-screen-orientation',
      {
        initialOrientation: 'DEFAULT',
      },
    ],
  ],
};

export default config;
