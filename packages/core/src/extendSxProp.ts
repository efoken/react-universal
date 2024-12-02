import type { AnyObject } from '@react-universal/utils';
import { isArray, isFunction, isObject } from '@react-universal/utils';
import { type SxProps, defaultSxConfig } from './sxConfig';
import type { Theme } from './theme';

function splitProps(props: { theme?: Theme; [key: string]: any }) {
  const result: {
    systemProps: AnyObject;
    otherProps: AnyObject;
  } = {
    systemProps: {},
    otherProps: {},
  };

  const config: AnyObject = props?.theme?.sxConfig ?? defaultSxConfig;

  for (const prop of Object.keys(props)) {
    if (config[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  }

  return result;
}

export function extendSxProp({
  sx: _sx,
  ...props
}: {
  sx?: SxProps;
  theme?: Theme;
  [key: string]: any;
}) {
  const { systemProps, otherProps } = splitProps(props);

  let sx: SxProps;
  if (isArray(_sx)) {
    sx = [systemProps, ...(_sx as any[])];
  } else if (isFunction(_sx)) {
    sx = (...args: any[]) => {
      // @ts-expect-error: Let's just pass all args
      const result = _sx(...args);
      if (!isObject(result)) {
        return systemProps;
      }
      return { ...systemProps, ...result };
    };
  } else {
    sx = { ...systemProps, ..._sx };
  }

  return {
    ...otherProps,
    sx,
  };
}
