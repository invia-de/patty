import React from 'react';
import UniversalPrice from './UniversalPrice';
import { render } from 'react-testing-library';

test('UniversalPrice renders', () => {
  const { container } = render(<UniversalPrice />);
  expect(container.firstChild).toMatchSnapshot();
});
