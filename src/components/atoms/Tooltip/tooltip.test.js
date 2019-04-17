import React from 'react';
import Tooltip from './Tooltip';
import { render, fireEvent, waitForElement } from 'react-testing-library';

test('Tooltip message renders on hover', async () => {
  const { container } = render(
    <Tooltip message="tooltip message">open tooltip</Tooltip>
  );

  const button = await waitForElement(() => container.querySelector('button'));
  fireEvent.mouseOver(button);

  expect(container.firstChild).toMatchSnapshot();
});
