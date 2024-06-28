// From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function localStorageAvailable() {
  let storage;
  try {
    storage = window.localStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

interface UserPrefs {
  skipTutorial: boolean;
}

const DEFAULT_USER_PREFS: UserPrefs = {
  skipTutorial: false,
};

function loadUserPrefs(): UserPrefs {
  if (!localStorageAvailable()) {
    return DEFAULT_USER_PREFS;
  }
  const prefs = localStorage.getItem("userPrefs");
  return prefs ? JSON.parse(prefs) : DEFAULT_USER_PREFS;
}

function saveUserPrefs(prefs: UserPrefs) {
  if (!localStorageAvailable()) {
    return;
  }
  localStorage.setItem("userPrefs", JSON.stringify(prefs));
}

export { localStorageAvailable, loadUserPrefs, saveUserPrefs };
