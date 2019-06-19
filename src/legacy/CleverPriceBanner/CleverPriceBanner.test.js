import React from 'react';
import CleverPriceBanner from './CleverPriceBanner';
import { render } from '@testing-library/react';

test('Desktop CleverPriceBanner renders', () => {
  const { container } = render(<CleverPriceBanner />);
  expect(container).toMatchSnapshot();

  const trigger = container.firstChild;
  trigger.click();

  expect(container).toMatchSnapshot();
});

test('Mobile CleverPriceBanner renders', () => {
  const { container } = render(<CleverPriceBanner mobile />);
  expect(container).toMatchSnapshot();

  const trigger = container.firstChild;
  trigger.click();

  expect(container).toMatchSnapshot();
});
