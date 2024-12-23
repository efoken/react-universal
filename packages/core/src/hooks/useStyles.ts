import memo from '@emotion/weak-memoize';
import { type AnyObject, isObject, mergeDeep } from '@react-universal/utils';
import { useMemo } from 'react';
import { StyleRuntime } from '../StyleRuntime';
import { useTheme } from '../contexts/ThemeContext';
import { css } from '../css';
import { interpolate } from '../interpolate';
import { styleFunctionSx } from '../styleFunctionSx';
import type { SxProps } from '../sxConfig';
import type { ExtractTheme, Theme } from '../theme';
import type { StyleInterpolation } from '../types';
import { processStyles } from '../utils/processStyles';

const transformToCSSVariables = memo((theme: Theme) => {
  const { breakpoints, sxConfig, ...obj } = theme;

  const traverse = (obj: any, currentKey: string) =>
    Object.entries(obj).reduce<any>((acc, [key, value]) => {
      const newKey = currentKey ? `${currentKey}-${key}` : key;
      if (isObject(value) && value != null) {
        if (Object.hasOwn(value, '_light') && Object.hasOwn(value, '_dark')) {
          acc[key] = `var(--${newKey})`;
        } else {
          acc[key] = traverse(value, newKey);
        }
      } else {
        acc[key] = `var(--${newKey})`;
      }
      return acc;
    }, {});

  return mergeDeep<
    ExtractTheme<Omit<Theme, 'breakpoints' | 'sxConfig'>> & Pick<Theme, 'breakpoints' | 'sxConfig'>
  >(traverse(obj, ''), { breakpoints, sxConfig });
});

export function useStyles(
  styles: StyleInterpolation<AnyObject>,
  {
    skipSx,
    sx,
    ...props
  }: {
    skipSx: boolean;
    sx?: SxProps;
    [key: string]: any;
  },
): AnyObject {
  const theme = useTheme();

  const stylesheet = useMemo(() => {
    const _theme = transformToCSSVariables(theme);
    const _styles = processStyles({ ...props, runtime: StyleRuntime, theme: _theme }, styles);

    return css.create({
      style: interpolate.call(
        { ...props, runtime: StyleRuntime, theme: _theme },
        _styles,
        !skipSx && styleFunctionSx({ sx, theme: _theme as any }),
      ),
    });
    // biome-ignore lint/correctness/useExhaustiveDependencies:
  }, [props, skipSx, styles, sx, theme]);

  return stylesheet(theme, StyleRuntime).style;
}
