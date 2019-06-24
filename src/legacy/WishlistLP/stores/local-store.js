import localStorageIsAvailable from '../../../utils/localstorage';

export default function(
  page,
  sorting = '-age',
  store = 'wishlist',
  pageSize = 10
) {
  return new Promise(resolve => {
    if (!localStorageIsAvailable) {
      resolve({ items: [], hasMore: false });
      return;
    }

    const data = JSON.parse(window.localStorage.getItem(store)) || {};
    Object.keys(data).forEach(
      key => (data[key].priceValue = getPriceFromString(data[key].price || ''))
    );

    const items = sorted(data, sorting);
    resolve({
      items: items.slice(page * pageSize, (page + 1) * pageSize),
      hasMore: items.length - (page + 1) * pageSize > 0,
      total: items.length
    });
  });
}

export function sorted(data, sorting = '-age') {
  const sortFunctions = {
    '-age': (a, b) => data[b].date - data[a].date,
    '+age': (a, b) => data[a].date - data[b].date,
    '-price': (a, b) => data[b].priceValue - data[a].priceValue,
    '+price': (a, b) => data[a].priceValue - data[b].priceValue
  };
  const d = Object.keys(data)
    .sort(sortFunctions[sorting])
    .map(key => Object.assign(data[key], { key }));
  return d;
}

export function getPriceFromString(price) {
  return parseInt(price.split(' ').filter(val => parseInt(val) > 0)[0]) || 0;
}
