import applicationData from './applicationData';

test('applicationData should return expected values', () => {
  /** mock window.applicationData START */

  const _oData = {
    test: 'some_value'
  };

  const _travel = function(gRootElement, aKeys, gUndefined) {
    var sCurrentKey;

    if (aKeys.length <= 0) {
      return gRootElement;
    }

    sCurrentKey = aKeys.shift();

    if ('undefined' === typeof gRootElement[sCurrentKey]) {
      return gUndefined;
    }

    return _travel(gRootElement[sCurrentKey], aKeys, gUndefined);
  };

  const _prepareKey = function(sKey) {
    sKey = sKey || '';

    if ('string' !== typeof sKey) {
      return [];
    }

    sKey = sKey
      .replace(/\s+/g, '') // remove Whitespace
      .replace(/\[\]/g, '') // remove []
      .split('.');

    return sKey;
  };

  window.applicationData = function(sKey, gUndefined) {
    var aKey = _prepareKey(sKey),
      gPointer;

    if (aKey.length <= 0) {
      return gUndefined;
    }

    gPointer = _travel(_oData, aKey, gUndefined);

    return gPointer;
  };
  /** mock window.applicationData END */

  expect(window.applicationData('one')).toEqual(undefined);
  expect(window.applicationData('one', 'two')).toEqual('two');
  expect(window.applicationData('test', 'two')).toEqual('some_value');
  expect(window.applicationData('test.deep.access')).toEqual(undefined);
  expect(window.applicationData('test.deep.access', 'two')).toEqual('two');
  expect(window.applicationData()).toEqual(undefined);
});

test('applicationData should return always defaultValue when window.applicationData is not available', () => {
  expect(applicationData('one')).toEqual(undefined);
  expect(applicationData('one', 'two')).toEqual('two');
  expect(applicationData('test', 'two')).toEqual('two');
  expect(applicationData('test.deep.access')).toEqual(undefined);
  expect(applicationData('test.deep.access', 'two')).toEqual('two');
  expect(applicationData()).toEqual(undefined);
});
