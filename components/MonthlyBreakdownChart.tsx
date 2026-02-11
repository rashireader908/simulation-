'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { MonthlySummary } from '../lib/types'

interface MonthlyBreakdownChartProps {
  monthlySummaries: MonthlySummary[]
}

export function MonthlyBreakdownChart({ monthlySummaries }: MonthlyBreakdownChartProps) {
  const data = monthlySummaries.map((summary) => ({
    month: `Month ${summary.monthIndex + 1}`,
    income: Math.round(summary.income * 100) / 100,
    expenses: Math.round(summary.totalExpenses * 100) / 100,
    net: Math.round(summary.netChange * 100) / 100,
  }))

  return (
    <div className="w-full h-64 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis 
            label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Income" />
          <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
          <Bar dataKey="net" fill="#3b82f6" name="Net Change" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
