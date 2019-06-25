import appData from './applicationData';

const isActive = function(feature, defaultValue) {
  if (typeof feature !== 'string') {
    return false;
  }

  const data = appData('features.' + feature, defaultValue);

  return typeof data === 'boolean' ? data : !!parseInt(data);
};

export default isActive;
