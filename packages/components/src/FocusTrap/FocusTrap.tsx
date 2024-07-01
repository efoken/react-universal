import { composeRefs } from '@tamagui/compose-refs';
import { getOwnerDocument } from '@universal-ui/utils';
import { cloneElement, useEffect, useRef } from 'react';
import type { FocusTrapProps } from './FocusTrap.types';

// Inspired by https://github.com/focus-trap/tabbable
const candidatesSelector = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

function getTabIndex(node: HTMLElement) {
  const tabIndex = Number.parseInt(node.getAttribute('tabindex') ?? '', 10);

  if (!Number.isNaN(tabIndex)) {
    return tabIndex;
  }

  // Browsers do not return `tabIndex` correctly for contenteditable nodes;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // In Chrome, <details/>, <audio controls/> and <video controls/> elements get
  // a default `tabIndex` of -1 when the tabindex attribute isn't specified in
  // the DOM, yet they are still part of the regular tab order; in FF, they get
  // a default `tabIndex` of 0; since Chrome still puts those elements in the
  // regular tab order, consider their tab index to be 0.
  if (
    node.contentEditable === 'true' ||
    ((node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') &&
      node.getAttribute('tabindex') == null)
  ) {
    return 0;
  }

  return node.tabIndex;
}

function isNonTabbableRadio(node: HTMLInputElement) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio' || !node.name) {
    return false;
  }

  const getRadio = (selector: string) =>
    node.ownerDocument.querySelector(`input[type="radio"]${selector}`);

  let roving = getRadio(`[name="${node.name}"]:checked`);

  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }

  return roving !== node;
}

function isNodeMatchingSelectorFocusable(node: HTMLInputElement) {
  if (
    node.disabled ||
    (node.tagName === 'INPUT' && node.type === 'hidden') ||
    isNonTabbableRadio(node)
  ) {
    return false;
  }
  return true;
}

