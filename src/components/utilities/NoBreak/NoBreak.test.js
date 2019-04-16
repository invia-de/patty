import React from 'react';
import NoBreak from './NoBreak';
import { render } from 'react-testing-library';

test('NoBreak renders', () => {
  const { container } = render(<NoBreak>lorem ipusm</NoBreak>);
  expect(container.firstChild).toMatchSnapshot();
});

test('NoBreak renders with ellipsis styles', () => {
  const { container } = render(<NoBreak>lorem ipusm</NoBreak>);
  expect(container.firstChild).toMatchSnapshot();
});
