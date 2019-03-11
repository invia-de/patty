import React from 'react';
import Icons from './Icons';
import { render } from 'react-testing-library';

test('Icons renders', () => {
  const { container } = render(<Icons />);
  expect(container.firstChild).toMatchSnapshot();
});
