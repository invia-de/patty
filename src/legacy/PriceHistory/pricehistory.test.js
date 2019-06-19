import React from 'react';
import PriceHistory from './PriceHistory';
import { render } from '@testing-library/react';
import travelService from '../../utils/travelService';
import response from './mock.json';

beforeEach(() => {
  travelService.mock('search-pricechart', true, response);
});

test('PriceHistory renders', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.children[1].childNodes).toHaveLength(14);
});

test('PriceHistory navigates to prev view', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
    />
  );
  container.firstChild.children[2].firstChild.click();
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.children[1].childNodes).toHaveLength(14);
});

test('PriceHistory navigates to next view', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
    />
  );
  container.firstChild.children[2].children[2].click();
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.children[1].childNodes).toHaveLength(14);
});

test('PriceHistory onBarClick hasBeenCalled', () => {
  const onClick = jest.fn();
  const { container } = render(<PriceHistory onBarClick={onClick} />);
  container.firstChild.children[1].firstChild.children[1].click();
  expect(onClick).toHaveBeenCalled();
});
