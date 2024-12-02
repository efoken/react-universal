'use client';

import type { ForwardedProps } from '@react-universal/core';
import {
  forwardedProps,
  styled,
  useElementLayout,
  useOwnerState,
  usePlatformMethods,
  useResponderEvents,
} from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import { normalizeEvent, pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import type React from 'react';
import { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import type {
  TextInputMethods,
  TextInputOwnerState,
  TextInputProps,
  TextInputType,
} from './TextInput.types';
import { TextInputState } from './TextInputState';

/**
 * Determines whether a `selection` prop differs from a node's existing
 * selection state.
 */
function isSelectionStale(
  node: HTMLInputElement,
  selection: NonNullable<TextInputProps['selection']>,
) {
  return selection.start !== node.selectionStart || selection.end !== node.selectionEnd;
}

/**
 * Certain input types do not support `setSelectionRange` and will throw an
 * error.
 */
function setSelection(node: HTMLInputElement, selection: NonNullable<TextInputProps['selection']>) {
  if (isSelectionStale(node, selection)) {
    try {
      node.setSelectionRange(selection.start, selection.end ?? selection.start);
    } catch {
      // do nothing
    }
  }
}

function pickProps<T extends AnyObject>(props: T) {
  return pick(props, {
    ...forwardedProps.defaultProps,
    ...forwardedProps.accessibilityProps,
    ...forwardedProps.clickProps,
    ...forwardedProps.focusProps,
    ...forwardedProps.keyboardProps,
    ...forwardedProps.mouseProps,
    ...forwardedProps.touchProps,
    ...forwardedProps.styleProps,
    autoCapitalize: true,
    autoComplete: true,
    autoCorrect: true,
    autoFocus: true,
    defaultValue: true,
    disabled: true,
    lang: true,
    maxLength: true,
    onChange: true,
    onScroll: true,
    placeholder: true,
    readOnly: true,
    rows: true,
    spellCheck: true,
    type: true,
    value: true,
  });
}

// If an Input Method Editor is processing key input, the 'keyCode' is 229.
// https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
function isEventComposing(nativeEvent: KeyboardEvent) {
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}

let focusTimeout: ReturnType<typeof setTimeout>;

const TextInputRoot = styled('input', {
  name: 'TextInput',
  slot: 'Root',
})<{ ownerState: TextInputOwnerState }>(({ theme }) => ({
  appearance: 'none',
  backgroundColor: 'transparent',
  borderColor: theme.colors.border.default,
  borderStyle: 'solid',
  borderWidth: 0,
  fontFamily: theme.fonts.body.family,
  resize: 'none',
  '&::placeholder': {
    color: 'var(--placeholder-text-color)',
  },
  variants: [
    {
      props: { caretHidden: true },
      style: {
        caretColor: 'transparent',
      },
    },
  ],
}));

export const TextInput = forwardRef<HTMLInputElement & TextInputMethods, TextInputProps>(
  (
    {
      autoCapitalize = 'sentences',
      autoComplete = 'on',
      autoCorrect = true,
      blurOnSubmit,
      caretHidden = false,
      clearTextOnFocus = false,
      inputMode,
      multiline = false,
      onBlur,
      onChange,
      onChangeText,
      onContentSizeChange,
      onFocus,
      onKeyPress,
      onLayout,
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScroll,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChange,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
      onSubmitEditing,
      placeholderTextColor,
      readOnly = false,
      rows,
      secureTextEntry = false,
      selection,
      selectTextOnFocus = false,
      showSoftInputOnFocus = true,
      spellCheck,
      style,
      ...props
    },
    ref,
  ) => {
    let type: 'email' | 'tel' | 'search' | 'url' | 'text' | 'password' | undefined;

    if (inputMode != null) {
      switch (inputMode) {
        case 'email': {
          type = 'email';
          break;
        }
        case 'tel': {
          type = 'tel';
          break;
        }
        case 'search': {
          type = 'search';
          break;
        }
        case 'url': {
          type = 'url';
          break;
        }
        default: {
          type = 'text';
        }
      }
    }

    if (secureTextEntry) {
      type = 'password';
    }

    const dimensions = useRef<{ height?: number; width?: number }>({});
    const hostRef = useRef<HTMLInputElement>(null);
    const prevSelection = useRef<NonNullable<TextInputProps['selection']>>();
    const prevSecureTextEntry = useRef(false);

    useEffect(() => {
      if (hostRef.current && prevSelection.current) {
        setSelection(hostRef.current, prevSelection.current);
      }
      prevSecureTextEntry.current = secureTextEntry;
    }, [secureTextEntry]);

    const handleContentSizeChange = useCallback(
      (node: HTMLInputElement) => {
        if (multiline && node != null) {
          const { scrollHeight: nextHeight, scrollWidth: nextWidth } = node;
          if (nextHeight !== dimensions.current.height || nextWidth !== dimensions.current.width) {
            dimensions.current.height = nextHeight;
            dimensions.current.width = nextWidth;
            onContentSizeChange?.({
              nativeEvent: {
                contentSize: {
                  height: dimensions.current.height,
                  width: dimensions.current.width,
                },
              },
            });
          }
        }
      },
      [multiline, onContentSizeChange],
    );

    const imperativeRef = useMemo(
      () => (node: HTMLInputElement & TextInputMethods) => {
        // TextInput needs to add more methods to the node in addition to those
        // added by `usePlatformMethods`. This is temporarily until an API like
        // `TextInput.clear(hostRef)` is added to React Native.
        if (node != null) {
          node.clear = () => {
            node.value = '';
          };
          node.isFocused = () => node != null && TextInputState.currentlyFocusedField() === node;
          handleContentSizeChange(node);
        }
      },
      [handleContentSizeChange],
    );

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      TextInputState.setCurrentlyFocusedNode(null);
      onBlur?.(normalizeEvent(event, { text: event.target.value }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const node = event.target;
      const text = node.value;
      handleContentSizeChange(node);
      onChange?.(normalizeEvent(event, { text }));
      onChangeText?.(text);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      const node = event.target;
      onFocus?.(normalizeEvent(event, { text: node.value }));
      if (node != null) {
        TextInputState.setCurrentlyFocusedNode(node);
        if (clearTextOnFocus) {
          node.value = '';
        }
        if (selectTextOnFocus) {
          // Safari requires selection to occur in a setTimeout
          if (focusTimeout != null) {
            clearTimeout(focusTimeout);
          }
          focusTimeout = setTimeout(() => {
            node.select();
          }, 0);
        }
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const node = event.target as EventTarget & HTMLInputElement;
      event.stopPropagation();

      const blurOnSubmitDefault = !multiline;
      const shouldBlurOnSubmit = blurOnSubmit ?? blurOnSubmitDefault;

      const composing = isEventComposing(event.nativeEvent);

      onKeyPress?.(normalizeEvent(event));

      // Do not call submit if composition is occuring
      if (event.key === 'Enter' && !event.shiftKey && !composing && !event.isDefaultPrevented()) {
        if (!!blurOnSubmit || !multiline) {
          // Prevent "Enter" from inserting a newline or submitting a form
          event.preventDefault();
          onSubmitEditing?.(normalizeEvent(event, { text: node.value }));
        }
        if (shouldBlurOnSubmit) {
          setTimeout(() => node.blur(), 0);
        }
      }
    };

    const handleSelectionChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
      try {
        const node = event.target as EventTarget & HTMLInputElement;
        const nextSelection = {
          start: node.selectionStart ?? 0,
          end: node.selectionEnd ?? 0,
        };
        onSelectionChange?.(
          normalizeEvent(event, {
            selection: nextSelection,
            target: node,
            text: node.value,
          }),
        );
        if (prevSecureTextEntry.current === secureTextEntry) {
          prevSelection.current = nextSelection;
        }
      } catch {
        // do nothing
      }
    };

    useLayoutEffect(() => {
      const node = hostRef.current;
      if (node != null && selection != null) {
        setSelection(node, selection);
      }
      if (document.activeElement === node) {
        TextInputState.setCurrentlyFocusedNode(node);
      }
    }, [selection]);

    const component = multiline ? 'textarea' : 'input';

    useElementLayout(hostRef, onLayout);
    useResponderEvents(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
    });

    const supportedProps: ForwardedProps<HTMLInputElement> = pickProps(props);
    supportedProps.autoCapitalize = autoCapitalize;
    supportedProps.autoComplete = autoComplete;
    supportedProps.autoCorrect = autoCorrect ? 'on' : 'off';
    supportedProps.dir = props.dir ?? 'auto';
    supportedProps.inputMode = inputMode;
    supportedProps.onBlur = handleBlur;
    supportedProps.onChange = handleChange;
    supportedProps.onFocus = handleFocus;
    supportedProps.onKeyDown = handleKeyDown;
    supportedProps.onScroll = onScroll as any;
    supportedProps.onSelect = handleSelectionChange;
    supportedProps.readOnly = readOnly;
    // @ts-expect-error: `rows` is only used <textarea>
    supportedProps.rows = multiline ? rows : undefined;
    supportedProps.spellCheck = spellCheck ?? autoCorrect;
    supportedProps.type = multiline ? undefined : type;
    // @ts-expect-error: `virtualkeyboardpolicy` is missing in React types
    supportedProps.virtualkeyboardpolicy = showSoftInputOnFocus ? 'auto' : 'manual';

    const platformMethodsRef = usePlatformMethods(hostRef);
    const handleRef = useComposedRefs<HTMLInputElement>(
      hostRef,
      platformMethodsRef,
      imperativeRef,
      ref,
    );

    supportedProps.ref = handleRef;

    const ownerState = useOwnerState({
      caretHidden,
      placeholderTextColor,
    });

    return (
      <TextInputRoot
        as={component}
        ownerState={ownerState}
        style={[{ '--placeholder-text-color': placeholderTextColor }, style]}
        {...supportedProps}
      />
    );
  },
) as TextInputType;

TextInput.displayName = 'TextInput';
