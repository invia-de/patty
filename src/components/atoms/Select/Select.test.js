import React from 'react';
import Select from './Select';
import { render } from '@testing-library/react';

test('Select renders', () => {
  const { container } = render(<Select />);
  expect(container.firstChild).toMatchSnapshot();
});
