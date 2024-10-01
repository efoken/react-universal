declare module 'eslint-plugin-react' {
  import type { Linter } from 'eslint';

  const eslintPluginReact: {
    configs: {
      flat: {
        recommended: Linter.FlatConfig;
        all: Linter.FlatConfig;
        'jsx-runtime': Linter.FlatConfig;
      };
    };
  };
  export default eslintPluginReact;
}
