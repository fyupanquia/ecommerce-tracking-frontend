import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }

      if (defaultValue !== null) window.localStorage.setItem(keyName, JSON.stringify(defaultValue));

      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      if (newValue === null) {
        window.localStorage.removeItem(keyName);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      }
    } catch (err) {
      console.log("err::", err);
    }
    setStoredValue(newValue);
  };
  
  return [storedValue, setValue];
};