function defaultGetTabbable(root: HTMLElement) {
  const regularTabNodes: HTMLElement[] = [];
  const orderedTabNodes: {
    documentOrder: number;
    tabIndex: number;
    node: HTMLElement;
  }[] = [];

  for (const [i, node] of root.querySelectorAll(candidatesSelector).entries()) {
    const nodeTabIndex = getTabIndex(node as HTMLElement);

    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node as HTMLInputElement)) {
      continue;
    }

    if (nodeTabIndex === 0) {
      regularTabNodes.push(node as HTMLElement);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node: node as HTMLElement,
      });
    }
  }

  return [
    ...orderedTabNodes
      .sort((a, b) =>
        a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex,
      )
      .map((a) => a.node),
    ...regularTabNodes,
  ];
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  disableAutoFocus = false,
  disabled = false,
  disableEnforceFocus = false,
  disableRestoreFocus = false,
  getTabbable = defaultGetTabbable,
  open,
}) => {
  const ignoreNextEnforceFocus = useRef(false);
  const sentinelStart = useRef<HTMLDivElement>(null);
  const sentinelEnd = useRef<HTMLDivElement>(null);
  const nodeToRestore = useRef<EventTarget | null>(null);
  const reactFocusEventTarget = useRef<EventTarget | null>(null);

  // This variable is useful when disableAutoFocus is true. It waits for the
  // active element to move into the component to activate.
  const activated = useRef(false);

  const rootRef = useRef<HTMLElement>(null);
  const handleRef = composeRefs(children.ref, rootRef);
  const lastKeydown = useRef<KeyboardEvent | null>(null);

  useEffect(() => {
    // We might render an empty child
    if (!open || !rootRef.current) {
      return;
    }

    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);

  useEffect(() => {
    // We might render an empty child
    if (!open || !rootRef.current) {
      return;
    }

    const doc = getOwnerDocument(rootRef.current);

    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            [
              'universal-ui: The modal content node does not accept focus.',
              'For the benefit of assistive technologies, the tabIndex of the node is being set ' +
                'to "-1".',
            ].join('\n'),
          );
        }
        rootRef.current.setAttribute('tabIndex', '-1');
      }

      if (activated.current) {
        rootRef.current.focus();
      }
    }

    return () => {
      // restoreLastFocus()
      if (!disableRestoreFocus) {
        if (nodeToRestore.current != null) {
          ignoreNextEnforceFocus.current = true;
          (nodeToRestore.current as HTMLElement).focus();
        }
        nodeToRestore.current = null;
      }
    };
    // Missing `disableRestoreFocus` which is fine as we don't support changing
    // that prop on an open FocusTrap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    // We might render an empty child
    if (!open || !rootRef.current) {
      return;
    }

    const document = getOwnerDocument(rootRef.current);

    const loopFocus = (nativeEvent: KeyboardEvent) => {
      lastKeydown.current = nativeEvent;

      if (disableEnforceFocus || disabled || nativeEvent.key !== 'Tab') {
        return;
      }

      // Make sure the next tab starts from the right place.
      // doc.activeElement refers to the origin.
      if (document.activeElement === rootRef.current && nativeEvent.shiftKey) {
        // We need to ignore the next contain as it will try to move the focus
        // back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };

    const contain = () => {
      const rootElement = rootRef.current;

      if (rootElement == null) {
        return;
      }

      if (!document.hasFocus() || disabled || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      // The focus is already inside
      if (rootElement.contains(document.activeElement)) {
        return;
      }

      // The disableEnforceFocus is set and the focus is outside of the
      // FocusTrap (and sentinel nodes)
      if (
        disableEnforceFocus &&
        document.activeElement !== sentinelStart.current &&
        document.activeElement !== sentinelEnd.current
      ) {
        return;
      }

      // If the focus event is not coming from inside the children's react tree,
      // reset the refs.
      if (document.activeElement !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current != null) {
        return;
      }

      if (!activated.current) {
        return;
      }

      let tabbable: readonly string[] | HTMLElement[] = [];
      if (
        document.activeElement === sentinelStart.current ||
        document.activeElement === sentinelEnd.current
      ) {
        tabbable = getTabbable(rootRef.current!);
      }

      // One of the sentinel nodes was focused, so move the focus to the
      // first/last tabbable element inside the FocusTrap.
      if (tabbable.length > 0) {
        const shiftTab = Boolean(
          lastKeydown.current?.shiftKey && lastKeydown.current?.key === 'Tab',
        );

        const focusNext = tabbable[0];
        const focusPrevious = tabbable.at(-1);

        if (typeof focusNext !== 'string' && typeof focusPrevious !== 'string') {
          if (shiftTab) {
            focusPrevious?.focus();
          } else {
            focusNext.focus();
          }
        }
        // No tabbable elements in the FocusTrap, or the focus was outside of
        // the FocusTrap
      } else {
        rootElement.focus();
      }
    };

    document.addEventListener('focusin', contain);
    document.addEventListener('keydown', loopFocus, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the
    // focused area stops being a focused area.
    // For example: https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY
    // element.
    //
    // The WHATWG spec defines how the browser should behave but does not
    // explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      if (document.activeElement && document.activeElement.tagName === 'BODY') {
        contain();
      }
    }, 50);

    return () => {
      clearInterval(interval);

      document.removeEventListener('focusin', contain);
      document.removeEventListener('keydown', loopFocus, true);
    };
  }, [disableAutoFocus, disabled, disableEnforceFocus, disableRestoreFocus, open, getTabbable]);

  const handleFocus = (event: FocusEvent) => {
    if (nodeToRestore.current == null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;

    children.props.onFocus?.(event);
  };

  const handleFocusSentinel = (event: React.FocusEvent<HTMLDivElement>) => {
    if (nodeToRestore.current == null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };

  return (
    <>
      <div
        ref={sentinelStart}
        data-testid="sentinelStart"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={open ? 0 : -1}
        onFocus={handleFocusSentinel}
      />
      {cloneElement(children, { ref: handleRef, onFocus: handleFocus })}
      <div
        ref={sentinelEnd}
        data-testid="sentinelEnd"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={open ? 0 : -1}
        onFocus={handleFocusSentinel}
      />
    </>
  );
};
