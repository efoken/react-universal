const keyName = '__reactResponderId';

function isSelectionValid() {
  const selection = window.getSelection()!;
  const string = selection.toString();
  return (
    string.length > 0 &&
    string !== '\n' &&
    (selection.anchorNode?.nodeType === window.Node.TEXT_NODE ||
      selection.focusNode?.nodeType === window.Node.TEXT_NODE)
  );
}

function getEventPath(domEvent: Event): any[] {
  // The `selectionchange` event always has the document as the target. Use the
  // anchor node as the initial target to reconstruct a path. (We actually only
  // need the first responder node in practice.)
  if (domEvent.type === 'selectionchange') {
    const target = window.getSelection()?.anchorNode;
    return composedPathFallback(target);
  }
  return domEvent.composedPath != null
    ? domEvent.composedPath()
    : composedPathFallback(domEvent.target);
}

function composedPathFallback(target: EventTarget | Node | null | undefined): any[] {
  const path = [];
  while (target != null && target !== document.body) {
    path.push(target);
    target = (target as any).parentNode;
  }
  return path;
}

/**
 * Retrieve the responder ID from a host node.
 */
function getResponderId(node: any): number | undefined {
  if (node != null) {
    return node[keyName];
  }
}

/**
 * Store the responder ID on a host node.
 */
export function setResponderId(node: any, id: number) {
  if (node != null) {
    node[keyName] = id;
  }
}

/**
 * Filter the event path to contain only the nodes attached to the responder
 * system.
 */
export function getResponderPaths(domEvent: any): { idPath: number[]; nodePath: any[] } {
  const idPath: number[] = [];
  const nodePath = [];
  const eventPath = getEventPath(domEvent);
  for (const node of eventPath) {
    const id = getResponderId(node);
    if (id != null) {
      idPath.push(id);
      nodePath.push(node);
    }
  }
  return { idPath, nodePath };
}

/**
 * Walk the paths and find the first common ancestor.
 */
export function getLowestCommonAncestor(pathA: any[], pathB: any[]): any {
  let pathALength = pathA.length;
  let pathBLength = pathB.length;
  if (
    // If either path is empty
    pathALength === 0 ||
    pathBLength === 0 ||
    // If the last elements aren't the same there can't be a common ancestor
    // that is connected to the responder system
    pathA[pathALength - 1] !== pathB[pathBLength - 1]
  ) {
    return null;
  }

  let itemA = pathA[0];
  let indexA = 0;
  let itemB = pathB[0];
  let indexB = 0;

  // If A is deeper, skip indices that can't match.
  if (pathALength - pathBLength > 0) {
    indexA = pathALength - pathBLength;
    itemA = pathA[indexA];
    pathALength = pathBLength;
  }

  // If B is deeper, skip indices that can't match
  if (pathBLength - pathALength > 0) {
    indexB = pathBLength - pathALength;
    itemB = pathB[indexB];
    pathBLength = pathALength;
  }

  // Walk in lockstep until a match is found
  let depth = pathALength;
  while (depth--) {
    if (itemA === itemB) {
      return itemA;
    }
    itemA = pathA[indexA++];
    itemB = pathB[indexB++];
  }
  return null;
}

/**
 * Determine whether any of the active touches are within the current responder.
 * This cannot rely on W3C `targetTouches`, as Safari does not implement it.
 */
export function hasTargetTouches(target: any, touches: TouchList | undefined) {
  if (touches == null || touches.length === 0) {
    return false;
  }
  for (const touch of touches) {
    const node = touch.target;
    if (node != null) {
      if (target.contains(node)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Ignore `selectionchange` events that don't correspond with a person's intent
 * to select text.
 */
export function hasValidSelection(domEvent: Event) {
  if (domEvent.type === 'selectionchange') {
    return isSelectionValid();
  }
  return domEvent.type === 'select';
}

/**
 * Events are only valid if the primary button was used without specific
 * modifier keys.
 */
export function isPrimaryPointerDown(domEvent: any) {
  const touch = domEvent.type === 'touchstart' || domEvent.type === 'touchmove';
  const primaryMouseDown =
    domEvent.type === 'mousedown' && (domEvent.button === 0 || domEvent.buttons === 1);
  const primaryMouseMove = domEvent.type === 'mousemove' && domEvent.buttons === 1;
  const noModifiers = domEvent.altKey === false && domEvent.ctrlKey === false;

  if (touch || (primaryMouseDown && noModifiers) || (primaryMouseMove && noModifiers)) {
    return true;
  }
  return false;
}

export function isStartish(domEvent: Event): boolean {
  return domEvent.type === 'touchstart' || domEvent.type === 'mousedown';
}

export function isMoveish(domEvent: Event): boolean {
  return domEvent.type === 'touchmove' || domEvent.type === 'mousemove';
}

export function isEndish(domEvent: Event): boolean {
  return domEvent.type === 'touchend' || domEvent.type === 'mouseup' || isCancelish(domEvent);
}

export function isCancelish(domEvent: Event): boolean {
  return domEvent.type === 'touchcancel' || domEvent.type === 'dragstart';
}

export function isScroll(domEvent: Event): domEvent is Event {
  return domEvent.type === 'scroll';
}

export function isSelectionChange(domEvent: Event): domEvent is Event {
  return domEvent.type === 'select' || domEvent.type === 'selectionchange';
}
