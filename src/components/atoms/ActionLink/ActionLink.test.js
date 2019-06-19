import React from 'react';
import ActionLink from './ActionLink';
import { render } from '@testing-library/react';

test('ActionLink renders', () => {
  const { container } = render(<ActionLink href="#">Test</ActionLink>);
  expect(container.firstChild).toMatchSnapshot();
});
