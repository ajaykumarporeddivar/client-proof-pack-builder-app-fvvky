'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Generates a unique ID using crypto.randomUUID.
 * @returns A unique string ID.
 */
export function generateId(): string {
  return crypto.randomUUID()
}

/**
 * Custom hook for managing state in localStorage, with SSR-safe initialization.
 * @param key The key to use for localStorage.
 * @param initialValue The initial value if localStorage is empty or not available.
 * @returns A tuple with the current value and a setter function.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // SSR-safe: read from localStorage only in useEffect
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item) as T)
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error)
    }
  }, [key])

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Error writing to localStorage:', error)
      }
    },
    [key],
  )

  return [storedValue, setValue]
}

/**
 * Custom hook for filtering a list of items based on search string and status.
 * @param items The array of items to filter.
 * @param fields The fields to search within.
 * @returns Filtered items, search string and setter, status string and setter.
 */
export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[],
): {
  filtered: T[]
  search: string
  setSearch: (s: string) => void
  status: string
  setStatus: (s: string) => void
} {
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const filtered = React.useMemo(() => {
    let currentFilteredItems = items

    if (search) {
      const lowercasedSearch = search.toLowerCase()
      currentFilteredItems = currentFilteredItems.filter((item) =>
        fields.some((field) => {
          const value = item[field]
          return typeof value === 'string' && value.toLowerCase().includes(lowercasedSearch)
        }),
      )
    }

    if (status && status !== 'all') {
      currentFilteredItems = currentFilteredItems.filter(
        (item) => typeof item.status === 'string' && item.status.toLowerCase() === status.toLowerCase(),
      )
    }

    return currentFilteredItems
  }, [items, search, fields, status])

  return { filtered, search, setSearch, status, setStatus }
}

/**
 * Custom hook for managing modal state.
 * @returns Modal open state, open/close functions, and the active item (if any).
 */
export function useModal<T = undefined>(): {
  isOpen: boolean
  open: (item?: T) => void
  close: () => void
  activeItem: T | null
} {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<T | null>(null)

  const open = useCallback((item?: T) => {
    setActiveItem(item ?? null)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setActiveItem(null) // Clear active item when closing
  }, [])

  return { isOpen, open, close, activeItem }
}

/**
 * Custom hook for showing temporary toast messages.
 * Auto-hides after 2.5 seconds.
 * @returns Toast message, type, visibility, and a function to show the toast.
 */
export function useDemoToast(): {
  message: string
  type: 'success' | 'error' | 'info'
  visible: boolean
  show: (msg: string, type?: 'success' | 'error' | 'info') => void
} {
  const [message, setMessage] = useState<string>('')
  const [type, setType] = useState<'success' | 'error' | 'info'>('info')
  const [visible, setVisible] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const show = useCallback((msg: string, toastType: 'success' | 'error' | 'info' = 'info') => {
    // Clear any existing timer to allow new toast to show immediately
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setMessage(msg)
    setType(toastType)
    setVisible(true)

    timerRef.current = setTimeout(() => {
      setVisible(false)
      setMessage('') // Clear message after fading out
    }, 2500) // Auto-hide after 2.5 seconds
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return { message, type, visible, show }
}