// biome-ignore lint/nursery/noCommonJs:
const { extendTheme } = require('@pigment-css/vite-plugin');

// biome-ignore lint/correctness/noUnusedVariables:
function reactUniversal(options = {}) {
  return {
    name: 'react-universal',
    config: (config) => {
      config.define = {
        ...config.define,
        'process.env.TEST_NATIVE_PLATFORM': JSON.stringify(false),
      };
    },
  };
}

// biome-ignore lint/nursery/noCommonJs:
module.exports = {
  extendTheme,
  reactUniversal,
};
