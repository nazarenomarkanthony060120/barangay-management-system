'use client'

import React, { useState, useEffect } from 'react'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ThemeToggle from '@/components/ui/ThemeToggle'
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@/components/icons'

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormErrors {
  email?: string
  password?: string
  general?: string
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {}

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target) return

    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear specific error when user starts typing
    if (errors?.[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically make an API call to authenticate
      console.log('Login attempt:', formData)

      // For demo purposes, simulate a failed login
      if (
        formData.email !== 'admin@barangay.gov.ph' ||
        formData.password !== 'admin123'
      ) {
        setErrors({ general: 'Invalid email or password. Please try again.' })
      } else {
        // Successful login - redirect or update app state
        alert('Login successful!')
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again later.' })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10" variant="elevated">
        <CardHeader className="text-center">
          {/* Logo/Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <BuildingOfficeIcon className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your Barangay Management account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.general}
                </p>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="Enter your email"
              leftIcon={<EnvelopeIcon />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Enter your password"
                leftIcon={<LockClosedIcon />}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>

            {/* Demo credentials */}
            {/* <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Email: admin@barangay.gov.ph
                <br />
                Password: admin123
              </p>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
