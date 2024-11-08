export interface ParsedBoxShadow {
  blurRadius: string | number;
  color?: string;
  inset: boolean;
  offsetX: string | number;
  offsetY: string | number;
  spreadRadius: string | number;
}

const VALUES_RE = /,(?![^(]*\))/;
const PARTS_RE = /\s(?![^(]*\))/;
const LENGTH_RE = /^\d+[%A-Za-z]+?$/;

export function parseBoxShadow(str: string) {
  return str.split(VALUES_RE).map<ParsedBoxShadow>((s) => {
    const parts = s.trim().split(PARTS_RE);
    const inset = parts.includes('inset');
    const last = parts.at(-1)!;
    const color = last !== '0' && !LENGTH_RE.test(last) ? last : undefined;

    const [offsetX, offsetY, blurRadius, spreadRadius] = parts
      .filter((n) => n !== 'inset')
      .filter((n) => n !== color)
      .map((v) => {
        if (!v.endsWith('px') && v !== '0') {
          return v;
        }
        const n = Number.parseFloat(v);
        return Number.isNaN(n) ? v : n;
      });

    return {
      blurRadius,
      color,
      inset,
      offsetX,
      offsetY,
      spreadRadius,
    };
  });
}
