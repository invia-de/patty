import React from 'react';
import WishlistLP from './WishlistLP';
import { render } from '@testing-library/react';

test('WishlistLP renders', () => {
  const { container } = render(<WishlistLP />);
  expect(container.firstChild).toMatchSnapshot();
});
