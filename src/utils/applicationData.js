const getAppData =
  typeof window === 'object' && typeof window.applicationData === 'function'
    ? window.applicationData
    : function(name, defaultValue) {
        return defaultValue;
      };

export default function appData(name, defaultValue) {
  return getAppData(name, defaultValue, true);
}
