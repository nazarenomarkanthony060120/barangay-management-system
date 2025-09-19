'use client'

import React from 'react'
import { useTheme } from '@/provider/ThemeProvider'
import { SunIcon, MoonIcon } from '@/components/icons'

const ThemeToggle = () => {
  const { effectiveTheme, toggleTheme } = useTheme()

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(
          'Theme toggle clicked, current effective theme:',
          effectiveTheme,
        )
        toggleTheme()
      }}
      className="relative inline-flex h-9 w-16 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute left-1 top-1 h-7 w-7 rounded-full bg-white shadow-md transition-transform dark:bg-gray-900 ${
          effectiveTheme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
      <div className="flex h-full w-full items-center justify-between px-2">
        {/* Sun icon for light mode */}
        <div className="flex items-center justify-center">
          <SunIcon
            className={`h-4 w-4 transition-opacity z-10 ${
              effectiveTheme === 'light'
                ? 'opacity-100 text-yellow-500'
                : 'opacity-0'
            }`}
          />
        </div>

        {/* Moon icon for dark mode */}
        <div className="flex items-center justify-center">
          <MoonIcon
            className={`h-4 w-4 transition-opacity z-10 ${
              effectiveTheme === 'dark'
                ? 'opacity-100 text-blue-400'
                : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
