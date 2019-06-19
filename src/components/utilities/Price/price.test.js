import React from 'react';
import Price from './Price';
import { render } from '@testing-library/react';

test('Price renders correctly (default)', () => {
  const { container } = render(<Price value={90123.01} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders correctly (with decimals)', () => {
  const { container } = render(<Price value={90123.01} decimals />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders correctly (CHF symbol)', () => {
  const { container } = render(<Price value={90123.01} currency="CHF" />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders (decimals, from `integer`)', () => {
  const { container } = render(<Price value={1282} decimals />);
  expect(container.firstChild).toMatchSnapshot();
});
