import React from 'react';
import Loading from './Loading';
import { render } from 'react-testing-library';

test('Loading renders', () => {
  const { container } = render(<Loading />);
  expect(container.firstChild).toMatchSnapshot();
});
