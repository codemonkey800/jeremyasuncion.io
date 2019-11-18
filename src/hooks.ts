import {
  Dispatch,
  SetStateAction,
  useState,
} from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    if (window.localStorage) {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    }

    return initialValue
  })

  const setStoredValue = (valueOrFunction: SetStateAction<T>): void => {
    if (window.localStorage) {
      const storedValue = valueOrFunction instanceof Function
        ? valueOrFunction(value)
        : valueOrFunction

      setValue(storedValue)
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    }
  }

  return [value, setStoredValue]
}
