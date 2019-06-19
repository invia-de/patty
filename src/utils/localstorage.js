let localStorageIsAvailable = false;

try {
  const name = '__storage_test__';
  window.localStorage.setItem(name, name);
  window.localStorage.removeItem(name);
  localStorageIsAvailable = true;
} catch (e) {}

export default localStorageIsAvailable;
