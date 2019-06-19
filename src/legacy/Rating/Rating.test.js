import React from 'react';
import Rating from './Rating';
import { render } from '@testing-library/react';

test('Rating renders', () => {
  const { container } = render(<Rating rating={2} count={1} link="/" />);
  expect(container.firstChild).toMatchSnapshot();
});
