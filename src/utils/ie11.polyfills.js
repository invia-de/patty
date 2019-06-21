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
