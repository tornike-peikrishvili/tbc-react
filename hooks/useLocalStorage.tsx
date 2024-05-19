import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialValue?: any) {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
      }
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
