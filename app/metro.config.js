// biome-ignore lint/nursery/noCommonJs:
const { getDefaultConfig } = require('expo/metro-config');
// biome-ignore lint/nursery/noCommonJs:
const path = require('node:path');

// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(__dirname);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

// biome-ignore lint/nursery/noCommonJs:
module.exports = config;
