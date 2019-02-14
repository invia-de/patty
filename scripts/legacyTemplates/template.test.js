import React from 'react';
import {{placeHolderForName}} from './{{placeHolderForName}}';
import { render } from 'react-testing-library';


test('{{placeHolderForName}} renders', () => {
  const { container } = render(<{{placeHolderForName}} />);
  expect(container.firstChild).toMatchSnapshot();
});