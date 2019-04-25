import React from 'react';
import DropDown from './DropDown';
import { render } from 'react-testing-library';

test('DropDown renders', () => {
  const { container } = render(<DropDown />);
  expect(container.firstChild).toMatchSnapshot();
});
