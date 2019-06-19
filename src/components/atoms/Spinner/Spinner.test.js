import React from 'react';
import Spinner from './Spinner';
import { render } from '@testing-library/react';

test('Spinner renders', () => {
  const { container } = render(<Spinner />);
  expect(container.firstChild).toMatchSnapshot();
});
