import isActive from './features';

test('feature detection with isActive() and default values', () => {
  expect(isActive('some-feat')).toEqual(false);
  expect(isActive('some-feat', true)).toBe(true);
  expect(isActive()).toBe(false);
  expect(isActive(false)).toBe(false);
  expect(isActive({})).toBe(false);
  expect(isActive([])).toBe(false);
});
