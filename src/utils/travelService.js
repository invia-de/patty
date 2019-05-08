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

export default {
  config: {
    url: applicationData(
      'webserviceurl',
      'mobileapi.test.invia.lan/dev/ms/v/5/'
    ),
    defaultParamters: {
      agent: applicationData('portal.agent', 'ab-in-den-urlaub.de', true)
    }
  },

  get: function(
    endpoint = '',
    parameters = {},
    callback = noop,
    method = 'get'
  ) {
    parameters = { ...parameters, ...this.config.defaultParamters };

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

      // overwrite on mobile devices for TT webservice
      // @IBE-5641
      var iTTWSState = parseInt(applicationData('features.testTTWS', 0));
      if (iTTWSState && $.AIDU.isMobileDevice()) {
        parameters.suppliers = 'tt';
        if (iTTWSState === 1) {
          parameters.ttnVersion = '17';
        } else if (iTTWSState === 2) {
          parameters.ttnVersion = '20';
        }
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

    var responseData, statusText;

    axios[method](endpoint, {
      baseURL: 'https://' + this.config.url,
      [method === 'get' ? 'params' : 'data']: parameters
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
