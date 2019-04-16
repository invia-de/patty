import React from 'react';
import AllIcons, { Icon } from './Icon';
import { render } from 'react-testing-library';

Object.keys(AllIcons).forEach(manner => {
  if (manner !== 'Icon') {
    const Icon = AllIcons[manner];

    test(manner + ' renders', () => {
      const { container } = render(<Icon />);
      expect(container.firstChild).toMatchSnapshot();
    });
  }
});

test('Icon renders (icon path)', () => {
  const { container } = render(
    <Icon
      path={[
        'M11.917 13.167l-11.917-12.083h32l-12 12.083v15.667l-8.083 2.083z'
      ]}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
