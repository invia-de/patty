import isNumeric from './isNumeric';

var memo_search = '';
var memo_searchSplitted = [];

const getSplittedSearch = function() {
  if (memo_search !== window.location.search) {
    memo_search = window.location.search.substr(1);

    decodeURI(window.location.search)
      .split('&')
      .forEach(function(keyValuePair) {
        memo_searchSplitted.push.apply(
          memo_searchSplitted,
          keyValuePair.split('=')
        );
      });
  }

  return memo_searchSplitted;
};

var memo_pathname = '';
var memo_pathnameSplitted = [];

const getSplittedURL = function() {
  if (memo_pathname !== window.location.pathname) {
    memo_pathname = window.location.pathname;
    memo_pathnameSplitted = decodeURI(window.location.pathname).split('/');
  }

  return [...memo_pathnameSplitted, ...getSplittedSearch()];
};

const parseDecodeValue = function(url, param, defaultValue = false) {
  let value = url[url.indexOf(param) + 1] || false;
  let parsed = isNumeric(value) ? parseInt(value) : value;
  return parsed !== false ? decodeURIComponent(parsed) : defaultValue;
};

export default {
  get: function(param, defaultValue) {
    const url = getSplittedURL();
    return parseDecodeValue(url, param, defaultValue);
  },
  getAll: function(params, defaultValues = {}) {
    const url = getSplittedURL();
    let values = {};

    params.forEach(function(param) {
      values[param] = parseDecodeValue(url, param, defaultValues[param]);
    });

    return values;
  }
};
