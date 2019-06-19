import React from 'react';
import Loading from './Loading';
import { render } from '@testing-library/react';

test('Loading renders', () => {
  const { container } = render(<Loading />);
  expect(container.firstChild).toMatchSnapshot();
});
