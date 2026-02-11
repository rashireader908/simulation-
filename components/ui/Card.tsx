import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 ${className}`}>
      {title && <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>}
      {children}
    </div>
  )
}
