'use client'

import React from 'react'
import { CategoryBreakdown } from '../lib/types'
import { Card } from './ui/Card'

interface SpendingBreakdownProps {
  categoryBreakdown: CategoryBreakdown
}

export function SpendingBreakdown({ categoryBreakdown }: SpendingBreakdownProps) {
  return (
    <Card title="Spending Breakdown">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Bills</span>
            <span className="text-lg font-bold text-red-600">
              ${categoryBreakdown.bills.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{ width: `${categoryBreakdown.percentages.bills}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {categoryBreakdown.percentages.bills.toFixed(1)}% of total expenses
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Subscriptions</span>
            <span className="text-lg font-bold text-orange-600">
              ${categoryBreakdown.subscriptions.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-orange-500 h-4 rounded-full"
              style={{ width: `${categoryBreakdown.percentages.subscriptions}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {categoryBreakdown.percentages.subscriptions.toFixed(1)}% of total expenses
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Flexible Spending</span>
            <span className="text-lg font-bold text-blue-600">
              ${categoryBreakdown.flexibleSpending.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${categoryBreakdown.percentages.flexibleSpending}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {categoryBreakdown.percentages.flexibleSpending.toFixed(1)}% of total expenses
          </p>
        </div>

        <div className="pt-4 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Expenses</span>
            <span className="text-2xl font-bold text-gray-900">
              ${categoryBreakdown.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
