import { getBoundingClientRect } from './getBoundingClientRect';

export function getRect(node: HTMLElement) {
  const rect = getBoundingClientRect(node);
  if (!rect) {
    return undefined;
  }
  return {
    x: rect.x,
    y: rect.y,
    width: node.offsetWidth,
    height: node.offsetHeight,
    top: rect.top,
    left: rect.left,
  };
}
