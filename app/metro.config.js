const { getDefaultConfig } = require('expo/metro-config');
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
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
