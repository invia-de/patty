import noop from './noop';

test('noop is a function that returns undefined', () => {
  expect(typeof noop).toEqual('function');
  expect(noop()).toBeUndefined();
});
