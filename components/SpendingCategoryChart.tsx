'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { CategoryBreakdown } from '../lib/types'

interface SpendingCategoryChartProps {
  categoryBreakdown: CategoryBreakdown
}

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b']

export function SpendingCategoryChart({ categoryBreakdown }: SpendingCategoryChartProps) {
  const data = [
    { name: 'Bills', value: Math.round(categoryBreakdown.bills * 100) / 100 },
    { name: 'Subscriptions', value: Math.round(categoryBreakdown.subscriptions * 100) / 100 },
    { name: 'Flexible Spending', value: Math.round(categoryBreakdown.flexibleSpending * 100) / 100 },
  ].filter(item => item.value > 0)

  return (
    <div className="w-full h-64 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
