let localStorageIsAvailable = false;

try {
  const name = '__storage_test__';
  localStorage.setItem(name, name);
  localStorage.removeItem(name);
  localStorageIsAvailable = true;
} catch (e) {}

export default localStorageIsAvailable;
