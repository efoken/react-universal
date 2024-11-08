import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { css } from '../css';
import { interpolate } from '../interpolate';
import { styleFunctionSx } from '../styleFunctionSx';
import { StyleRuntime } from '../StyleRuntime';
import type { SxProps } from '../sxConfig';
import type { Theme } from '../theme';
import type { StyleInterpolation } from '../types';
import { processStyles } from '../utils/processStyles';

interface UseStylesReturn {
  styles: AnyObject;
  theme: Theme;
}

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
): UseStylesReturn {
  const theme = useTheme();

  const stylesheet = useMemo(() => {
    const _styles = processStyles({ ...props, runtime: StyleRuntime, theme }, styles);

    return css.create({
      style: interpolate.call(
        { ...props, runtime: StyleRuntime, theme },
        _styles,
        !skipSx && styleFunctionSx({ sx, theme }),
      ),
    });
  }, [props, skipSx, styles, sx, theme]);

  return {
    styles: stylesheet(theme, StyleRuntime).style,
    theme,
  };
}
