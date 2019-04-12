import React from 'react';
import Price from './Price';
import { render } from 'react-testing-library';

// https://stackoverflow.com/questions/26124914/how-to-test-react-proptypes-through-jest

test('Price renders correctly (default)', () => {
  const { container } = render(<Price value={90123.01} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders correctly (with decimals)', () => {
  const { container } = render(<Price value={90123.01} decimals />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders correctly (with decimals, symbol at the end)', () => {
  const { container } = render(
    <Price value={90123.01} decimals symbol="after" />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders correctly (with decimals, no symbol)', () => {
  const { container } = render(
    <Price value={90123.01} decimals symbol="none" />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders correctly (CHF symbol)', () => {
  const { container } = render(<Price value={90123.01} currency="CHF" />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders even if value is string', () => {
  const { container } = render(<Price value="123" />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders NaN', () => {
  const { container } = render(<Price />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Price renders (decimals, from `integer`)', () => {
  const { container } = render(<Price value={1282} decimals />);
  expect(container.firstChild).toMatchSnapshot();
});
