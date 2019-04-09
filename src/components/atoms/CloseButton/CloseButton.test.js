import React from 'react';
import CloseButton from './CloseButton';
import { render } from 'react-testing-library';

test('CloseButton renders', () => {
  const onClick = jest.fn();
  const { container } = render(<CloseButton onClick={onClick} />);
  expect(container.firstChild).toMatchSnapshot();

  container.firstChild.click();
  expect(onClick).toHaveBeenCalled();
});
