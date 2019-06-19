const getApplicationData =
  typeof window === 'object' && typeof window.applicationData === 'function'
    ? window.applicationData
    : function(name, defaultValue) {
        return defaultValue;
      };

export default function applicationData(name, defaultValue) {
  return getApplicationData(name, defaultValue, true);
}
