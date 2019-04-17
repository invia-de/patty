import React from 'react';
import Icon from './Icon';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

test('Hotline renders', () => {
  const { container } = render(<Icon.Hotline />);
  expect(container.firstChild).toMatchSnapshot();
});

test('ArrowRight renders', () => {
  const { container } = render(<Icon.ArrowRight />);
  expect(container.firstChild).toMatchSnapshot();
});

test('ArrowLeft renders', () => {
  const { container } = render(<Icon.ArrowLeft />);
  expect(container.firstChild).toMatchSnapshot();
});
