import React from 'react';
import {{placeHolderForName}} from './{{placeHolderForName}}';
import { render } from '@testing-library/react';


test('{{placeHolderForName}} renders', () => {
  const { container } = render(<{{placeHolderForName}} />);
  expect(container.firstChild).toMatchSnapshot();
});
