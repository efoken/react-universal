import { describe, expect, it } from 'vitest';
import { findLast } from './findLast';

describe('findLast', () => {
  const arr = [5, 12, 8, 130, 44];

  it('should be able to find the last value that satisfies the provided predicate', () => {
    expect(findLast(arr, (value) => value > 10)).toBe(44);
  });

  it('should return undefined if no value satisfies the provided predicate', () => {
    expect(findLast(arr, (value) => value > 1000)).toBeUndefined();
  });
});
