'use client'

import React from 'react'
import { MonthlySummary } from '../lib/types'
import { Card } from './ui/Card'

interface MonthlySummaryTableProps {
  monthlySummaries: MonthlySummary[]
}

export function MonthlySummaryTable({ monthlySummaries }: MonthlySummaryTableProps) {
  return (
    <Card title="Monthly Summary">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-2 font-semibold">Month</th>
              <th className="text-right p-2 font-semibold">Income</th>
              <th className="text-right p-2 font-semibold">Expenses</th>
              <th className="text-right p-2 font-semibold">Net</th>
              <th className="text-right p-2 font-semibold">Start Balance</th>
              <th className="text-right p-2 font-semibold">End Balance</th>
              <th className="text-right p-2 font-semibold">Neg. Days</th>
              <th className="text-right p-2 font-semibold">Min Balance</th>
            </tr>
          </thead>
          <tbody>
            {monthlySummaries.map((summary) => (
              <tr key={summary.monthIndex} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2 font-medium">Month {summary.monthIndex + 1}</td>
                <td className="p-2 text-right text-green-600">${summary.income.toFixed(2)}</td>
                <td className="p-2 text-right text-red-600">${summary.totalExpenses.toFixed(2)}</td>
                <td className={`p-2 text-right font-semibold ${summary.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${summary.netChange.toFixed(2)}
                </td>
                <td className="p-2 text-right">${summary.startingBalance.toFixed(2)}</td>
                <td className="p-2 text-right">${summary.endingBalance.toFixed(2)}</td>
                <td className={`p-2 text-right ${summary.negativeDays > 0 ? 'text-red-600 font-semibold' : ''}`}>
                  {summary.negativeDays}
                </td>
                <td className={`p-2 text-right ${summary.minBalance < 0 ? 'text-red-600 font-semibold' : ''}`}>
                  ${summary.minBalance.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
