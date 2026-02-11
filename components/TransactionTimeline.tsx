'use client'

import React from 'react'
import { CashFlowEvent } from '../lib/types'

interface TransactionTimelineProps {
  cashFlowEvents: CashFlowEvent[]
  months: number
}

export function TransactionTimeline({ cashFlowEvents, months }: TransactionTimelineProps) {
  const getEventColor = (type: CashFlowEvent['type']) => {
    switch (type) {
      case 'income':
        return 'bg-green-100 border-green-500 text-green-800'
      case 'large_bill':
        return 'bg-red-100 border-red-500 text-red-800'
      case 'large_subscription':
        return 'bg-orange-100 border-orange-500 text-orange-800'
      case 'negative_balance':
        return 'bg-red-200 border-red-600 text-red-900'
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800'
    }
  }

  const getEventIcon = (type: CashFlowEvent['type']) => {
    switch (type) {
      case 'income':
        return '💰'
      case 'large_bill':
        return '📄'
      case 'large_subscription':
        return '📱'
      case 'negative_balance':
        return '⚠️'
      default:
        return '•'
    }
  }

  // Group events by month for better visualization
  const eventsByMonth = new Map<number, CashFlowEvent[]>()
  for (const event of cashFlowEvents) {
    const month = Math.floor(event.day / 30) + 1
    if (!eventsByMonth.has(month)) {
      eventsByMonth.set(month, [])
    }
    eventsByMonth.get(month)!.push(event)
  }

  if (cashFlowEvents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No significant cash flow events to display.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Array.from(eventsByMonth.entries()).map(([month, events]) => (
        <div key={month} className="border-l-2 border-gray-300 pl-4">
          <h4 className="font-semibold text-lg mb-3 text-gray-700">Month {month}</h4>
          <div className="space-y-2">
            {events.map((event, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${getEventColor(event.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">{getEventIcon(event.type)}</span>
                    <div>
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm opacity-75">Day {event.day + 1}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${event.amount >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {event.amount >= 0 ? '+' : ''}${Math.abs(event.amount).toFixed(2)}
                    </p>
                    <p className="text-xs opacity-75">Balance: ${event.balanceAfter.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
