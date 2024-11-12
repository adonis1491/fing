export const detectPrivacyMode = async (): Promise<boolean> => {
  try {
    // Method 1: Test IndexedDB access
    const dbTest = await testIndexedDB();
    if (!dbTest) return true;

    // Method 2: Test localStorage access
    const storageTest = testLocalStorage();
    if (!storageTest) return true;

    // Method 3: Test for FileSystem API
    const fsTest = await testFileSystem();
    if (!fsTest) return true;

    // Method 4: Check for specific browser private mode indicators
    if (isSpecificBrowserPrivateMode()) return true;

    return false;
  } catch {
    // If any test throws an error, assume private mode
    return true;
  }
};

const testIndexedDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      const db = indexedDB.open('test');
      db.onerror = () => resolve(false);
      db.onsuccess = () => resolve(true);
    } catch {
      resolve(false);
    }
  });
};

const testLocalStorage = (): boolean => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch {
    return false;
  }
};

const testFileSystem = async (): Promise<boolean> => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const { quota } = await navigator.storage.estimate();
      return quota !== 0;
    } catch {
      return false;
    }
  }
  return true;
};

const isSpecificBrowserPrivateMode = (): boolean => {
  // Safari private mode detection
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (isSafari) {
    try {
      window.openDatabase(null, null, null, null);
      return false;
    } catch {
      return true;
    }
  }

  // Firefox private mode detection
  if (navigator.userAgent.includes('Firefox')) {
    return !navigator.serviceWorker;
  }

  return false;
};