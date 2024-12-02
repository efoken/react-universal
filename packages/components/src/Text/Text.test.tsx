import type { AnyObject } from '@react-universal/utils';
import { isFunction, noop } from '@react-universal/utils';
import { act, fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Text } from './Text';
import type { TextType } from './Text.types';

function createEventTarget(node: any) {
  return {
    node,
    blur: () => fireEvent.blur(node),
    click: () => fireEvent.click(node),
    focus: (payload?: AnyObject) => fireEvent.focus(node, payload),
    pointerDown: (payload?: AnyObject) => fireEvent.pointerDown(node, payload),
  };
}

describe('Text', () => {
  test('default', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('nested', () => {
    const { container } = render(
      <Text>
        <Text testID="child" />
      </Text>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "aria-label"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-label="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-labelledby"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-labelledby="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-live"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-live="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "role"', () => {
    test('value is set', () => {
      const { container } = render(<Text role="presentation" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<Text role="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<Text role="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "dir"', () => {
    test('value is "ltr"', () => {
      const { container } = render(<Text dir="ltr" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "rtl"', () => {
      const { container } = render(<Text dir="rtl" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = render(<Text href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with role', () => {
      const { container } = render(<Text role="presentation" href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = render(<Text hrefAttrs={{ download: 'filename.jpg' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set', () => {
      const hrefAttrs = {
        download: 'filename.jpg',
        rel: 'nofollow',
        target: '_blank',
      };
      const { container } = render(<Text href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank',
      };
      const { container } = render(<Text href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('null values are excluded', () => {
      const hrefAttrs = {
        download: undefined,
        rel: undefined,
        target: undefined,
      };
      const { container } = render(<Text href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "lang"', () => {
    test('undefined', () => {
      const { container } = render(<Text />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('fr', () => {
      const { container } = render(<Text lang="fr" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('ar', () => {
      const { container } = render(<Text lang="ar" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('with dir', () => {
      const { container } = render(<Text dir="ltr" lang="ar" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "id"', () => {
    test('value is set', () => {
      const { container } = render(<Text id="ID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "numberOfLines"', () => {
    test('value is set', () => {
      const { container } = render(<Text numberOfLines={3} />);
      expect(container.firstChild).toMatchSnapshot();
    });
    test('value is set to one', () => {
      const { container } = render(<Text numberOfLines={1} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = vi.fn();
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        // @ts-expect-error: `onBlur` is Web only and does not exist in types
        render(<Text ref={ref} onBlur={onBlur} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
        target.blur();
      });
      expect(onBlur).toBeCalled();
    });
  });

  describe('prop "onClick"', () => {
    test('is called', () => {
      const onClick = vi.fn();
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        render(<Text ref={ref} onClick={onClick} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toBeCalled();
    });

    test('is still called if "onPress" is provided', () => {
      const onClick = vi.fn();
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        render(<Text ref={ref} onClick={onClick} onPress={noop} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toBeCalled();
    });
  });

  describe('prop "onFocus"', () => {
    test('is called', () => {
      const onFocus = vi.fn();
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        // @ts-expect-error: `onFocus` is Web only and does not exist in types
        render(<Text ref={ref} onFocus={onFocus} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
      });
      expect(onFocus).toBeCalled();
    });
  });

  describe('prop "onPointerDown"', () => {
    // beforeEach(() => {
    //   setPointerEvent(true);
    // });
    // afterEach(() => {
    //   setPointerEvent(false);
    // });

    test('is called', () => {
      const onPointerDown = vi.fn();
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        // @ts-expect-error: `onPointerDown` is Web only and does not exist in types
        render(<Text ref={ref} onPointerDown={onPointerDown} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerDown({ pointerType: 'touch' });
      });
      expect(onPointerDown).toBeCalled();
    });
  });

  describe('prop "onPress"', () => {
    test('is called', () => {
      const onPress = vi.fn();
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        render(<Text ref={ref} onPress={onPress} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onPress).toBeCalled();
    });

    test('is not called if "onClick" is provided', () => {
      const onPress = vi.fn();
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        render(<Text ref={ref} onClick={noop} onPress={onPress} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onPress).not.toBeCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = vi.fn();
      render(<Text ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('is not called for prop changes', () => {
      const ref = vi.fn();
      let rerender: (ui: React.ReactNode) => void;
      act(() => {
        ({ rerender } = render(<Text ref={ref} id="123" style={{ borderWidth: 5 }} />));
      });
      expect(ref).toHaveBeenCalledTimes(1);
      act(() => {
        rerender(<Text ref={ref} id="1234" style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledTimes(1);
    });

    test('node has imperative methods', () => {
      const ref = createRef<React.ElementRef<TextType>>();
      act(() => {
        render(<Text ref={ref} />);
      });
      const node = ref.current!;
      expect(isFunction(node.measure));
      expect(isFunction(node.measureLayout));
      expect(isFunction(node.measureInWindow));
    });
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<Text style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<Text testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
