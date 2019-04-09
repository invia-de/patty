import React from 'react';
import PriceHistory from './PriceHistory';
import { render } from 'react-testing-library';

test('PriceHistory renders', () => {
  const { container } = render(<PriceHistory />);
  expect(container.firstChild).toMatchSnapshot();
});
