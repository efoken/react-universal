import { describe, expect, it } from 'vitest';
import { runIfFunction } from './runIfFunction';

describe('runIfFunction', () => {
  it('should return expected values', () => {
    expect(runIfFunction(true)).toBe(true);
    expect(runIfFunction(() => true)).toBe(true);
    expect(runIfFunction((arg: number) => arg + 1, 1)).toBe(2);
  });
});
