declare module 'eslint-plugin-import' {
  import type { Linter } from 'eslint';

  const eslintPluginImport: {
    flatConfigs: {
      recommended: Linter.FlatConfig;
      errors: Linter.FlatConfig;
      warnings: Linter.FlatConfig;
      react: Linter.FlatConfig;
      'react-native': Linter.FlatConfig;
      electron: Linter.FlatConfig;
      typescript: Linter.FlatConfig;
    };
  };
  export default eslintPluginImport;
}
