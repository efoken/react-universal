import { defineConfig } from '@react-universal/core';
import { Inter } from 'next/font/google';

export const font = Inter({ subsets: ['latin'] });

export const config = defineConfig({
  theme: {
    colors: {
      black: '#09090b',
      white: '#ffffff',
      background: {
        default: { _light: '#fff', _dark: '#000' },
        muted: { _light: '#f4f4f5', _dark: '#18181b' },
      },
      text: {
        default: { _light: '#09090b', _dark: '#fafafa' },
        muted: { _light: '#52525b', _dark: '#a1a1aa' },
      },
      border: {
        default: { _light: '#e4e4e7', _dark: '#27272a' },
        muted: { _light: '#f4f4f5', _dark: '#18181b' },
      },
    },
    fonts: {
      body: {
        family: font.style.fontFamily,
      },
      heading: {
        family: font.style.fontFamily,
      },
      mono: {
        family: 'monospace',
      },
    },
  },
});

type Config = typeof config;

declare module '@react-universal/core' {
  interface CustomConfig extends Config {}
}
