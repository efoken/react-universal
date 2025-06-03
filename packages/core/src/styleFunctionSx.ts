import type { AnyObject } from '@react-universal/utils';
import {
  capitalize,
  get,
  isArray,
  isFunction,
  isObject,
  isString,
  mergeDeep,
  runIfFunction,
} from '@react-universal/utils';
import { handleBreakpoints } from './breakpoints';
import type { SxConfig, SxProps, SxStyleObject } from './sxConfig/defaultSxConfig';
import { defaultSxConfig } from './sxConfig/defaultSxConfig';
import type { Theme } from './theme/defaultTheme';
import type { StyleValues } from './types';

function objectsHaveSameKeys(...objs: AnyObject[]) {
  const keys = new Set(
    objs.reduce<string[]>((acc, obj) => {
      acc.push(...Object.keys(obj));
      return acc;
    }, []),
  );
  return objs.every((obj) => keys.size === Object.keys(obj).length);
}

function getStyleValue(
  themeMapping: unknown,
  transform: ((propValue: string | number) => string | number) | undefined,
  propValueFinal: any,
  userValue = propValueFinal,
) {
  let value: any;

  if (isFunction(themeMapping)) {
    value = themeMapping(propValueFinal);
  } else if (isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else if (isObject(themeMapping)) {
    value = get(themeMapping, propValueFinal, userValue);
  } else {
    value = userValue;
  }

  if (transform) {
    // @ts-expect-error: Last 2 arguments are missing in declaration on purpose.
    value = transform(value, userValue, themeMapping);
  }

  return value;
}

function getThemeValue(
  propName: keyof SxConfig,
  propValue: string | number | AnyObject,
  theme: Theme,
  config: SxConfig,
) {
  const props = {
    [propName]: propValue,
    theme,
  };

  const options = config[propName];

  if (!options) {
    return { [propName]: propValue };
  }

  const { cssProperty = propName, themeKey, transform, style } = options;

  if (propValue == null) {
    return;
  }

  const themeMapping = get(theme, themeKey, {});

  if (style) {
    return style(props);
  }

  const styleFromPropValue = (propValueFinal: unknown): AnyObject => {
    let value = getStyleValue(themeMapping, transform, propValueFinal);

    if (propValueFinal === value && isString(propValueFinal)) {
      // Haven't found value
      value = getStyleValue(
        themeMapping,
        transform,
        `${propName}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`,
        propValueFinal,
      );
    }

    if (cssProperty === false) {
      return value;
    }

    return {
      [cssProperty]: value,
    };
  };

  return handleBreakpoints({ theme }, propValue, styleFromPropValue);
}

export interface StyleFunctionSx {
  (props: {
    sx?: SxProps;
    theme: Theme;
    [key: string]: any;
  }): StyleValues | undefined | (StyleValues | undefined)[];
  filterProps?: string[];
}

export function createStyleFunctionSx(): StyleFunctionSx {
  return function styleFunctionSx({ sx, theme }) {
    if (!sx) {
      return;
    }

    const config: SxConfig = theme.sxConfig ?? defaultSxConfig;

    /**
     * Receive `sxInput` as object or callback and then recursively check
     * keys & values to create media query object styles. The result will be
     * used in `styled`.
     */
    const traverse = (sxInput: boolean | Exclude<SxProps, readonly any[]>) => {
      let sxObject: SxStyleObject;
      if (isFunction(sxInput)) {
        sxObject = sxInput(theme);
      } else if (isObject(sxInput)) {
        sxObject = sxInput;
      } else {
        return;
      }
      if (!sxObject) {
        return;
      }

      let css: StyleValues = {};

      const mergeCss = (item: any) => mergeDeep(css, item, { clone: false });

      for (const propName of Object.keys(sxObject) as (keyof typeof sxObject)[]) {
        const value = runIfFunction<unknown, [Theme]>(sxObject[propName], theme);

        if (value != null) {
          if (isObject(value)) {
            if (config[propName]) {
              css = mergeCss(getThemeValue(propName, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({ theme }, value, (x) => ({
                [propName]: x,
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                // @ts-expect-error: In this case `propName` is a breakpoint.
                css[propName] = styleFunctionSx({ sx: value, theme });
              } else {
                css = mergeCss(breakpointsValues);
              }
            }
          } else {
            css = mergeCss(getThemeValue(propName, value, theme, config));
          }
        }
      }

      return css;
    };

    return isArray(sx)
      ? (sx as readonly any[]).map(traverse)
      : traverse(sx as Exclude<SxProps, readonly any[]>);
  };
}

export const styleFunctionSx = createStyleFunctionSx();

styleFunctionSx.filterProps = ['sx'];
