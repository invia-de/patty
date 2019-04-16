import React from 'react';
import Tooltip from './Tooltip';
import { render } from 'react-testing-library';

test('Tooltip renders', () => {
  const { container } = render(<Tooltip />);
  expect(container.firstChild).toMatchSnapshot();
});
