import React from 'react';
import Modal from './Modal';
import { render } from 'react-testing-library';

test('Modal renders', () => {
  const modal = (
    <Modal trigger={<button>Open modal</button>}>Hello World!</Modal>
  );
  const { container } = render(modal);
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.childNodes).toHaveLength(1);

  const trigger = container.firstChild.children[0];
  trigger.click();

  expect(container).toMatchSnapshot();
  expect(container.firstChild.childNodes).toHaveLength(2);

  expect(container.firstChild.childNodes[1].textContent).toEqual(
    'Hello World!'
  );
});
