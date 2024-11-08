import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';
import { useStyles as useUnistyles } from 'react-native-unistyles';
import { css } from '../css';
import { interpolate } from '../interpolate';
import { styleFunctionSx } from '../styleFunctionSx';
import type { SxProps } from '../sxConfig';
import { type Theme } from '../theme';
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
  const stylesheet = useMemo(
    () =>
      css.create((theme, runtime) => {
        const _styles = processStyles({ ...props, runtime, theme }, styles);

        return {
          style: interpolate.call(
            { ...props, runtime, theme },
            _styles,
            !skipSx && styleFunctionSx({ sx, theme }),
          ),
        };
      }),
    [props, skipSx, styles, sx],
  );

  const { styles: _styles, theme } = useUnistyles(stylesheet as any);

  return {
    styles: _styles.style,
    theme,
  };
}
