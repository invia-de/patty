// START Object.values
export function values(obj) {
  var vals = [];

  if (typeof obj === 'undefined' || obj === null) {
    throw new TypeError(
      'Object.values(): Cannot convert undefined or null to object.'
    );
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      vals.push(obj[key]);
    }
  }

  return vals;
}

if (typeof Object.values !== 'function') {
  Object.values = values;
}
// END Object.values

// START Array.prototype.fill
function determineMinMax(count, length) {
  return count < 0 ? Math.max(length + count, 0) : Math.min(count, length);
}

export function fill(value, start, end) {
  if (this == null) {
    throw new TypeError(
      'Array.prototype.fill(): `this` is null or not defined.'
    );
  }

  var returnValue = Object(this);
  var length = returnValue.length >>> 0;
  var index = determineMinMax(start >> 0, length);
  var final = determineMinMax(end === undefined ? length : end >> 0, length);

  while (index < final) {
    returnValue[index] = value;
    index++;
  }

  return returnValue;
}

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: fill
  });
}
// END Array.prototype.fill
