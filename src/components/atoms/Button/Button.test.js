import React from 'react';
import Button from './Button';
import { render } from '@testing-library/react';

test('Button renders and clicks', () => {
  const onClick = jest.fn();
  const { container } = render(<Button onClick={onClick} />);

  expect(container.firstChild).toMatchSnapshot();
  container.firstChild.click();
  expect(onClick).toHaveBeenCalled();
});
