import localStorageIsAvailable from './localstorage';

test('localStorageIsAvailable should be true', () => {
  expect(localStorageIsAvailable).toEqual(true);
});
