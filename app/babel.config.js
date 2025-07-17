/** @type {import('@babel/core').ConfigFunction} */
const config = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-worklets/plugin', ['@react-universal/babel-plugin', { root: '.' }]],
  };
};

module.exports = config;
