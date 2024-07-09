import 'react';

declare module 'react' {
  export function act(callback: () => void): void;
  export function act<T>(callback: () => T | Promise<T>): Promise<T>;
}
