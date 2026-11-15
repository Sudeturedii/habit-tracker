import { useEffect, useState } from 'react'

// useState gibi çalışır, ama değeri LocalStorage'a da kaydeder.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Depolama dolu veya kapalıysa uygulama yine de çalışmaya devam eder.
    }
  }, [key, value])

  return [value, setValue]
}
