import path from 'node:path';
import type { BabelFile, NodePath, PluginObj } from '@babel/core';
import * as t from '@babel/types';

export interface ReactUniversalPluginOptions {
  debug?: boolean;
  isLocal?: boolean;
  root: string;
}

export interface ReactUniversalPluginPass {
  cwd: string;
  file: BabelFile & {
    hasReactUniversalImport: boolean;
    hasVariants: boolean;
    styleSheetLocalName: string;
    tagNumber: number;
  };
  filename?: string;
  opts: ReactUniversalPluginOptions;
}

const UnistyleDependency: Record<string, number> = {
  Theme: 0,
  ThemeName: 1,
  AdaptiveThemes: 2,
  Breakpoints: 3,
  Variants: 4,
  ColorScheme: 5,
  Dimensions: 6,
  Orientation: 7,
  ContentSizeCategory: 8,
  Insets: 9,
  PixelRatio: 10,
  FontScale: 11,
  StatusBar: 12,
  NavigationBar: 13,
  Ime: 14,
  Rtl: 15,
};

function toUnistylesDependency(dep: string): number | null {
  return (
    UnistyleDependency[
      Object.keys(UnistyleDependency).find((k) => k.toLowerCase() === dep.toLowerCase()) ?? ''
    ] ?? null
  );
}

function isInsideNodeModules(state: ReactUniversalPluginPass) {
  return state.file.opts.filename?.includes('node_modules');
}

function isReactUniversalStyled(path: NodePath<t.CallExpression>, state: ReactUniversalPluginPass) {
  const { callee } = path.node;
  return (
    state.file.hasReactUniversalImport &&
    t.isCallExpression(callee) &&
    t.isIdentifier(callee.callee) &&
    callee.callee.name === state.file.styleSheetLocalName
  );
}

function stringToUniqueId(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  return absHash % 1000000000;
}

function addStyledId(path: NodePath<t.CallExpression>, state: ReactUniversalPluginPass) {
  const str = state.filename?.replace(state.cwd, '') ?? '';
  const uniqueId = stringToUniqueId(str) + ++state.file.tagNumber;
  path.node.arguments.push(t.numericLiteral(uniqueId));
}

function isPlainValue(node: t.Node): boolean {
  return (
    t.isLiteral(node) ||
    t.isIdentifier(node) ||
    t.isUnaryExpression(node) ||
    t.isArrayExpression(node) ||
    t.isMemberExpression(node) ||
    t.isCallExpression(node)
  );
}

function isRootStyleObject(node: t.ObjectExpression): boolean {
  return node.properties.every((prop) => {
    if (!t.isObjectProperty(prop)) {
      return false;
    }
    const name = t.isIdentifier(prop.key)
      ? prop.key.name
      : t.isStringLiteral(prop.key)
        ? prop.key.value
        : '';
    if (name === 'variants' || name.startsWith('&')) {
      return true;
    }
    return isPlainValue(prop.value);
  });
}

function getFlatDependenciesFromFunction(funcPath: NodePath<t.Node> | NodePath<t.Node>[]) {
  const dependencies = new Set<string>();
  if (!funcPath || Array.isArray(funcPath)) {
    return dependencies;
  }

  funcPath.traverse({
    MemberExpression(memPath) {
      const object = memPath.get('object');
      if (!object.isIdentifier()) {
        return;
      }
      const name = object.node.name;
      if (name === 'theme') {
        dependencies.add('theme');
      }
      if (name === 'runtime' || name === 'rt') {
        const prop = memPath.get('property');
        if (prop.isIdentifier()) {
          const label = prop.node.name;
          if (label === 'ime' || label === 'insets') {
            dependencies.add('ime');
          }
          const mapped = toUnistylesDependency(label);
          if (mapped != null) {
            dependencies.add(label);
          }
        }
      }
    },
  });

  return dependencies;
}

function addDependencies(
  state: ReactUniversalPluginPass,
  object: t.ObjectExpression,
  dependencies: Set<string>,
) {
  for (const prop of object.properties) {
    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key) && prop.key.name === 'variants') {
      dependencies.add('variants');
    }
  }

  const styleDependencies = Array.from(dependencies)
    .map(toUnistylesDependency)
    .filter((x): x is number => x != null);

  if (styleDependencies.length === 0) {
    return;
  }

  if (state.opts.debug) {
    const mappedDeps = styleDependencies
      .map((dep) => Object.keys(UnistyleDependency).find((key) => UnistyleDependency[key] === dep))
      .join(', ');
    console.debug(`${state.filename}: root style dependencies: [${mappedDeps}]`);
  }

  object.properties.push(
    t.objectProperty(
      t.identifier('uni__dependencies'),
      t.arrayExpression(styleDependencies.map((n) => t.numericLiteral(n))),
    ),
  );
}

function toPlatformPath(pathString: string) {
  return process.platform === 'win32'
    ? path.normalize(pathString).replace(/\//g, '\\')
    : pathString;
}

export default function babelPlugin(): PluginObj<ReactUniversalPluginPass> {
  if (process.env.NODE_ENV === 'test') {
    return {
      name: 'react-universal',
      visitor: {},
    };
  }

  return {
    name: 'react-universal',
    visitor: {
      Program: {
        enter(_path, state) {
          if (!state.opts.root) {
            throw new Error('React Universal: Babel plugin requires `root` option to be set.');
          }

          const appRoot = toPlatformPath(
            path.join(state.file.opts.root as string, state.opts.root),
          );
          if (state.file.opts.root === appRoot) {
            throw new Error(
              "React Universal: `root` option can't resolve to project root as it will include node_modules folder.",
            );
          }

          state.file.hasReactUniversalImport = false;
          state.file.hasVariants = false;
          state.file.styleSheetLocalName = '';
          state.file.tagNumber = 0;
        },
      },
      ImportDeclaration(path, state) {
        if (isInsideNodeModules(state)) {
          return;
        }
        if (path.node.source.value.includes('@react-universal/core')) {
          state.file.hasReactUniversalImport = true;
          for (const specifier of path.node.specifiers) {
            if (
              t.isImportSpecifier(specifier) &&
              t.isIdentifier(specifier.imported) &&
              specifier.imported.name === 'styled'
            ) {
              state.file.styleSheetLocalName = specifier.local.name;
            }
          }
        }
      },
      CallExpression(path, state) {
        if (isInsideNodeModules(state)) {
          return;
        }

        if (!isReactUniversalStyled(path, state)) {
          return;
        }

        addStyledId(path, state);

        const arg = t.isAssignmentExpression(path.node.arguments[0])
          ? path.node.arguments[0].right
          : path.node.arguments[0];

        if (t.isObjectExpression(arg)) {
          if (isRootStyleObject(arg)) {
            const dependencies = new Set<string>();
            addDependencies(state, arg, dependencies);
          }
        }

        if (t.isArrowFunctionExpression(arg) || t.isFunctionExpression(arg)) {
          const funcPath = t.isAssignmentExpression(path.node.arguments[0])
            ? path.get('arguments.0.right')
            : path.get('arguments.0');

          const dependencies = getFlatDependenciesFromFunction(funcPath);

          const body = t.isBlockStatement(arg.body)
            ? arg.body.body.find((s) => t.isReturnStatement(s))?.argument
            : arg.body;

          if (body && t.isObjectExpression(body) && isRootStyleObject(body)) {
            addDependencies(state, body, dependencies);
          }
        }
      },
    },
  };
}
