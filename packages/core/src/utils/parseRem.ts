const REM_RE = /(em|rem|px)?$/;

export function parseRem<T extends { toString: () => string }>(length: T) {
  const value = Number.parseFloat(length.toString());
  const units = REM_RE.exec(length.toString())?.[1];

  switch (units) {
    case 'em': {
      return value * 16;
    }
    case 'rem': {
      return value * 16;
    }
    default: {
      return value;
    }
  }
}
