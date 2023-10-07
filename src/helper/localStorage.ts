export const getDataFromStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    let result: T | null;
    const item = window.localStorage.getItem(key);

    if (item === null) return null;

    try {
      const parsed = JSON.parse(item) as T;
      if (!parsed) {
        throw new Error('Empty value');
      }

      result = parsed;
    } catch {
      // Casting to T (which should resolve to string) because JSON.parse would
      // throw an error if "foo" was passed, but properly casting "true" or "1"
      // to their respective types
      result = item as unknown as T;
    }

    return result;
  }
  return null;
};

export const setDataToStorage = (key: string, data: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, data);
  }
};

export const removeDataFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
