import React from 'react';
import NoBreak from './NoBreak';
import { render } from '@testing-library/react';

test('NoBreak renders', () => {
  const { container } = render(<NoBreak>lorem ipusm</NoBreak>);
  expect(container.firstChild).toMatchSnapshot();
});

test('NoBreak renders with ellipsis styles', () => {
  const { container } = render(<NoBreak>lorem ipusm</NoBreak>);
  expect(container.firstChild).toMatchSnapshot();
});
