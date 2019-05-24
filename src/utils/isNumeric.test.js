import isNumeric from './isNumeric';

test('test isAcive', () => {
  expect(isNumeric('some-string')).toEqual(false);
  expect(isNumeric('123e')).toBe(false);
  expect(isNumeric('0')).toBe(true);
  expect(isNumeric(0)).toBe(true);
  expect(isNumeric(null)).toBe(false);
  expect(isNumeric(NaN)).toBe(false);
  expect(isNumeric()).toBe(false);
  expect(isNumeric({})).toBe(false);
  expect(isNumeric([])).toBe(false);
  expect(isNumeric(['0'])).toBe(true);
  expect(isNumeric({ '0': 1 })).toBe(false);
});
