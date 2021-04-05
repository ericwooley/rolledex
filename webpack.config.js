const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { join } = require('path');
const tsconfig = require('./tsconfig.base.json');

module.exports = async function (env, argv) {
  try {
    const config = await createExpoWebpackConfigAsync(env, argv);
    const nxAlias = tsconfig.compilerOptions.paths;
    const nxAliasConfig = Object.fromEntries(
      Object.entries(nxAlias).map(([key, res]) => {
        const value = Array.isArray(res) ? res : [res];
        const updatedValue = value.map((alias) => join(__dirname, alias));
        if (value.length > 1)
          console.warn(
            `too many aliases for ${key}, using ${updatedValue[0]} `
          );
        return [key, updatedValue[0]];
      })
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      ...nxAliasConfig,
    };
    // Customize the config before returning it.
    return config;
  } catch (e) {
    console.log('error adding alias', e);
  }
};
