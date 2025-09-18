export const useStorage = (key) => {
  const setItem = (value) => {
    try {
      const json = JSON.stringify(value);
      window.localStorage.setItem(key, json);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return undefined;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return { setItem, getItem, removeItem };
};
