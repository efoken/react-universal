import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';
import { css } from '../css';
import { interpolate } from '../interpolate';
import { styleFunctionSx } from '../styleFunctionSx';
import type { SxProps } from '../sxConfig';
import type { StyleInterpolation } from '../types';
import { processStyles } from '../utils/processStyles';

export function useStyles(
  styles: StyleInterpolation<AnyObject>,
  {
    id,
    skipSx,
    sx,
    ...props
  }: {
    id?: number;
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
        // @ts-expect-error: this argument is hidden our type definition
      }, id),
    // biome-ignore lint/correctness/useExhaustiveDependencies: props do not change on every render
    [id, props, skipSx, styles, sx],
  );

  return stylesheet(undefined as any, undefined as any).style;
}
