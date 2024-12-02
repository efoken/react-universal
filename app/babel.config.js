/** @type {import('@babel/core').ConfigFunction} */
const config = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

// biome-ignore lint/nursery/noCommonJs:
module.exports = config;
