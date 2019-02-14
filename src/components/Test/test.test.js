import React from 'react';
import Test from './Test';
import { render } from 'react-testing-library';

test('Test renders', () => {
  const { container } = render(<Test />);
  expect(container.firstChild).toMatchSnapshot();
});
