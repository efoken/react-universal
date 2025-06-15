import type { AnyObject } from '@react-universal/utils';
import { isFunction, noop } from '@react-universal/utils';
import { composeStories } from '@storybook/react';
import { act, fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import type { MockInstance } from 'vitest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { View } from './View';
import * as stories from './View.stories';

function createEventTarget(node: any) {
  return {
    node,
    blur: () => fireEvent.blur(node),
    click: () => fireEvent.click(node),
    focus: (payload?: AnyObject) => fireEvent.focus(node, payload),
    pointerDown: (payload?: AnyObject) => fireEvent.pointerDown(node, payload),
  };
}

const {
  Default,
  PropAriaLabel,
  PropAriaLabelledBy,
  PropAriaLive,
  PropRole,
  PropDir,
  PropHref,
  PropHrefAttrs,
  PropLang,
  PropId,
  PropStyle,
  PropTestId,
} = composeStories(stories);

describe('View', () => {
  test('default', async () => {
    await Default.run();
    expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
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
    test('value is set', async () => {
      await PropAriaLabel.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-labelledby"', () => {
    test('value is set', async () => {
      await PropAriaLabelledBy.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-live"', () => {
    test('value is set', async () => {
      await PropAriaLive.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "role"', () => {
    test('value is set', async () => {
      await PropRole.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('value is "button"', async () => {
      await PropRole.run({ args: { role: 'button' } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', async () => {
      await PropRole.run({ args: { role: 'article' } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "dir"', () => {
    test('value is "ltr"', async () => {
      await PropDir.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('value is "rtl"', async () => {
      await PropDir.run({ args: { dir: 'rtl' } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "href"', () => {
    test('value is set', async () => {
      await PropHref.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('href with role', async () => {
      await PropHref.run({ args: { role: 'presentation' } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', async () => {
      const hrefAttrs = {
        download: 'filename.jpg',
      };
      await PropHrefAttrs.run({ args: { href: undefined, hrefAttrs } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('value is set', async () => {
      await PropHrefAttrs.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('target variant is set', async () => {
      const hrefAttrs = {
        target: 'blank',
      };
      await PropHrefAttrs.run({ args: { href: 'https://example.com', hrefAttrs } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('undefined values are excluded', async () => {
      const hrefAttrs = {
        download: undefined,
        rel: undefined,
        target: undefined,
      };
      await PropHrefAttrs.run({ args: { href: 'https://example.com', hrefAttrs } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "lang"', () => {
    test('undefined', async () => {
      await PropLang.run({ args: { lang: undefined } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('fr', async () => {
      await PropLang.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('ar', async () => {
      await PropLang.run({ args: { lang: 'ar' } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });

    test('with dir', async () => {
      await PropLang.run({ args: { dir: 'ltr', lang: 'ar' } });
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "id"', () => {
    test('value is set', async () => {
      await PropId.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = vi.fn();
      const ref = createRef<React.ComponentRef<typeof View>>();
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
      const ref = createRef<React.ComponentRef<typeof View>>();
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
      const ref = createRef<React.ComponentRef<typeof View>>();
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
      const ref = createRef<React.ComponentRef<typeof View>>();
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
      const ref = createRef<React.ComponentRef<typeof View>>();
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
    test('value is set', async () => {
      await PropStyle.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', async () => {
      await PropTestId.run();
      expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
    });
  });
});
