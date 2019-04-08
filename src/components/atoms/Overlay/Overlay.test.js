import React from 'react';
import Overlay from './Overlay';
import { render } from 'react-testing-library';

test('Closed verlay renders', () => {
  const overlay = (
    <Overlay>
      <div
        style={{
          width: 468,
          height: 40,
          backgroundColor: 'white',
          textAlign: 'center',
          paddingTop: 20
        }}
      >
        Overlay
      </div>
    </Overlay>
  );
  const node = render(overlay);
  expect(node.container).toMatchSnapshot();
  expect(node.container.firstChild).toBeNull();
});

test('Open verlay renders', () => {
  const overlay = (
    <Overlay open>
      <div
        style={{
          width: 468,
          height: 40,
          backgroundColor: 'white',
          textAlign: 'center',
          paddingTop: 20
        }}
      >
        Overlay
      </div>
    </Overlay>
  );
  const node = render(overlay);

  expect(node.container).toMatchSnapshot();
  expect(node.container.firstChild).toBeTruthy();
  expect(node.container.firstChild.children[0].textContent).toEqual('Overlay');
});

test('Overlay click works', () => {
  const onClick = jest.fn();
  const overlay = (
    <Overlay open onClick={onClick}>
      <div
        style={{
          width: 468,
          height: 40,
          backgroundColor: 'white',
          textAlign: 'center',
          paddingTop: 20
        }}
      >
        Overlay
      </div>
    </Overlay>
  );
  const node = render(overlay);

  node.container.firstChild.click();
  expect(onClick).toHaveBeenCalled();
});
