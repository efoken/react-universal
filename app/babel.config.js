/** @type {import('@babel/core').ConfigFunction} */
const config = (api) => {
  api.cache.forever();
  return {
    presets: ['babel-preset-expo'],
    plugins: [['@react-universal/babel-plugin', { root: 'src' }]],
  };
};

module.exports = config;
