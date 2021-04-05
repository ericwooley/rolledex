const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { join } = require('path');

module.exports = async function (env, argv) {
  console.log('async function');
  const config = await createExpoWebpackConfigAsync(env, argv);
  try {
    config.resolve.alias['@rolledex/ui'] = join(
      __dirname,
      './libs/ui/src/index.ts'
    );
  } catch (e) {
    console.log('error adding alias', e);
  }

  console.log('got to here');
  // Customize the config before returning it.
  return config;
};
