import React from 'react';
import Stars from './Stars';
import { render } from '@testing-library/react';

test('Stars renders', () => {
  const { container } = render(<Stars value={3} />);
  expect(container.firstChild).toMatchSnapshot();
});
