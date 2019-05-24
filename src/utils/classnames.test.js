import cx from './classnames';

test('classnames should combine strings correctly', () => {
  expect(cx('one', true && 'two', false && 'not-added')).toEqual('one two');
  expect(cx()).toEqual('');
  expect(cx(['wow'], { true: 'two' })).toEqual('');
});
