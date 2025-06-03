import { composeStories } from '@storybook/react';
import { describe, expect, test } from 'vitest';
import * as stories from './Button.stories';

const { Default } = composeStories(stories);

describe('Button', () => {
  test('default', async () => {
    await Default.run();
    expect(document.body.firstElementChild?.firstChild).toMatchSnapshot();
  });
});
