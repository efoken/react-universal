import type { AnyObject } from '@react-universal/utils';
import { isFunction, noop } from '@react-universal/utils';
import { act, fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import type { MockInstance } from 'vitest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { View } from './View';
import type { ViewType } from './View.types';

function createEventTarget(node: any) {
  return {
    node,
    blur: () => fireEvent.blur(node),
    click: () => fireEvent.click(node),
    focus: (payload?: AnyObject) => fireEvent.focus(node, payload),
    pointerDown: (payload?: AnyObject) => fireEvent.pointerDown(node, payload),
  };
}

describe('View', () => {
  test('default', () => {
    const { container } = render(<View />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('non-text is rendered', () => {
    const children = <View testID="1" />;
    const { container } = render(<View>{children}</View>);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('raw text nodes as children', () => {
    let consoleErrorMock: MockInstance<(...params: any[]) => void>;

    beforeEach(() => {
      consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(noop);
    });

    afterEach(() => {
      consoleErrorMock.mockRestore();
    });

    test('error logged (single)', () => {
      render(<View>hello</View>);
      expect(console.error).toBeCalled();
    });

    test('error logged (array)', () => {
      render(
        <View>
          <View />
          hello
          <View />
        </View>,
      );
      expect(console.error).toBeCalled();
    });
  });

  describe('prop "aria-label"', () => {
    test('value is set', () => {
      const { container } = render(<View aria-label="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-labelledby"', () => {
    test('value is set', () => {
      const { container } = render(<View aria-labelledby="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-live"', () => {
    test('value is set', () => {
      const { container } = render(<View aria-live="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "role"', () => {
    test('value is set', () => {
      const { container } = render(<View role="presentation" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<View role="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<View role="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "dir"', () => {
    test('value is "ltr"', () => {
      const { container } = render(<View dir="ltr" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "rtl"', () => {
      const { container } = render(<View dir="rtl" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = render(<View href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with role', () => {
      const { container } = render(<View role="presentation" href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = render(<View hrefAttrs={{ download: 'filename.jpg' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set', () => {
      const hrefAttrs = {
        download: 'filename.jpg',
        rel: 'nofollow',
        target: '_blank',
      };
      const { container } = render(<View href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank',
      };
      const { container } = render(<View href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('undefined values are excluded', () => {
      const hrefAttrs = {
        download: undefined,
        rel: undefined,
        target: undefined,
      };
      const { container } = render(<View href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "lang"', () => {
    test('undefined', () => {
      const { container } = render(<View />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('fr', () => {
      const { container } = render(<View lang="fr" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('ar', () => {
      const { container } = render(<View lang="ar" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('with dir', () => {
      const { container } = render(<View dir="ltr" lang="ar" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "id"', () => {
    test('value is set', () => {
      const { container } = render(<View id="ID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = vi.fn();
      const ref = createRef<React.ElementRef<ViewType>>();
      act(() => {
        // @ts-expect-error: `onBlur` is Web only and does not exist in types
        render(<View ref={ref} onBlur={onBlur} />);
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
      const ref = createRef<React.ElementRef<ViewType>>();
      act(() => {
        // @ts-expect-error: `onClick` is Web only and does not exist in types
        render(<View ref={ref} onClick={onClick} />);
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
      const ref = createRef<React.ElementRef<ViewType>>();
      act(() => {
        // @ts-expect-error: `onFocus` is Web only and does not exist in types
        render(<View ref={ref} onFocus={onFocus} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
        target.blur();
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
      const ref = createRef<React.ElementRef<ViewType>>();
      act(() => {
        render(<View ref={ref} onPointerDown={onPointerDown} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerDown({ pointerType: 'touch' });
      });
      expect(onPointerDown).toBeCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = vi.fn();
      render(<View ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('is not called for prop changes', () => {
      const ref = vi.fn();
      let rerender: (ui: React.ReactNode) => void;
      act(() => {
        ({ rerender } = render(<View ref={ref} id="123" style={{ borderWidth: 5 }} />));
      });
      expect(ref).toHaveBeenCalledTimes(1);
      act(() => {
        rerender(<View ref={ref} id="1234" style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledTimes(1);
    });

    test('node has imperative methods', () => {
      const ref = createRef<React.ElementRef<ViewType>>();
      act(() => {
        render(<View ref={ref} />);
      });
      const node = ref.current!;
      expect(isFunction(node.measure));
      expect(isFunction(node.measureLayout));
      expect(isFunction(node.measureInWindow));
    });
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<View style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<View testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
