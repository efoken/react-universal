export function getOwnerDocument(node: Node | null | undefined): Document {
  return node?.ownerDocument ?? document;
}
