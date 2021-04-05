module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@rolledex/ui': '../../libs/ui/src/index.ts',
          },
        },
      ],
    ],
  };
};
