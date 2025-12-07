import type { AnyObject } from './is';

export type Override<T, U> = Omit<T, keyof U> & U;

export type DeepMutable<T extends AnyObject> = {
  -readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepMutable<T[K]>;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
