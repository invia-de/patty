import isActive from './features';
import { isCallExpression } from '@babel/types';

test('test for active features', () => {
  expect(isActive('some-feat')).toEqual(false);
  expect(isActive('some-feat', true)).toBe(true);
  expect(isActive()).toBe(false);
});
