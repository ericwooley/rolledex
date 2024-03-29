export default {
  name: 'rolledex',
  slug: 'rolledex',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './apps/expo/src/assets/icon.png',
  splash: {
    image: './apps/expo/src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './apps/expo/src/assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './apps/expo/src/assets/favicon.png',
  },
  extra: {
    API_URL: 'http://localhost:8080/v1/graphql',
    test: 'thing',
  },
};
