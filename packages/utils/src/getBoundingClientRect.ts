export function getBoundingClientRect(
  node: HTMLElement | null,
): DOMRect | undefined {
  if (!node || node.nodeType !== 1) {
    return undefined;
  }
  return node.getBoundingClientRect?.();
}
