import React from 'react';
import PriceHistory from './PriceHistory';
import { render, getNodeText } from '@testing-library/react';
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
  expect(container.firstChild.children[1].children[0].childNodes).toHaveLength(
    14
  );
});

test('PriceHistory mobile renders', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
      forceMobile
    />
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getNodeText(container.firstChild.children[1].children[0])).toEqual(
    'Oktober 2019'
  );
  expect(container.firstChild.children[1].children[1].childNodes).toHaveLength(
    7
  );
});

test('PriceHistory renders as folded', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
      folded
    />
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.children).toHaveLength(1);
  expect(getNodeText(container.firstChild.children[0].children[1])).toEqual(
    'Preisverlauf anzeigen'
  );

  container.firstChild.children[0].click();
  expect(container.firstChild).toMatchSnapshot();
  expect(getNodeText(container.firstChild.children[0].children[1])).toEqual(
    'Preisverlauf'
  );
  expect(container.firstChild.children[1].children[0].childNodes).toHaveLength(
    14
  );
});

test('PriceHistory mobile renders', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
      forceMobile
    />
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(getNodeText(container.firstChild.children[1].children[0])).toEqual(
    'Oktober 2019'
  );
  expect(container.firstChild.children[1].children[1].childNodes).toHaveLength(
    7
  );
});

test('PriceHistory navigates to prev view', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
    />
  );
  container.firstChild.children[0].click();
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.children[1].children[0].childNodes).toHaveLength(
    14
  );
});

test('PriceHistory navigates to next view', () => {
  const { container } = render(
    <PriceHistory
      defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
    />
  );
  container.firstChild.children[1].children[1].children[2].click();
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild.children[1].children[0].childNodes).toHaveLength(
    14
  );
});

test('PriceHistory onBarClick hasBeenCalled', () => {
  const onClick = jest.fn();
  const { container } = render(<PriceHistory onBarClick={onClick} />);
  expect(
    container.firstChild.children[1].children[0].children[1].children[1]
  ).toMatchSnapshot();
  container.firstChild.children[1].children[0].children[1].children[1].click();
  expect(onClick).toHaveBeenCalled();
});
