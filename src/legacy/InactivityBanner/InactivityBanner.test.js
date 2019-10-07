import React from 'react';
import InactivityBanner from './InactivityBanner';
import { render } from '@testing-library/react';
import { getByText } from '@testing-library/dom';

test('InactivityBanner renders and clicks', done => {
  const onClick = jest.fn();
  const { container } = render(
    <InactivityBanner timeOut={2} onClick={onClick} />
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toBeFalsy();

  setTimeout(() => {
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeTruthy();

    const button = getByText(container, 'Aktualisieren');
    button.click();
    expect(onClick).toHaveBeenCalled();

    done();
  }, 2500);
});
