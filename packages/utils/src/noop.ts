import type { AnyObject } from './is';

// biome-ignore lint/suspicious/noEmptyBlockStatements: noop is explicitly empty
export function noop() {}

export const EMPTY_OBJECT: Readonly<AnyObject<never>> = Object.freeze({});
