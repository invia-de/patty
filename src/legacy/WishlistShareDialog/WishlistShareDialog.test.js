import React from 'react';
import WishlistShareDialog from './WishlistShareDialog';
import { render } from '@testing-library/react';

test('WishlistShareDialog renders', () => {
  const { container } = render(<WishlistShareDialog />);
  expect(container.firstChild).toMatchSnapshot();
});
