'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type ThemePreference = 'light' | 'dark' | 'system'
type EffectiveTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemePreference
  effectiveTheme: EffectiveTheme
  toggleTheme: () => void
  setTheme: (theme: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemePreference
  storageKey?: string
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'barangay-theme',
}) => {
  const [theme, setThemeState] = useState<ThemePreference>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey) as ThemePreference | null
      const initial: ThemePreference =
        saved === 'light' || saved === 'dark' || saved === 'system'
          ? saved
          : defaultTheme
      setThemeState(initial)
      setMounted(true)
    } catch (error) {
      setThemeState(defaultTheme)
      setMounted(true)
    }
  }, [storageKey, defaultTheme])

  // Compute effective theme based on preference + system
  const effectiveTheme: EffectiveTheme = useMemo(() => {
    if (theme === 'system') {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      } catch {
        return 'light'
      }
    }
    return theme
  }, [theme])

  // Apply theme to <html> and persist preference
  useEffect(() => {
    if (!mounted) return
    try {
      const root = window.document.documentElement

      // Remove both classes first
      root.classList.remove('light', 'dark')

      // Add the current effective theme class
      root.classList.add(effectiveTheme)

      // Debug logging
      console.log('Applied theme class:', effectiveTheme, 'to HTML element')
      console.log('HTML classList:', root.classList.toString())

      localStorage.setItem(storageKey, theme)
    } catch (error) {
      console.warn('Failed to apply theme:', error)
    }
  }, [effectiveTheme, theme, mounted, storageKey])

  // React to system theme changes when preference is 'system'
  useEffect(() => {
    if (!mounted || theme !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      if (mql.matches) {
        root.classList.add('dark')
        console.log('System theme changed to dark')
      } else {
        root.classList.add('light')
        console.log('System theme changed to light')
      }
    }
    try {
      mql.addEventListener?.('change', handler)
      return () => mql.removeEventListener?.('change', handler)
    } catch {
      return
    }
  }, [mounted, theme])

  const setTheme = (newTheme: ThemePreference) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next: ThemePreference = prev === 'dark' ? 'light' : 'dark'
      console.log('Theme toggling from', prev, 'to', next)
      return next
    })
  }

  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: defaultTheme,
          effectiveTheme: 'light',
          toggleTheme,
          setTheme,
        }}
      >
        <div suppressHydrationWarning>{children}</div>
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider
      value={{ theme, effectiveTheme, toggleTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
