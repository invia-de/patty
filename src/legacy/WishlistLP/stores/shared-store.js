import { sorted, getPriceFromString } from './local-store';

let data = null;

export default function(url, agent, id, page, sorting = '-age', pageSize = 10) {
  return new Promise(resolve => {
    if (!data) {
      const loadURL = new URL(url);
      loadURL.search = new URLSearchParams({ id, agent });
      fetch(loadURL)
        .then(response => response.json())
        .catch(error => {
          console.error(error);
          return null;
        })
        .then(json => {
          const list =
            json && json.success ? JSON.parse(json.response.wishlist) : [];
          data = {};
          list.forEach(item => {
            const key = `${item.hotelId}_${item.hotelIdType}`;
            data[key] = item;
            data[key].priceValue = getPriceFromString(data[key].price || '');
          });
          prepareData(data, resolve, page, sorting, pageSize);
        });
    } else {
      prepareData(data, resolve, page, sorting, pageSize);
    }
  });
}

function prepareData(data, resolve, page, sorting = '-age', pageSize = 10) {
  const items = sorted(data, sorting);

  resolve({
    items: items.slice(page * pageSize, (page + 1) * pageSize),
    hasMore: items.length - (page + 1) * pageSize > 0,
    total: items.length
  });
}
