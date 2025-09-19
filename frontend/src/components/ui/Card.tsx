import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
}

const Card = ({ children, className = '', variant = 'default' }: CardProps) => {
  const baseClasses =
    'rounded-xl bg-white dark:bg-gray-800 transition-colors duration-200'

  const variantClasses = {
    default: 'shadow-sm border border-gray-200 dark:border-gray-700',
    elevated: 'shadow-lg border border-gray-200 dark:border-gray-700',
    outlined: 'border-2 border-gray-200 dark:border-gray-600',
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 rounded-b-xl bg-gray-50 dark:bg-gray-800/50 ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
