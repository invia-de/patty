import React from 'react';
import CleverPriceBanner from './CleverPriceBanner';
import { render } from 'react-testing-library';

test('CleverPriceBanner renders', () => {
  const { container } = render(<CleverPriceBanner />);
  expect(container.firstChild).toMatchSnapshot();
});
