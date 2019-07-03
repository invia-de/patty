import { values, fill } from './ie11.polyfills';

test('Object.values() polyfill', () => {
  expect(values({ q: 1, w: 2, e: 3 })).toEqual([1, 2, 3]);
  expect(values(new String('qwe'))).toEqual(['q', 'w', 'e']);
  expect(values({ valueOf: 42 })).toEqual([42]);
  expect(values('abc')).toEqual(['a', 'b', 'c']);
  expect(() => values()).toThrow();
  expect(values(1)).toEqual([]);
});

test('Array.prototype.fill() polyfill', () => {
  Object.defineProperty(Array.prototype, 'fillTEST', {
    value: fill
  });

  expect(Array().fillTEST(5)).toEqual([]);
  expect(Array(5).fillTEST(5)).toEqual([5, 5, 5, 5, 5]);
  expect(Array(5).fillTEST(5, 1)).toEqual([undefined, 5, 5, 5, 5]);
  expect(Array(5).fillTEST(5, 1, 4)).toEqual([undefined, 5, 5, 5, undefined]);
  expect(Array(5).fillTEST(5, 6, 1)).toEqual([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ]);
  expect(Array(5).fillTEST(5, -3, 4)).toEqual([
    undefined,
    undefined,
    5,
    5,
    undefined
  ]);
  var valuesAreReferences = Array(3).fillTEST({});
  expect(valuesAreReferences).toEqual([{}, {}, {}]);
  valuesAreReferences[0].hi = 'hi';
  expect(valuesAreReferences).toEqual([
    { hi: 'hi' },
    { hi: 'hi' },
    { hi: 'hi' }
  ]);
  expect(() => {
    fill();
  }).toThrow();
});
