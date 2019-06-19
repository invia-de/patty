import React from 'react';
import DropDown from './DropDown';
import { render } from 'react-testing-library';

test('DropDown renders', () => {
  const { container } = render(
    <DropDown handler={<span>hi</span>}>
      <div>pass test for now</div>
    </DropDown>
  );
  expect(container.firstChild).toMatchSnapshot();
});
