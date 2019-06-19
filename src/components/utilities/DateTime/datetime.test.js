import React from 'react';
import DateTime from './DateTime';
import { render } from '@testing-library/react';

test('DateTime renders', () => {
  const { container } = render(
    <DateTime value="2019-12-01" format="wd dd.mm.yyyy" />
  );
  expect(container.firstChild).toMatchSnapshot();
});
