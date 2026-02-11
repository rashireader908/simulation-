'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

interface ComparisonChartProps {
  baselineBalances: number[]
  currentBalances: number[]
  months: number
  baselineLabel?: string
  currentLabel?: string
}

export function ComparisonChart({ 
  baselineBalances, 
  currentBalances, 
  months,
  baselineLabel = 'Baseline',
  currentLabel = 'Current'
}: ComparisonChartProps) {
  const data = baselineBalances.map((balance, index) => ({
    day: index + 1,
    baseline: Math.round(balance * 100) / 100,
    current: Math.round(currentBalances[index] * 100) / 100,
  }))

  return (
    <div className="w-full h-64 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="day" 
            label={{ value: 'Day', position: 'insideBottom', offset: -5 }}
            domain={[0, months * 30]}
          />
          <YAxis 
            label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }}
          />
          <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
            labelFormatter={(label) => `Day ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="baseline" 
            stroke="#6b7280" 
            strokeWidth={2}
            dot={false}
            name={baselineLabel}
          />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            name={currentLabel}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
