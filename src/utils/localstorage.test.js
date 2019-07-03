import localStorageIsAvailable, { testForStorage } from './localstorage';

test('localStorageIsAvailable should be true when available', () => {
  expect(localStorageIsAvailable).toEqual(true);
});

test('localStorageIsAvailable should be false when not available', () => {
  expect(testForStorage('foobarbaz')).toEqual(false);
});
