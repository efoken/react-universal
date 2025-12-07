declare module 'eslint-config-biome' {
  import type { Linter } from 'eslint';
  declare const biome: {
    rules: Linter.RulesRecord;
  };
  export default biome;
}
