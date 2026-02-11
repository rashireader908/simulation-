export interface Bill {
  id: string
  name: string
  amount: number
  dueDay: number // 1-28
}

export interface Subscription {
  id: string
  name: string
  amount: number
  chargeDay: number // 1-28
  cancelled?: boolean
  pausedMonths?: number[] // Array of month indices (0-based) to skip
}

export interface FinancialInputs {
  monthlyIncome: number
  startingCash: number
  monthlyFlexSpend: number
  months: number // 1-6
  bills: Bill[]
  subscriptions: Subscription[]
}

export interface Transaction {
  day: number // 0-based day index
  type: 'income' | 'bill' | 'subscription' | 'flexible_spending'
  amount: number // Positive for income, negative for expenses
  description: string
  balanceAfter: number
}

export interface MonthlySummary {
  monthIndex: number // 0-based
  income: number
  bills: number
  subscriptions: number
  flexibleSpending: number
  totalExpenses: number
  netChange: number
  startingBalance: number
  endingBalance: number
  averageDailyBalance: number
  negativeDays: number
  minBalance: number
}

export interface CategoryBreakdown {
  bills: number
  subscriptions: number
  flexibleSpending: number
  total: number
  percentages: {
    bills: number
    subscriptions: number
    flexibleSpending: number
  }
}

export interface CashFlowEvent {
  day: number
  type: 'income' | 'large_bill' | 'large_subscription' | 'negative_balance'
  amount: number
  description: string
  balanceAfter: number
}

export interface SimulationResult {
  dailyBalances: number[]
  minBalance: number
  minBalanceDay: number
  negativeDays: number
  tightMonths: number[] // Month indices (0-based) with any negative day
  endBalance: number
  insights: string[]
  transactions: Transaction[]
  monthlySummaries: MonthlySummary[]
  categoryBreakdown: CategoryBreakdown
  cashFlowEvents: CashFlowEvent[]
  riskScore: 'low' | 'medium' | 'high'
}

export interface Scenario {
  id: string
  name: string
  inputs: FinancialInputs
  createdAt: string // ISO date string
}

export interface AppState {
  scenarios: Scenario[]
  currentScenarioId: string | null
  baselineScenarioId: string | null
  storageVersion: string
}
