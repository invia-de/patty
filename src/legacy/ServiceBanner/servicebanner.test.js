import React from 'react';
import ServiceBanner from './ServiceBanner';
import { render } from 'react-testing-library';

test('ServiceBanner renders', () => {
  const { container } = render(<ServiceBanner />);
  expect(container.firstChild).toMatchSnapshot();
});
