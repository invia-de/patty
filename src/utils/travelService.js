import applicationData from './applicationData';
import isActive from './features';
import axios from 'axios';
import noop from './noop';

// mock function that only exist in aidu-core JavaScript
const $ = window.$ || { AIDU: { isMobileDevice: () => false } };

/**
 * @see IBE-3914 - used to add suppliers e.g. traffics offers to these methods
 * @type {Array}
 */
const METHOD_WHITELIST = ['search-pricechart'];

const getErrorCode = function(statusText) {
  switch (statusText) {
    case 'abort':
      return -444;
    case 'timeout':
      return -555;
    default:
      return -666;
  }
};

const getErrorMessage = function(statusText) {
  switch (statusText) {
    case 'abort':
      return '[TravelService Abort Error] The request was aborted.';
    case 'timeout':
      return '[TravelService Timeout Error] The request timed out.';
    default:
      return (
        '[TravelService Fatal Error] An error occured while communicating with API. ' +
        'Please check if the method was called with all necessary parameters.'
      );
  }
};

/** hold all the endpoint mocks */
const mockStack = {};

export default {
  config: {
    url: applicationData(
      'webserviceurl',
      'mobileapi.test.invia.lan/dev/ms/v/5/'
    ),
    defaultParameters: {
      agent: applicationData('portal.agent', 'ab-in-den-urlaub.de', true)
    }
  },

  mock: function(endpoint, once, response, timeout = 0, statusText = '') {
    mockStack[endpoint] = { once, response, statusText, timeout };
  },

  get: function(
    { endpoint = '', parameters = {}, method = 'get', timeout = 0 },
    callback = noop
  ) {
    /** should this endpoint be mocked? return early */
    if (mockStack[endpoint]) {
      const { response, statusText, timeout } = mockStack[endpoint];

      setTimeout(() => {
        callback(response, statusText);
      }, timeout);

      if (mockStack[endpoint].once) {
        delete mockStack[endpoint];
      }

      return;
    }

    parameters = {
      ...parameters,
      ...(this.config ? this.config.defaultParameters : {})
    };

    if (
      ~METHOD_WHITELIST.indexOf(endpoint) &&
      (!parameters.suppliers || !parameters.suppliers.length)
    ) {
      parameters.suppliers = [];

      if (isActive('travelTainment', false)) {
        parameters.suppliers.push('tt');
      }

      // add uip offers (tourini)
      if (isActive('ultindip', false)) {
        parameters.suppliers.push('uip');
      }

      // @see IBE-3914 - add traffics offers
      if (isActive('traffics', false)) {
        parameters.suppliers.push('traffics');
      }

      // add lmweb offers
      if (isActive('lmweb', false)) {
        parameters.suppliers.push('lmweb');
      }

      // @see IBE-4944 - add peakwork offers
      if (isActive('peakwork', false)) {
        parameters.suppliers.push('peakwork');
      }

      parameters.suppliers = parameters.suppliers.join(',');

      // overwrite on mobile devices
      // @IBE-5498
      if (isActive('onlyPeakworkForMobile', false) && $.AIDU.isMobileDevice()) {
        parameters.suppliers = 'peakwork';
      }

      var iTtWsFuzzy = applicationData('features.ttWsFuzzy', false);
      if (iTtWsFuzzy) {
        if (iTtWsFuzzy === 1) {
          parameters.ttnVersion = '17';
        } else if (iTtWsFuzzy === 2) {
          parameters.ttnVersion = '20';
          parameters.fuzzyAlternativeOffers = 1;
        }
      }
    }

    let responseData, statusText;

    axios[method](endpoint, {
      baseURL: 'https://' + this.config.url,
      [method === 'get' ? 'params' : 'data']: parameters,
      timeout: timeout
    })
      .then(function(response) {
        responseData = response.data;
        statusText = response.statusText;
      })
      .catch(function(error) {
        responseData = {
          success: false,
          response: {},
          errors: [
            {
              code: getErrorCode(error.statusText),
              message: getErrorMessage(error.statusText)
            }
          ]
        };
        statusText = error.statusText;
      })
      .then(function() {
        callback(responseData, statusText);
      });
  }
};
