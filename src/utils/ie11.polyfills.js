if (typeof Object.values !== 'function') {
  Object.values = function(obj) {
    var vals = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        vals.push(obj[key]);
      }
    }

    return vals;
  };
}

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {
      var O = Object(this);

      var len = O.length >>> 0;

      var start = arguments[1];
      var relativeStart = start >> 0;

      var k =
        relativeStart < 0
          ? Math.max(len + relativeStart, 0)
          : Math.min(relativeStart, len);

      var end = arguments[2];
      var relativeEnd = end === undefined ? len : end >> 0;

      var final =
        relativeEnd < 0
          ? Math.max(len + relativeEnd, 0)
          : Math.min(relativeEnd, len);

      while (k < final) {
        O[k] = value;
        k++;
      }

      return O;
    }
  });
}
