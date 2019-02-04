import React from 'react';
import {{placeHolderForName}} from './{{placeHolderForName}}';
import renderer from 'react-testing-library';

const { container } = render({{placeHolderForName}});

test('{{placeHolderForName}} renders', () => {
  expect(container.toJSON()).toMatchSnapshot();
});