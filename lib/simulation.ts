import { FinancialInputs, SimulationResult, Transaction, MonthlySummary, CategoryBreakdown, CashFlowEvent } from './types'

export function simulateCashflow(inputs: FinancialInputs): SimulationResult {
  const totalDays = inputs.months * 30
  const dailyBalances: number[] = new Array(totalDays)
  let currentBalance = inputs.startingCash
  const dailyFlexSpend = inputs.monthlyFlexSpend / 30

  // Track metrics
  let minBalance = currentBalance
  let minBalanceDay = 0
  let negativeDays = 0
  const tightMonths = new Set<number>()

  // Track detailed data
  const transactions: Transaction[] = []
  const monthlyData: Map<number, {
    income: number
    bills: number
    subscriptions: number
    flexibleSpending: number
    negativeDays: number
    minBalance: number
    balances: number[]
  }> = new Map()

  // Initialize monthly data
  for (let month = 0; month < inputs.months; month++) {
    monthlyData.set(month, {
      income: 0,
      bills: 0,
      subscriptions: 0,
      flexibleSpending: 0,
      negativeDays: 0,
      minBalance: currentBalance,
      balances: []
    })
  }

  // Process each day
  for (let day = 0; day < totalDays; day++) {
    const dayOfMonth = (day % 30) + 1 // 1-30
    const monthIndex = Math.floor(day / 30)
    const monthData = monthlyData.get(monthIndex)!

    // Track starting balance for the day
    const balanceBefore = currentBalance

    // Add income on day 1 of each month (day 0, 30, 60, etc.)
    if (day % 30 === 0) {
      currentBalance += inputs.monthlyIncome
      monthData.income += inputs.monthlyIncome
      transactions.push({
        day,
        type: 'income',
        amount: inputs.monthlyIncome,
        description: `Monthly income`,
        balanceAfter: currentBalance
      })
    }

    // Process bills on their due day
    for (const bill of inputs.bills) {
      if (dayOfMonth === bill.dueDay) {
        currentBalance -= bill.amount
        monthData.bills += bill.amount
        transactions.push({
          day,
          type: 'bill',
          amount: -bill.amount,
          description: `Bill: ${bill.name}`,
          balanceAfter: currentBalance
        })
      }
    }

    // Process subscriptions on their charge day
    for (const subscription of inputs.subscriptions) {
      if (dayOfMonth === subscription.chargeDay) {
        // Check if subscription is cancelled (skip starting next month)
        if (subscription.cancelled && monthIndex > 0) {
          continue
        }
        
        // Check if subscription is paused for this month
        if (subscription.pausedMonths && subscription.pausedMonths.includes(monthIndex)) {
          continue
        }

        currentBalance -= subscription.amount
        monthData.subscriptions += subscription.amount
        transactions.push({
          day,
          type: 'subscription',
          amount: -subscription.amount,
          description: `Subscription: ${subscription.name}`,
          balanceAfter: currentBalance
        })
      }
    }

    // Subtract daily flexible spending
    currentBalance -= dailyFlexSpend
    monthData.flexibleSpending += dailyFlexSpend
    transactions.push({
      day,
      type: 'flexible_spending',
      amount: -dailyFlexSpend,
      description: 'Daily flexible spending',
      balanceAfter: currentBalance
    })

    // Record balance
    dailyBalances[day] = currentBalance
    monthData.balances.push(currentBalance)

    // Update metrics
    if (currentBalance < minBalance) {
      minBalance = currentBalance
      minBalanceDay = day
    }

    if (currentBalance < 0) {
      negativeDays++
      tightMonths.add(monthIndex)
      monthData.negativeDays++
    }

    if (currentBalance < monthData.minBalance) {
      monthData.minBalance = currentBalance
    }
  }

  // Generate monthly summaries
  const monthlySummaries: MonthlySummary[] = []
  let previousMonthEndBalance = inputs.startingCash

  for (let month = 0; month < inputs.months; month++) {
    const monthData = monthlyData.get(month)!
    const monthStartDay = month * 30
    const monthEndDay = Math.min((month + 1) * 30 - 1, totalDays - 1)
    const monthEndBalance = dailyBalances[monthEndDay]
    const averageDailyBalance = monthData.balances.reduce((sum, b) => sum + b, 0) / monthData.balances.length

    monthlySummaries.push({
      monthIndex: month,
      income: monthData.income,
      bills: monthData.bills,
      subscriptions: monthData.subscriptions,
      flexibleSpending: monthData.flexibleSpending,
      totalExpenses: monthData.bills + monthData.subscriptions + monthData.flexibleSpending,
      netChange: monthData.income - (monthData.bills + monthData.subscriptions + monthData.flexibleSpending),
      startingBalance: previousMonthEndBalance,
      endingBalance: monthEndBalance,
      averageDailyBalance,
      negativeDays: monthData.negativeDays,
      minBalance: monthData.minBalance
    })

    previousMonthEndBalance = monthEndBalance
  }

  // Generate category breakdown
  const totalBills = monthlySummaries.reduce((sum, m) => sum + m.bills, 0)
  const totalSubscriptions = monthlySummaries.reduce((sum, m) => sum + m.subscriptions, 0)
  const totalFlexibleSpending = monthlySummaries.reduce((sum, m) => sum + m.flexibleSpending, 0)
  const totalExpenses = totalBills + totalSubscriptions + totalFlexibleSpending

  const categoryBreakdown: CategoryBreakdown = {
    bills: totalBills,
    subscriptions: totalSubscriptions,
    flexibleSpending: totalFlexibleSpending,
    total: totalExpenses,
    percentages: {
      bills: totalExpenses > 0 ? (totalBills / totalExpenses) * 100 : 0,
      subscriptions: totalExpenses > 0 ? (totalSubscriptions / totalExpenses) * 100 : 0,
      flexibleSpending: totalExpenses > 0 ? (totalFlexibleSpending / totalExpenses) * 100 : 0
    }
  }

  // Generate cash flow events (significant changes)
  const cashFlowEvents: CashFlowEvent[] = []
  const LARGE_THRESHOLD = inputs.monthlyIncome * 0.1 // 10% of monthly income

  for (let day = 0; day < totalDays; day++) {
    const dayTransactions = transactions.filter(t => t.day === day)
    const dayTotal = dayTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
    const balanceAfter = dailyBalances[day]

    // Income events
    const incomeTx = dayTransactions.find(t => t.type === 'income')
    if (incomeTx) {
      cashFlowEvents.push({
        day,
        type: 'income',
        amount: incomeTx.amount,
        description: 'Monthly income received',
        balanceAfter
      })
    }

    // Large bills
    const largeBills = dayTransactions.filter(t => t.type === 'bill' && Math.abs(t.amount) >= LARGE_THRESHOLD)
    for (const bill of largeBills) {
      cashFlowEvents.push({
        day,
        type: 'large_bill',
        amount: bill.amount,
        description: bill.description,
        balanceAfter
      })
    }

    // Large subscriptions
    const largeSubs = dayTransactions.filter(t => t.type === 'subscription' && Math.abs(t.amount) >= LARGE_THRESHOLD)
    for (const sub of largeSubs) {
      cashFlowEvents.push({
        day,
        type: 'large_subscription',
        amount: sub.amount,
        description: sub.description,
        balanceAfter
      })
    }

    // Negative balance events (first day going negative)
    if (balanceAfter < 0 && (day === 0 || dailyBalances[day - 1] >= 0)) {
      cashFlowEvents.push({
        day,
        type: 'negative_balance',
        amount: balanceAfter,
        description: 'Balance went negative',
        balanceAfter
      })
    }
  }

  // Calculate risk score
  let riskScore: 'low' | 'medium' | 'high' = 'low'
  const negativeDaysRatio = negativeDays / totalDays
  const tightMonthsRatio = tightMonths.size / inputs.months
  const bufferRatio = inputs.startingCash / inputs.monthlyIncome

  if (negativeDaysRatio > 0.1 || tightMonthsRatio > 0.5 || minBalance < -inputs.monthlyIncome * 0.5) {
    riskScore = 'high'
  } else if (negativeDaysRatio > 0.05 || tightMonthsRatio > 0.3 || minBalance < 0 || bufferRatio < 0.5) {
    riskScore = 'medium'
  }

  // Generate enhanced insights
  const insights: string[] = []
  
  // Risk assessment
  if (riskScore === 'high') {
    insights.push(`High risk: You have ${negativeDays} negative days and ${tightMonths.size} tight months. Consider increasing your starting buffer or reducing expenses.`)
  } else if (riskScore === 'medium') {
    insights.push(`Medium risk: You have some tight periods. Monitor your cash flow closely.`)
  } else {
    insights.push(`Low risk: Your cash flow stays positive throughout the simulation period.`)
  }

  // Specific problem identification
  if (minBalance < 0) {
    const worstMonth = Math.floor(minBalanceDay / 30) + 1
    const worstMonthData = monthlySummaries[worstMonth - 1]
    insights.push(`Lowest balance: $${minBalance.toFixed(2)} on day ${minBalanceDay + 1} (month ${worstMonth}).`)
    
    // Identify what's causing the issue
    if (worstMonthData.bills > inputs.monthlyIncome * 0.4) {
      insights.push(`Month ${worstMonth} has high bills ($${worstMonthData.bills.toFixed(2)}). Consider spreading bill due dates.`)
    }
    if (worstMonthData.subscriptions > inputs.monthlyIncome * 0.2) {
      insights.push(`Month ${worstMonth} has high subscription charges ($${worstMonthData.subscriptions.toFixed(2)}).`)
    }
  }

  // Subscription analysis
  if (inputs.subscriptions.length > 0) {
    const totalSubs = inputs.subscriptions
      .filter(s => !s.cancelled)
      .reduce((sum, s) => {
        const pausedCount = s.pausedMonths?.length || 0
        const activeMonths = inputs.months - pausedCount
        return sum + (s.amount * activeMonths)
      }, 0)
    
    if (totalSubs > inputs.monthlyIncome * 0.2) {
      insights.push(`Your subscriptions total $${totalSubs.toFixed(2)} over ${inputs.months} months (${((totalSubs / inputs.months) / inputs.monthlyIncome * 100).toFixed(1)}% of monthly income). Consider reviewing them.`)
    }

    // Suggest cancellations
    const expensiveSubs = inputs.subscriptions
      .filter(s => !s.cancelled && s.amount > inputs.monthlyIncome * 0.05)
      .sort((a, b) => b.amount - a.amount)
    
    if (expensiveSubs.length > 0 && minBalance < 0) {
      insights.push(`Consider cancelling ${expensiveSubs[0].name} ($${expensiveSubs[0].amount}/month) to improve cash flow.`)
    }
  }

  // Bill due date optimization
  const billsByDay = new Map<number, number>()
  for (const bill of inputs.bills) {
    billsByDay.set(bill.dueDay, (billsByDay.get(bill.dueDay) || 0) + bill.amount)
  }
  
  const maxBillsDay = Array.from(billsByDay.entries()).sort((a, b) => b[1] - a[1])[0]
  if (maxBillsDay && maxBillsDay[1] > inputs.monthlyIncome * 0.3) {
    insights.push(`Many bills are due on day ${maxBillsDay[0]} ($${maxBillsDay[1].toFixed(2)}). Consider spreading them across the month.`)
  }

  // Safety buffer calculation
  if (minBalance < 0) {
    const safetyBuffer = Math.abs(minBalance) + inputs.monthlyIncome * 0.1
    insights.push(`Recommended safety buffer: $${safetyBuffer.toFixed(2)} to avoid negative balances.`)
  }

  // Break-even analysis
  const endBalance = dailyBalances[totalDays - 1]
  if (endBalance < inputs.startingCash) {
    const monthlyLoss = (inputs.startingCash - endBalance) / inputs.months
    insights.push(`Your ending balance ($${endBalance.toFixed(2)}) is $${(inputs.startingCash - endBalance).toFixed(2)} lower than starting. Average monthly loss: $${monthlyLoss.toFixed(2)}.`)
  } else {
    const monthlyGain = (endBalance - inputs.startingCash) / inputs.months
    insights.push(`Your ending balance ($${endBalance.toFixed(2)}) is $${(endBalance - inputs.startingCash).toFixed(2)} higher than starting. Average monthly gain: $${monthlyGain.toFixed(2)}.`)
  }

  // Consecutive negative days warning
  let maxConsecutiveNegative = 0
  let currentConsecutive = 0
  for (let day = 0; day < totalDays; day++) {
    if (dailyBalances[day] < 0) {
      currentConsecutive++
      maxConsecutiveNegative = Math.max(maxConsecutiveNegative, currentConsecutive)
    } else {
      currentConsecutive = 0
    }
  }
  if (maxConsecutiveNegative > 5) {
    insights.push(`Warning: You have ${maxConsecutiveNegative} consecutive days with negative balance.`)
  }

  // Highest risk month
  if (tightMonths.size > 0) {
    const riskiestMonth = monthlySummaries
      .filter(m => tightMonths.has(m.monthIndex))
      .sort((a, b) => a.minBalance - b.minBalance)[0]
    
    if (riskiestMonth) {
      insights.push(`Highest risk month: Month ${riskiestMonth.monthIndex + 1} (lowest balance: $${riskiestMonth.minBalance.toFixed(2)}).`)
    }
  }

  return {
    dailyBalances,
    minBalance,
    minBalanceDay,
    negativeDays,
    tightMonths: Array.from(tightMonths).sort(),
    endBalance,
    insights,
    transactions,
    monthlySummaries,
    categoryBreakdown,
    cashFlowEvents,
    riskScore
  }
}
