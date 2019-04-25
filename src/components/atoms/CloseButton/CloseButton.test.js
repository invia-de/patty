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

test('CloseButton renders with additional className', () => {
  const onClick = jest.fn();
  const { container } = render(
    <CloseButton onClick={onClick} className="test" />
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.className.indexOf('test') >= 0).toBeTruthy();
});
