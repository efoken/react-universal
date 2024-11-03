import { getOwnerDocument } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { cloneElement, useCallback, useEffect, useRef } from 'react';
import type { GestureResponderEvent } from 'react-native';
import type {
  PressAwayListenerProps,
  PressAwayMouseEventHandler,
  PressAwayTouchEventHandler,
} from './PressAwayListener.types';

function mapEventPropToEvent(
  eventProp: PressAwayMouseEventHandler | PressAwayTouchEventHandler,
): 'click' | 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'pointerdown' | 'pointerup' {
  return eventProp === 'onPress' ? 'click' : (eventProp.slice(2).toLowerCase() as any);
}

function hasPressedRootScrollbar(event: MouseEvent, doc: Document) {
  return (
    doc.documentElement.clientWidth < event.clientX ||
    doc.documentElement.clientHeight < event.clientY
  );
}

export const PressAwayListener: React.FC<PressAwayListenerProps> = ({
  children,
  disableReactTree = false,
  mouseEvent = 'onPress',
  onPressAway,
  touchEvent = 'onTouchEnd',
}) => {
  const nodeRef = useRef<HTMLElement>(null);

  const movedRef = useRef(false);
  const activatedRef = useRef(false);
  const syntheticEventRef = useRef(false);

  useEffect(() => {
    // Ensure that this component is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);

  const handleRef = useComposedRefs(children.ref, nodeRef);

  const handlePressAway = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Given developers can stop the propagation of the synthetic event,
      // we can only be confident with a positive value.
      const insideReactTree = syntheticEventRef.current;
      syntheticEventRef.current = false;

      const doc = getOwnerDocument(nodeRef.current);

      if (
        !activatedRef.current ||
        !nodeRef.current ||
        ('clientX' in event && hasPressedRootScrollbar(event, doc))
      ) {
        return;
      }

      // Do not act if user performed touchmove
      if (movedRef.current) {
        movedRef.current = false;
        return;
      }

      const insideDOM = event.composedPath().includes(nodeRef.current);

      if (!insideDOM && (disableReactTree || !insideReactTree)) {
        onPressAway(event);
      }
    },
    [disableReactTree, onPressAway],
  );

  // Keep track of mouse/touch events that bubbled up through the portal.
  const createHandleSynthetic =
    (handlerName: PressAwayMouseEventHandler | PressAwayTouchEventHandler) => (event: any) => {
      syntheticEventRef.current = true;
      children.props[handlerName]?.(event);
    };

  const childrenProps: { ref: React.Ref<Element> } & Pick<
    React.DOMAttributes<Element>,
    Exclude<PressAwayMouseEventHandler, 'onPress'> | 'onClick' | PressAwayTouchEventHandler
  > & { onPress?: (event: GestureResponderEvent) => void } = { ref: handleRef };

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = getOwnerDocument(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handlePressAway);
      doc.addEventListener('touchmove', handleTouchMove);

      return () => {
        doc.removeEventListener(mappedTouchEvent, handlePressAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [handlePressAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent === 'onPress' ? 'onClick' : mouseEvent] =
      createHandleSynthetic(mouseEvent);
  }

  useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = getOwnerDocument(nodeRef.current);

      doc.addEventListener(mappedMouseEvent, handlePressAway);

      return () => {
        doc.removeEventListener(mappedMouseEvent, handlePressAway);
      };
    }
  }, [handlePressAway, mouseEvent]);

  return cloneElement(children, childrenProps);
};
