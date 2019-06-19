import React from 'react';
import UniversalPrice from './UniversalPrice';
import { render } from '@testing-library/react';

test('UniversalPrice renders', () => {
  const { container } = render(<UniversalPrice />);
  expect(container.firstChild).toMatchSnapshot();
});
