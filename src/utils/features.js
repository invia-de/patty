import applicationData from './applicationData';

const isActive = function(feature, defaultValue) {
  return Boolean(applicationData('features.' + feature, defaultValue));
};

export default isActive;
