import { describe, it, expect } from 'vitest'
import { simulateCashflow } from '../lib/simulation'
import { FinancialInputs } from '../lib/types'

describe('simulateCashflow', () => {
  it('should handle basic income flow', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 3000,
      startingCash: 1000,
      monthlyFlexSpend: 500,
      months: 1,
      bills: [],
      subscriptions: [],
    }

    const result = simulateCashflow(inputs)
    
    expect(result.dailyBalances.length).toBe(30)
    expect(result.dailyBalances[0]).toBe(4000) // Starting + income on day 1
    expect(result.endBalance).toBeGreaterThan(3000) // Should have money left after flex spend
  })

  it('should subtract bills on correct days', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 3000,
      startingCash: 1000,
      monthlyFlexSpend: 0,
      months: 1,
      bills: [
        { id: '1', name: 'Rent', amount: 1000, dueDay: 1 },
        { id: '2', name: 'Utilities', amount: 100, dueDay: 15 },
      ],
      subscriptions: [],
    }

    const result = simulateCashflow(inputs)
    
    // Day 1: income added (3000) + starting (1000) - rent (1000) = 3000
    expect(result.dailyBalances[0]).toBe(3000)
    
    // Day 15: should have utilities subtracted
    expect(result.dailyBalances[14]).toBeLessThan(result.dailyBalances[13])
  })

  it('should subtract subscriptions on correct days', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 3000,
      startingCash: 1000,
      monthlyFlexSpend: 0,
      months: 1,
      bills: [],
      subscriptions: [
        { id: '1', name: 'Netflix', amount: 15, chargeDay: 5 },
      ],
    }

    const result = simulateCashflow(inputs)
    
    // Day 5 should have subscription subtracted
    expect(result.dailyBalances[4]).toBeLessThan(result.dailyBalances[3])
  })

  it('should handle cancelled subscriptions (skip starting next month)', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 3000,
      startingCash: 1000,
      monthlyFlexSpend: 0,
      months: 2,
      bills: [],
      subscriptions: [
        { id: '1', name: 'Netflix', amount: 15, chargeDay: 5, cancelled: true },
      ],
    }

    const result = simulateCashflow(inputs)
    
    // First month: should charge on day 5
    expect(result.dailyBalances[4]).toBeLessThan(result.dailyBalances[3])
    
    // Second month: should NOT charge (cancelled)
    const day35 = 34 // Day 5 of second month (0-indexed)
    expect(result.dailyBalances[day35]).toBe(result.dailyBalances[day35 - 1])
  })

  it('should handle paused subscriptions', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 3000,
      startingCash: 1000,
      monthlyFlexSpend: 0,
      months: 2,
      bills: [],
      subscriptions: [
        { id: '1', name: 'Netflix', amount: 15, chargeDay: 5, pausedMonths: [1] },
      ],
    }

    const result = simulateCashflow(inputs)
    
    // First month: should charge on day 5
    expect(result.dailyBalances[4]).toBeLessThan(result.dailyBalances[3])
    
    // Second month (month index 1): should NOT charge (paused)
    const day35 = 34 // Day 5 of second month
    expect(result.dailyBalances[day35]).toBe(result.dailyBalances[day35 - 1])
  })

  it('should detect negative balances', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 1000,
      startingCash: 0,
      monthlyFlexSpend: 500,
      months: 1,
      bills: [
        { id: '1', name: 'Rent', amount: 800, dueDay: 1 },
      ],
      subscriptions: [],
    }

    const result = simulateCashflow(inputs)
    
    expect(result.negativeDays).toBeGreaterThan(0)
    expect(result.minBalance).toBeLessThan(0)
    expect(result.tightMonths.length).toBeGreaterThan(0)
  })

  it('should calculate tight months correctly', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 2000,
      startingCash: 0,
      monthlyFlexSpend: 1500,
      months: 3,
      bills: [
        { id: '1', name: 'Rent', amount: 1000, dueDay: 1 },
      ],
      subscriptions: [],
    }

    const result = simulateCashflow(inputs)
    
    // Should have tight months due to high spending
    expect(result.tightMonths.length).toBeGreaterThan(0)
    expect(result.tightMonths.every(m => m >= 0 && m < 3)).toBe(true)
  })

  it('should spread flexible spending evenly', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 3000,
      startingCash: 1000,
      monthlyFlexSpend: 300, // $10 per day
      months: 1,
      bills: [],
      subscriptions: [],
    }

    const result = simulateCashflow(inputs)
    
    // Each day should decrease by approximately $10
    for (let i = 1; i < 30; i++) {
      const diff = result.dailyBalances[i - 1] - result.dailyBalances[i]
      expect(Math.abs(diff - 10)).toBeLessThan(0.01) // Allow for floating point
    }
  })

  it('should handle edge case: day 28 bills', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 3000,
      startingCash: 1000,
      monthlyFlexSpend: 0,
      months: 1,
      bills: [
        { id: '1', name: 'Late Bill', amount: 100, dueDay: 28 },
      ],
      subscriptions: [],
    }

    const result = simulateCashflow(inputs)
    
    // Day 28 (0-indexed: day 27) should have bill subtracted
    expect(result.dailyBalances[27]).toBeLessThan(result.dailyBalances[26])
  })

  it('should generate insights', () => {
    const inputs: FinancialInputs = {
      monthlyIncome: 2000,
      startingCash: 500,
      monthlyFlexSpend: 1000,
      months: 1,
      bills: [],
      subscriptions: [],
    }

    const result = simulateCashflow(inputs)
    
    expect(result.insights.length).toBeGreaterThan(0)
    expect(Array.isArray(result.insights)).toBe(true)
  })
})
