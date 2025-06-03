"use client";

import { useState } from "react";

import { SESSION_STORAGE_KEY } from "../constants";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export const useSessionStorage = <T>(key: SESSION_STORAGE_KEY, initialValue: T): [T, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
