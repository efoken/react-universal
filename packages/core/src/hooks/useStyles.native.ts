import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';
import { useStyles as useUnistyles } from 'react-native-unistyles';
import { css } from '../css';
import { interpolate } from '../interpolate';
import { styleFunctionSx } from '../styleFunctionSx';
import type { SxProps } from '../sxConfig';
import type { StyleInterpolation } from '../types';
import { processStyles } from '../utils/processStyles';

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
    // biome-ignore lint/correctness/useExhaustiveDependencies: props do not change on every render
    [props, skipSx, styles, sx],
  );

  const { styles: _styles } = useUnistyles(stylesheet as any);

  return _styles.style;
}
