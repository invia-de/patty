export function testForStorage(type = 'localStorage') {
  let isAvailable = false;

  try {
    const name = '__storage_test__';
    window[type].setItem(name, name);
    window[type].removeItem(name);
    isAvailable = true;
  } catch (e) {}

  return isAvailable;
}

const localStorageIsAvailable = testForStorage();

export default localStorageIsAvailable;
