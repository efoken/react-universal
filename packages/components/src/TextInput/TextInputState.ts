import type { AnyObject } from '@react-universal/utils';

const ignoreElements: AnyObject<boolean> = {
  A: true,
  BODY: true,
  INPUT: true,
  SELECT: true,
  TEXTAREA: true,
};

function focusElement(node: HTMLElement) {
  try {
    const name = node.nodeName;
    // A tabIndex of -1 allows element to be programmatically focused but
    // prevents keyboard focus. We don't want to set the tabIndex value on
    // elements that should not prevent keyboard focus.
    if (
      node.getAttribute('tabIndex') == null &&
      node.isContentEditable !== true &&
      ignoreElements[name] == null
    ) {
      node.setAttribute('tabIndex', '-1');
    }
    node.focus();
  } catch {
    // do nothing
  }
}

// biome-ignore lint/complexity/noStaticOnlyClass:
export class TextInputState {
  /**
   * Internal state
   */
  static #currentlyFocusedNode: HTMLElement | null;

  /**
   * Sets the internal state.
   */
  static setCurrentlyFocusedNode(currentlyFocusedNode: HTMLElement | null) {
    TextInputState.#currentlyFocusedNode = currentlyFocusedNode;
  }

  /**
   * Returns the ID of the currently focused text field, if one exists. If no
   * text field is focused it returns null.
   */
  static currentlyFocusedField() {
    if (document.activeElement !== TextInputState.#currentlyFocusedNode) {
      TextInputState.#currentlyFocusedNode = null;
    }
    return TextInputState.#currentlyFocusedNode;
  }

  /**
   * Focuses the specified text field. Noop if the text field was already
   * focused.
   * @param {Object} textFieldNode ID of the text field to focus
   */
  static focusTextInput(textFieldNode: HTMLElement | null) {
    if (textFieldNode != null) {
      TextInputState.#currentlyFocusedNode = textFieldNode;
      if (document.activeElement !== textFieldNode) {
        focusElement(textFieldNode);
      }
    }
  }

  /**
   * Unfocuses the specified text field. Noop if it wasn't focused.
   * @param {Object} textFieldNode ID of the text field to unfocus
   */
  static blurTextInput(textFieldNode: HTMLElement | null) {
    if (textFieldNode != null) {
      TextInputState.#currentlyFocusedNode = null;
      if (document.activeElement === textFieldNode) {
        try {
          textFieldNode.blur();
        } catch {
          // do nothing
        }
      }
    }
  }
}
