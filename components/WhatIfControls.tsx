'use client'

import React, { useState, useMemo } from 'react'
import { FinancialInputs, Bill, Subscription } from '../lib/types'
import { Card } from './ui/Card'
import { Button } from './ui/Button'

interface WhatIfControlsProps {
  originalInputs: FinancialInputs
  onInputsChange: (adjustedInputs: FinancialInputs) => void
  onReset: () => void
}

export function WhatIfControls({ originalInputs, onInputsChange, onReset }: WhatIfControlsProps) {
  const [incomeAdjustment, setIncomeAdjustment] = useState(0) // Percentage
  const [startingCashAdjustment, setStartingCashAdjustment] = useState(0) // Absolute
  const [flexSpendAdjustment, setFlexSpendAdjustment] = useState(0) // Percentage
  const [billAdjustments, setBillAdjustments] = useState<Map<string, number>>(new Map())
  const [subscriptionAdjustments, setSubscriptionAdjustments] = useState<Map<string, number>>(new Map())

  const adjustedInputs = useMemo(() => {
    const adjusted: FinancialInputs = {
      monthlyIncome: originalInputs.monthlyIncome * (1 + incomeAdjustment / 100),
      startingCash: originalInputs.startingCash + startingCashAdjustment,
      monthlyFlexSpend: originalInputs.monthlyFlexSpend * (1 + flexSpendAdjustment / 100),
      months: originalInputs.months,
      bills: originalInputs.bills.map(bill => ({
        ...bill,
        amount: bill.amount + (billAdjustments.get(bill.id) || 0)
      })),
      subscriptions: originalInputs.subscriptions.map(sub => ({
        ...sub,
        amount: sub.amount + (subscriptionAdjustments.get(sub.id) || 0)
      }))
    }
    return adjusted
  }, [originalInputs, incomeAdjustment, startingCashAdjustment, flexSpendAdjustment, billAdjustments, subscriptionAdjustments])

  React.useEffect(() => {
    onInputsChange(adjustedInputs)
  }, [adjustedInputs, onInputsChange])

  const handleBillAdjustment = (billId: string, adjustment: number) => {
    const newAdjustments = new Map(billAdjustments)
    newAdjustments.set(billId, adjustment)
    setBillAdjustments(newAdjustments)
  }

  const handleSubscriptionAdjustment = (subId: string, adjustment: number) => {
    const newAdjustments = new Map(subscriptionAdjustments)
    newAdjustments.set(subId, adjustment)
    setSubscriptionAdjustments(newAdjustments)
  }

  const handleReset = () => {
    setIncomeAdjustment(0)
    setStartingCashAdjustment(0)
    setFlexSpendAdjustment(0)
    setBillAdjustments(new Map())
    setSubscriptionAdjustments(new Map())
    onReset()
  }

  const hasAdjustments = incomeAdjustment !== 0 || 
    startingCashAdjustment !== 0 || 
    flexSpendAdjustment !== 0 || 
    billAdjustments.size > 0 || 
    subscriptionAdjustments.size > 0

  return (
    <Card title="What If Analysis" className="mb-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Income: ${adjustedInputs.monthlyIncome.toFixed(2)}
            {incomeAdjustment !== 0 && (
              <span className={`ml-2 ${incomeAdjustment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({incomeAdjustment > 0 ? '+' : ''}{incomeAdjustment.toFixed(1)}%)
              </span>
            )}
          </label>
          <input
            type="range"
            min="-50"
            max="100"
            value={incomeAdjustment}
            onChange={(e) => setIncomeAdjustment(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-50%</span>
            <span>0%</span>
            <span>+100%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starting Cash: ${adjustedInputs.startingCash.toFixed(2)}
            {startingCashAdjustment !== 0 && (
              <span className={`ml-2 ${startingCashAdjustment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({startingCashAdjustment > 0 ? '+' : ''}${startingCashAdjustment.toFixed(2)})
              </span>
            )}
          </label>
          <input
            type="range"
            min={-originalInputs.startingCash}
            max={originalInputs.startingCash * 2}
            step={100}
            value={startingCashAdjustment}
            onChange={(e) => setStartingCashAdjustment(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-${originalInputs.startingCash.toFixed(0)}</span>
            <span>$0</span>
            <span>+${(originalInputs.startingCash * 2).toFixed(0)}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Flexible Spending: ${adjustedInputs.monthlyFlexSpend.toFixed(2)}
            {flexSpendAdjustment !== 0 && (
              <span className={`ml-2 ${flexSpendAdjustment < 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({flexSpendAdjustment > 0 ? '+' : ''}{flexSpendAdjustment.toFixed(1)}%)
              </span>
            )}
          </label>
          <input
            type="range"
            min="-75"
            max="100"
            value={flexSpendAdjustment}
            onChange={(e) => setFlexSpendAdjustment(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-75%</span>
            <span>0%</span>
            <span>+100%</span>
          </div>
        </div>

        {originalInputs.bills.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Bills</h4>
            <div className="space-y-3">
              {originalInputs.bills.map(bill => {
                const adjustment = billAdjustments.get(bill.id) || 0
                const adjustedAmount = bill.amount + adjustment
                return (
                  <div key={bill.id}>
                    <label className="block text-sm text-gray-600 mb-1">
                      {bill.name}: ${adjustedAmount.toFixed(2)}
                      {adjustment !== 0 && (
                        <span className={`ml-2 ${adjustment < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ({adjustment > 0 ? '+' : ''}${adjustment.toFixed(2)})
                        </span>
                      )}
                    </label>
                    <input
                      type="range"
                      min={-bill.amount}
                      max={bill.amount * 2}
                      step={10}
                      value={adjustment}
                      onChange={(e) => handleBillAdjustment(bill.id, parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {originalInputs.subscriptions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Subscriptions</h4>
            <div className="space-y-3">
              {originalInputs.subscriptions.map(sub => {
                const adjustment = subscriptionAdjustments.get(sub.id) || 0
                const adjustedAmount = sub.amount + adjustment
                return (
                  <div key={sub.id}>
                    <label className="block text-sm text-gray-600 mb-1">
                      {sub.name}: ${adjustedAmount.toFixed(2)}
                      {adjustment !== 0 && (
                        <span className={`ml-2 ${adjustment < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ({adjustment > 0 ? '+' : ''}${adjustment.toFixed(2)})
                        </span>
                      )}
                    </label>
                    <input
                      type="range"
                      min={-sub.amount}
                      max={sub.amount * 2}
                      step={1}
                      value={adjustment}
                      onChange={(e) => handleSubscriptionAdjustment(sub.id, parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {hasAdjustments && (
          <div className="pt-4 border-t">
            <Button onClick={handleReset} variant="secondary" className="w-full">
              Reset to Original
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
