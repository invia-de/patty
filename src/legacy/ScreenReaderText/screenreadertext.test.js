import React from 'react';
import ScreenReaderText from './ScreenReaderText';
import { render } from 'react-testing-library';

test('ScreenReaderText renders', () => {
  const { container } = render(<ScreenReaderText />);
  expect(container.firstChild).toMatchSnapshot();
});
