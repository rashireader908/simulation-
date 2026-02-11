'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts'
import { Transaction } from '../lib/types'

interface CashflowChartProps {
  dailyBalances: number[]
  months: number
  transactions?: Transaction[]
}

export function CashflowChart({ dailyBalances, months, transactions = [] }: CashflowChartProps) {
  const data = dailyBalances.map((balance, index) => {
    const dayTransactions = transactions.filter(t => t.day === index)
    const transactionDetails = dayTransactions
      .map(t => `${t.description}: ${t.amount >= 0 ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}`)
      .join(', ')
    
    return {
      day: index + 1,
      balance: Math.round(balance * 100) / 100,
      month: Math.floor(index / 30) + 1,
      transactionDetails: transactionDetails || undefined,
    }
  })

  const hasNegative = data.some(d => d.balance < 0)
  const strokeColor = hasNegative ? "#ef4444" : "#3b82f6"

  // Create month boundary lines
  const monthBoundaries = []
  for (let month = 1; month < months; month++) {
    monthBoundaries.push(month * 30)
  }

  // Find negative balance regions for highlighting
  const negativeRegions: Array<{ start: number; end: number }> = []
  let negativeStart: number | null = null
  
  for (let i = 0; i < data.length; i++) {
    if (data[i].balance < 0) {
      if (negativeStart === null) {
        negativeStart = i + 1
      }
    } else {
      if (negativeStart !== null) {
        negativeRegions.push({ start: negativeStart, end: i })
        negativeStart = null
      }
    }
  }
  if (negativeStart !== null) {
    negativeRegions.push({ start: negativeStart, end: data.length })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = data[label - 1]
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold mb-1">Day {label} (Month {dataPoint.month})</p>
          <p className={`text-lg font-bold ${payload[0].value < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ${payload[0].value.toFixed(2)}
          </p>
          {dataPoint.transactionDetails && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-medium mb-1">Transactions:</p>
              <p className="text-xs text-gray-700">{dataPoint.transactionDetails}</p>
            </div>
          )}
        </div>
      )
    }
    return null
  }

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
          <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" strokeOpacity={0.5} />
          {monthBoundaries.map((boundary, index) => (
            <ReferenceLine 
              key={index}
              x={boundary} 
              stroke="#9ca3af" 
              strokeDasharray="2 2" 
              strokeOpacity={0.5}
              label={{ value: `Month ${index + 2}`, position: 'top', fill: '#6b7280', fontSize: 12 }}
            />
          ))}
          {negativeRegions.map((region, index) => (
            <ReferenceArea
              key={index}
              x1={region.start}
              x2={region.end}
              y1={-Infinity}
              y2={0}
              fill="#fee2e2"
              fillOpacity={0.3}
            />
          ))}
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke={strokeColor} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: strokeColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
