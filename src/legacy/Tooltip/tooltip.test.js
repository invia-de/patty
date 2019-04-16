import React from 'react';
import Tooltip from './Tooltip';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

test('Tooltip message renders on hover', async () => {
  const { container, getByRole } = render(
    <Tooltip message="tooltip message">open tooltip</Tooltip>
  );
  const button = await waitForElement(() => container.querySelector('button'));
  fireEvent.mouseOver(button);
  const tooltip = await waitForElement(() => getByRole('tooltip'));
  expect(tooltip).toHaveTextContent('tooltip message');
});
