const config = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

module.exports = config;
