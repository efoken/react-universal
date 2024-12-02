import { render } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';
import { createElement } from './createElement';

function getAttribute(container: HTMLElement, attribute: string) {
  return container.firstChild instanceof Element
    ? container.firstChild.getAttribute(attribute)
    : undefined;
}

function getProperty(container: HTMLElement, prop: string) {
  return (container.firstChild as any)[prop];
}

describe('createElement', () => {
  it('renders different DOM elements', () => {
    let { container } = render(createElement('span'));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(createElement('main')));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(
      createElement('svg', {
        children: createElement('image', { href: '#href' }),
      }),
    ));
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "role"', () => {
    test('string component type', () => {
      const { container } = render(createElement('span', { role: 'link' }));
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });

    test('function component type', () => {
      const Custom: React.FC = () => <div />;
      const { container } = render(createElement(Custom, { role: 'link' }));
      expect(container.firstChild?.nodeName).toBe('DIV');
    });
  });

  describe('aria props', () => {
    test('aria-activedescendant', () => {
      let { container } = render(createElement('div', { 'aria-activedescendant': null }));
      expect(getAttribute(container, 'aria-activedescendant')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-activedescendant': 'abc' })));
      expect(getAttribute(container, 'aria-activedescendant')).toBe('abc');
    });

    test('aria-atomic', () => {
      let { container } = render(createElement('div', { 'aria-atomic': null }));
      expect(getAttribute(container, 'aria-atomic')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-atomic': true })));
      expect(getAttribute(container, 'aria-atomic')).toBe('true');
    });

    test('aria-autocomplete', () => {
      let { container } = render(createElement('div', { 'aria-autocomplete': null }));
      expect(getAttribute(container, 'aria-autocomplete')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-autocomplete': true })));
      expect(getAttribute(container, 'aria-autocomplete')).toBe('true');
    });

    test('aria-busy', () => {
      let { container } = render(createElement('div', { 'aria-busy': null }));
      expect(getAttribute(container, 'aria-busy')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-busy': true })));
      expect(getAttribute(container, 'aria-busy')).toBe('true');
    });

    test('aria-checked', () => {
      let { container } = render(createElement('div', { 'aria-checked': null }));
      expect(getAttribute(container, 'aria-checked')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-checked': true })));
      expect(getAttribute(container, 'aria-checked')).toBe('true');
    });

    test('aria-colcount', () => {
      let { container } = render(createElement('div', { 'aria-colcount': null }));
      expect(getAttribute(container, 'aria-colcount')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-colcount': 5 })));
      expect(getAttribute(container, 'aria-colcount')).toBe('5');
    });

    test('aria-colindex', () => {
      let { container } = render(createElement('div', { 'aria-colindex': null }));
      expect(getAttribute(container, 'aria-colindex')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-colindex': 5 })));
      expect(getAttribute(container, 'aria-colindex')).toBe('5');
    });

    test('aria-colspan', () => {
      let { container } = render(createElement('div', { 'aria-colspan': null }));
      expect(getAttribute(container, 'aria-colspan')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-colspan': 5 })));
      expect(getAttribute(container, 'aria-colspan')).toBe('5');
    });

    test('aria-controls', () => {
      let { container } = render(createElement('div', { 'aria-controls': null }));
      expect(getAttribute(container, 'aria-controls')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-controls': 'abc' })));
      expect(getAttribute(container, 'aria-controls')).toBe('abc');
    });

    test('aria-current', () => {
      let { container } = render(createElement('div', { 'aria-current': null }));
      expect(getAttribute(container, 'aria-current')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-current': 'page' })));
      expect(getAttribute(container, 'aria-current')).toBe('page');
    });

    test('aria-describedby', () => {
      let { container } = render(createElement('div', { 'aria-describedby': null }));
      expect(getAttribute(container, 'aria-describedby')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-describedby': 'abc' })));
      expect(getAttribute(container, 'aria-describedby')).toBe('abc');
    });

    test('aria-description', () => {
      let { container } = render(createElement('div', { 'aria-description': null }));
      expect(getAttribute(container, 'aria-description')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-description': 'abc' })));
      expect(getAttribute(container, 'aria-description')).toBe('abc');
    });

    test('aria-details', () => {
      let { container } = render(createElement('div', { 'aria-details': null }));
      expect(getAttribute(container, 'aria-details')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-details': 'abc' })));
      expect(getAttribute(container, 'aria-details')).toBe('abc');
    });

    test('aria-disabled', () => {
      let { container } = render(createElement('button', { 'aria-disabled': null }));
      expect(getAttribute(container, 'aria-disabled')).toBeNull();
      expect(getProperty(container, 'disabled')).toBe(false);
      ({ container } = render(createElement('button', { 'aria-disabled': true })));
      expect(getAttribute(container, 'aria-disabled')).toBe('true');
      expect(getProperty(container, 'disabled')).toBe(true);
    });

    test('aria-errormessage', () => {
      let { container } = render(createElement('div', { 'aria-errormessage': null }));
      expect(getAttribute(container, 'aria-errormessage')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-errormessage': 'abc' })));
      expect(getAttribute(container, 'aria-errormessage')).toBe('abc');
    });

    test('aria-expanded', () => {
      let { container } = render(createElement('div', { 'aria-expanded': null }));
      expect(getAttribute(container, 'aria-expanded')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-expanded': true })));
      expect(getAttribute(container, 'aria-expanded')).toBe('true');
    });

    test('aria-flowto', () => {
      let { container } = render(createElement('div', { 'aria-flowto': null }));
      expect(getAttribute(container, 'aria-flowto')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-flowto': 'abc' })));
      expect(getAttribute(container, 'aria-flowto')).toBe('abc');
    });

    test('aria-haspopup', () => {
      let { container } = render(createElement('div', { 'aria-haspopup': null }));
      expect(getAttribute(container, 'aria-haspopup')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-haspopup': true })));
      expect(getAttribute(container, 'aria-haspopup')).toBe('true');
    });

    test('aria-hidden', () => {
      let { container } = render(createElement('div', { 'aria-hidden': null }));
      expect(getAttribute(container, 'aria-hidden')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-hidden': true })));
      expect(getAttribute(container, 'aria-hidden')).toBe('true');
    });

    test('aria-invalid', () => {
      let { container } = render(createElement('input', { 'aria-invalid': null }));
      expect(getAttribute(container, 'aria-invalid')).toBeNull();
      ({ container } = render(createElement('input', { 'aria-invalid': true })));
      expect(getAttribute(container, 'aria-invalid')).toBe('true');
    });

    test('aria-keyshortcuts', () => {
      let { container } = render(createElement('div', { 'aria-keyshortcuts': null }));
      expect(getAttribute(container, 'aria-keyshortcuts')).toBeNull();
      ({ container } = render(
        createElement('div', {
          'aria-keyshortcuts': 'ArrowUp Enter Space Alt+Shift+T',
        }),
      ));
      expect(getAttribute(container, 'aria-keyshortcuts')).toBe('ArrowUp Enter Space Alt+Shift+T');
    });

    test('aria-label', () => {
      let { container } = render(createElement('div', { 'aria-label': null }));
      expect(getAttribute(container, 'aria-label')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-label': 'abc' })));
      expect(getAttribute(container, 'aria-label')).toBe('abc');
    });

    test('aria-labelledby', () => {
      let { container } = render(createElement('div', { 'aria-labelledby': null }));
      expect(getAttribute(container, 'aria-labelledby')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-labelledby': 'abc' })));
      expect(getAttribute(container, 'aria-labelledby')).toBe('abc');
    });

    test('aria-level', () => {
      let { container } = render(createElement('div', { 'aria-level': null }));
      expect(getAttribute(container, 'aria-level')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-level': 3 })));
      expect(getAttribute(container, 'aria-level')).toBe('3');
    });

    test('aria-live', () => {
      let { container } = render(createElement('div', { 'aria-live': null }));
      expect(getAttribute(container, 'aria-live')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-live': 'polite' })));
      expect(getAttribute(container, 'aria-live')).toBe('polite');
    });

    test('aria-modal', () => {
      let { container } = render(createElement('div', { 'aria-modal': null }));
      expect(getAttribute(container, 'aria-modal')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-modal': true })));
      expect(getAttribute(container, 'aria-modal')).toBe('true');
    });

    test('aria-multiline', () => {
      let { container } = render(createElement('div', { 'aria-multiline': null }));
      expect(getAttribute(container, 'aria-multiline')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-multiline': true })));
      expect(getAttribute(container, 'aria-multiline')).toBe('true');
    });

    test('aria-multiselectable', () => {
      let { container } = render(createElement('div', { 'aria-multiselectable': null }));
      expect(getAttribute(container, 'aria-multiselectable')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-multiselectable': true })));
      expect(getAttribute(container, 'aria-multiselectable')).toBe('true');
    });

    test('aria-orientation', () => {
      let { container } = render(createElement('div', { 'aria-orientation': null }));
      expect(getAttribute(container, 'aria-orientation')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-orientation': 'vertical' })));
      expect(getAttribute(container, 'aria-orientation')).toBe('vertical');
    });

    test('aria-owns', () => {
      let { container } = render(createElement('div', { 'aria-owns': null }));
      expect(getAttribute(container, 'aria-owns')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-owns': 'abc' })));
      expect(getAttribute(container, 'aria-owns')).toBe('abc');
    });

    test('aria-placeholder', () => {
      let { container } = render(createElement('div', { 'aria-placeholder': null }));
      expect(getAttribute(container, 'aria-placeholder')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-placeholder': 'MM-DD-YYYY' })));
      expect(getAttribute(container, 'aria-placeholder')).toBe('MM-DD-YYYY');
    });

    test('aria-posinset', () => {
      let { container } = render(createElement('div', { 'aria-posinset': null }));
      expect(getAttribute(container, 'aria-posinset')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-posinset': 3 })));
      expect(getAttribute(container, 'aria-posinset')).toBe('3');
    });

    test('aria-pressed', () => {
      let { container } = render(createElement('div', { 'aria-pressed': null }));
      expect(getAttribute(container, 'aria-pressed')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-pressed': true })));
      expect(getAttribute(container, 'aria-pressed')).toBe('true');
    });

    test('aria-readonly', () => {
      let { container } = render(createElement('input', { 'aria-readonly': null }));
      expect(getAttribute(container, 'aria-readonly')).toBeNull();
      expect(getProperty(container, 'readOnly')).toBe(false);
      ({ container } = render(createElement('input', { 'aria-readonly': true })));
      expect(getAttribute(container, 'aria-readonly')).toBe('true');
      expect(getProperty(container, 'readOnly')).toBe(true);
    });

    test('aria-required', () => {
      let { container } = render(createElement('input', { 'aria-required': null }));
      expect(getAttribute(container, 'aria-required')).toBeNull();
      expect(getProperty(container, 'required')).toBe(false);
      ({ container } = render(createElement('input', { 'aria-required': true })));
      expect(getAttribute(container, 'aria-required')).toBe('true');
      expect(getProperty(container, 'required')).toBe(true);
    });

    test('aria-roledescription', () => {
      let { container } = render(createElement('div', { 'aria-roledescription': null }));
      expect(getAttribute(container, 'aria-roledescription')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-roledescription': 'abc' })));
      expect(getAttribute(container, 'aria-roledescription')).toBe('abc');
    });

    test('aria-rowcount', () => {
      let { container } = render(createElement('div', { 'aria-rowcount': null }));
      expect(getAttribute(container, 'aria-rowcount')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-rowcount': 5 })));
      expect(getAttribute(container, 'aria-rowcount')).toBe('5');
    });

    test('aria-rowindex', () => {
      let { container } = render(createElement('div', { 'aria-rowindex': null }));
      expect(getAttribute(container, 'aria-rowindex')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-rowindex': 5 })));
      expect(getAttribute(container, 'aria-rowindex')).toBe('5');
    });

    test('aria-rowspan', () => {
      let { container } = render(createElement('div', { 'aria-rowspan': null }));
      expect(getAttribute(container, 'aria-rowspan')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-rowspan': 5 })));
      expect(getAttribute(container, 'aria-rowspan')).toBe('5');
    });

    test('aria-selected', () => {
      let { container } = render(createElement('div', { 'aria-selected': null }));
      expect(getAttribute(container, 'aria-selected')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-selected': true })));
      expect(getAttribute(container, 'aria-selected')).toBe('true');
    });

    test('aria-setsize', () => {
      let { container } = render(createElement('div', { 'aria-setsize': null }));
      expect(getAttribute(container, 'aria-setsize')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-setsize': 5 })));
      expect(getAttribute(container, 'aria-setsize')).toBe('5');
    });

    test('aria-sort', () => {
      let { container } = render(createElement('div', { 'aria-sort': null }));
      expect(getAttribute(container, 'aria-sort')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-sort': 'ascending' })));
      expect(getAttribute(container, 'aria-sort')).toBe('ascending');
    });

    test('aria-valuemax', () => {
      let { container } = render(createElement('div', { 'aria-valuemax': null }));
      expect(getAttribute(container, 'aria-valuemax')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-valuemax': 100 })));
      expect(getAttribute(container, 'aria-valuemax')).toBe('100');
    });

    test('aria-valuemin', () => {
      let { container } = render(createElement('div', { 'aria-valuemin': null }));
      expect(getAttribute(container, 'aria-valuemin')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-valuemin': 10 })));
      expect(getAttribute(container, 'aria-valuemin')).toBe('10');
    });

    test('aria-valuenow', () => {
      let { container } = render(createElement('div', { 'aria-valuenow': null }));
      expect(getAttribute(container, 'aria-valuenow')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-valuenow': 50 })));
      expect(getAttribute(container, 'aria-valuenow')).toBe('50');
    });

    test('aria-valuetext', () => {
      let { container } = render(createElement('div', { 'aria-valuetext': null }));
      expect(getAttribute(container, 'aria-valuetext')).toBeNull();
      ({ container } = render(createElement('div', { 'aria-valuetext': 'fifty' })));
      expect(getAttribute(container, 'aria-valuetext')).toBe('fifty');
    });

    test('dataSet', () => {
      const { container } = render(
        createElement('div', {
          dataSet: {
            one: '1',
            two: '2',
            camelCase: 'camelCase',
            msPrefix: 'msPrefix',
          },
        }),
      );
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          data-camel-case="camelCase"
          data-ms-prefix="msPrefix"
          data-one="1"
          data-two="2"
        />
      `);
    });

    test('role', () => {
      let { container } = render(createElement('div', { role: null }));
      expect(getAttribute(container, 'role')).toBeNull();
      ({ container } = render(createElement('div', { role: 'button' })));
      expect(container.firstChild?.nodeName).toBe('BUTTON');
      expect(getAttribute(container, 'role')).toBeNull();
      ({ container } = render(createElement('div', { role: 'none' })));
      expect(getAttribute(container, 'role')).toBe('presentation');
    });

    test('tabIndex', () => {
      let { container } = render(createElement('div', { tabIndex: null }));
      expect(getAttribute(container, 'tabindex')).toBeNull();
      ({ container } = render(createElement('div', { tabIndex: 0 })));
      expect(getAttribute(container, 'tabindex')).toBe('0');
      ({ container } = render(createElement('button', { tabIndex: -1 })));
      expect(getAttribute(container, 'tabindex')).toBe('-1');
      ({ container } = render(createElement('button', { 'aria-disabled': true })));
      expect(getAttribute(container, 'tabindex')).toBe('-1');
      ({ container } = render(createElement('button')));
      expect(getAttribute(container, 'tabindex')).toBeNull();
      ({ container } = render(createElement('div', { role: 'button', tabIndex: -1 })));
      expect(getAttribute(container, 'tabindex')).toBe('-1');
      ({ container } = render(createElement('div', { role: 'checkbox' })));
      expect(getAttribute(container, 'tabindex')).toBe('0');
    });

    test('testID', () => {
      let { container } = render(createElement('div', { testID: null }));
      expect(getAttribute(container, 'data-testid')).toBeNull();
      ({ container } = render(createElement('div', { testID: 'abc' })));
      expect(getAttribute(container, 'data-testid')).toBe('abc');
    });
  });
});
