import React from 'react';
import ScreenReaderText from './ScreenReaderText';
import { render } from '@testing-library/react';

test('ScreenReaderText renders', () => {
  const { container } = render(
    <ScreenReaderText message="some message">
      <div>some children component</div>
    </ScreenReaderText>
  );
  expect(container.firstChild).toMatchSnapshot();
});
