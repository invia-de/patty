import React from 'react';
import CloseButton from './CloseButton';
import { render } from 'react-testing-library';

test('CloseButton renders', () => {
  const { container } = render(<CloseButton />);
  expect(container.firstChild).toMatchSnapshot();
});
