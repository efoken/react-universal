'use client';

import { Global } from '@emotion/react';
import { isArray, isNumber, isObject } from '@react-universal/utils';
import type { AnyObject } from '@react-universal/utils';
import { createContext, useContext } from 'react';
import type { Theme } from '../theme/defaultTheme';
import { defaultTheme } from '../theme/defaultTheme';
import { extractTheme } from '../theme/extractTheme';
import { isFont } from '../utils/isFont';
import type { UniversalProviderProps } from './ThemeContext.types';

const ThemeContext = createContext<Theme>(undefined as any);

function createCSSVariables(obj: AnyObject, parentKey = '') {
  const result: Record<`--${string}`, any> = {};

  const traverse = (currentObj: any, currentKey: string | number) => {
    if (isObject(currentObj)) {
      if (isFont(currentObj)) {
        result[`--${currentKey}`] = currentObj.family;
      } else {
        for (const key of Object.keys(currentObj)) {
          const newKey = currentKey ? `${currentKey}-${key}` : key;
          traverse(currentObj[key], newKey);
        }
      }
    } else if (isArray(currentObj)) {
      for (const key of currentObj.keys()) {
        const newKey = currentKey ? `${currentKey}-${key}` : key;
        traverse(currentObj[key], newKey);
      }
    } else {
      result[`--${currentKey}`] =
        isNumber(currentObj) && currentObj !== 0 ? `${currentObj}px` : currentObj;
    }
  };

  traverse(obj, parentKey);
  return result;
}

export const UniversalProvider: React.FC<UniversalProviderProps> = ({
  children,
  theme = defaultTheme as Theme,
}) => (
  <ThemeContext.Provider value={theme}>
    <Global
      styles={{
        '*': {
          font: 'inherit',
          margin: 0,
          padding: 0,
        },
        '*, *::before, *::after': {
          borderColor: 'var(--colors-border-default)',
          borderStyle: 'solid',
          borderWidth: 0,
          boxSizing: 'border-box',
        },
        html: {
          backgroundColor: 'var(--colors-background-default)',
          color: 'var(--colors-text-default)',
        },
        body: {
          minHeight: '100dvh',
          position: 'relative',
        },
        'ol, ul': {
          listStyleType: 'none',
        },
        a: {
          color: 'inherit',
          textDecoration: 'inherit',
        },
        ':root, [data-theme="light"]': createCSSVariables(extractTheme(theme, 'light')),
        '[data-theme="dark"]': createCSSVariables(extractTheme(theme, 'dark')),
      }}
    />
    {children}
  </ThemeContext.Provider>
);

export function useTheme() {
  return useContext(ThemeContext);
}
