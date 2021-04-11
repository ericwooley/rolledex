/**
 * Export a function. Accept the base config as the only param.
 * @param {Object} options
 * @param {Required<import('webpack').Configuration>} options.config
 * @param {'DEVELOPMENT' | 'PRODUCTION'} options.mode - change the build configuration. 'PRODUCTION' is used when building the static version of storybook.
 */
module.exports = async ({ config, mode }) => {
  // Make whatever fine-grained changes you need
  config.resolve.alias['react-native$'] = 'react-native-web';
  config.resolve.alias['@storybook/react-native'] = '@storybook/react';
  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'url-loader', // or directly file-loader
    include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
  });
  // Return the altered config
  return config;
};
