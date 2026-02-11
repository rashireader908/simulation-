import { SimulationResult, FinancialInputs, MonthlySummary, Transaction } from './types'

export function exportToCSV(result: SimulationResult, inputs: FinancialInputs): string {
  const lines: string[] = []
  
  // Header
  lines.push('Money Sandbox Simulation Export')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  
  // Summary
  lines.push('Summary')
  lines.push('Metric,Value')
  lines.push(`Starting Cash,${inputs.startingCash.toFixed(2)}`)
  lines.push(`Monthly Income,${inputs.monthlyIncome.toFixed(2)}`)
  lines.push(`Ending Balance,${result.endBalance.toFixed(2)}`)
  lines.push(`Minimum Balance,${result.minBalance.toFixed(2)}`)
  lines.push(`Negative Days,${result.negativeDays}`)
  lines.push(`Risk Score,${result.riskScore}`)
  lines.push('')
  
  // Monthly Summaries
  lines.push('Monthly Summaries')
  lines.push('Month,Income,Expenses,Net Change,Starting Balance,Ending Balance,Negative Days,Min Balance')
  result.monthlySummaries.forEach(summary => {
    lines.push([
      `Month ${summary.monthIndex + 1}`,
      summary.income.toFixed(2),
      summary.totalExpenses.toFixed(2),
      summary.netChange.toFixed(2),
      summary.startingBalance.toFixed(2),
      summary.endingBalance.toFixed(2),
      summary.negativeDays,
      summary.minBalance.toFixed(2)
    ].join(','))
  })
  lines.push('')
  
  // Category Breakdown
  lines.push('Category Breakdown')
  lines.push('Category,Amount,Percentage')
  lines.push(`Bills,${result.categoryBreakdown.bills.toFixed(2)},${result.categoryBreakdown.percentages.bills.toFixed(2)}%`)
  lines.push(`Subscriptions,${result.categoryBreakdown.subscriptions.toFixed(2)},${result.categoryBreakdown.percentages.subscriptions.toFixed(2)}%`)
  lines.push(`Flexible Spending,${result.categoryBreakdown.flexibleSpending.toFixed(2)},${result.categoryBreakdown.percentages.flexibleSpending.toFixed(2)}%`)
  lines.push(`Total,${result.categoryBreakdown.total.toFixed(2)},100%`)
  lines.push('')
  
  // Transactions (limited to first 1000 for file size)
  lines.push('Transactions (First 1000)')
  lines.push('Day,Type,Amount,Description,Balance After')
  result.transactions.slice(0, 1000).forEach(tx => {
    lines.push([
      tx.day + 1,
      tx.type,
      tx.amount.toFixed(2),
      `"${tx.description}"`,
      tx.balanceAfter.toFixed(2)
    ].join(','))
  })
  
  return lines.join('\n')
}

export function exportToTextSummary(result: SimulationResult, inputs: FinancialInputs, scenarioName?: string): string {
  const lines: string[] = []
  
  lines.push('='.repeat(60))
  lines.push('MONEY SANDBOX SIMULATION REPORT')
  if (scenarioName) {
    lines.push(`Scenario: ${scenarioName}`)
  }
  lines.push(`Generated: ${new Date().toLocaleString()}`)
  lines.push('='.repeat(60))
  lines.push('')
  
  // Overview
  lines.push('OVERVIEW')
  lines.push('-'.repeat(60))
  lines.push(`Starting Cash: $${inputs.startingCash.toFixed(2)}`)
  lines.push(`Monthly Income: $${inputs.monthlyIncome.toFixed(2)}`)
  lines.push(`Monthly Flexible Spending: $${inputs.monthlyFlexSpend.toFixed(2)}`)
  lines.push(`Simulation Period: ${inputs.months} month(s)`)
  lines.push('')
  
  // Results Summary
  lines.push('RESULTS SUMMARY')
  lines.push('-'.repeat(60))
  lines.push(`Ending Balance: $${result.endBalance.toFixed(2)}`)
  lines.push(`Minimum Balance: $${result.minBalance.toFixed(2)} (Day ${result.minBalanceDay + 1})`)
  lines.push(`Negative Days: ${result.negativeDays}`)
  lines.push(`Tight Months: ${result.tightMonths.length}`)
  lines.push(`Risk Score: ${result.riskScore.toUpperCase()}`)
  lines.push('')
  
  // Monthly Breakdown
  lines.push('MONTHLY BREAKDOWN')
  lines.push('-'.repeat(60))
  result.monthlySummaries.forEach(summary => {
    lines.push(`Month ${summary.monthIndex + 1}:`)
    lines.push(`  Income: $${summary.income.toFixed(2)}`)
    lines.push(`  Expenses: $${summary.totalExpenses.toFixed(2)}`)
    lines.push(`    - Bills: $${summary.bills.toFixed(2)}`)
    lines.push(`    - Subscriptions: $${summary.subscriptions.toFixed(2)}`)
    lines.push(`    - Flexible Spending: $${summary.flexibleSpending.toFixed(2)}`)
    lines.push(`  Net Change: $${summary.netChange.toFixed(2)}`)
    lines.push(`  Starting Balance: $${summary.startingBalance.toFixed(2)}`)
    lines.push(`  Ending Balance: $${summary.endingBalance.toFixed(2)}`)
    lines.push(`  Negative Days: ${summary.negativeDays}`)
    lines.push(`  Minimum Balance: $${summary.minBalance.toFixed(2)}`)
    lines.push('')
  })
  
  // Category Breakdown
  lines.push('SPENDING BREAKDOWN')
  lines.push('-'.repeat(60))
  lines.push(`Bills: $${result.categoryBreakdown.bills.toFixed(2)} (${result.categoryBreakdown.percentages.bills.toFixed(1)}%)`)
  lines.push(`Subscriptions: $${result.categoryBreakdown.subscriptions.toFixed(2)} (${result.categoryBreakdown.percentages.subscriptions.toFixed(1)}%)`)
  lines.push(`Flexible Spending: $${result.categoryBreakdown.flexibleSpending.toFixed(2)} (${result.categoryBreakdown.percentages.flexibleSpending.toFixed(1)}%)`)
  lines.push(`Total Expenses: $${result.categoryBreakdown.total.toFixed(2)}`)
  lines.push('')
  
  // Insights
  lines.push('INSIGHTS & RECOMMENDATIONS')
  lines.push('-'.repeat(60))
  result.insights.forEach(insight => {
    lines.push(`• ${insight}`)
  })
  lines.push('')
  
  // Cash Flow Events
  if (result.cashFlowEvents.length > 0) {
    lines.push('SIGNIFICANT CASH FLOW EVENTS')
    lines.push('-'.repeat(60))
    result.cashFlowEvents.slice(0, 20).forEach(event => {
      lines.push(`Day ${event.day + 1}: ${event.description} - $${Math.abs(event.amount).toFixed(2)} (Balance: $${event.balanceAfter.toFixed(2)})`)
    })
    if (result.cashFlowEvents.length > 20) {
      lines.push(`... and ${result.cashFlowEvents.length - 20} more events`)
    }
    lines.push('')
  }
  
  lines.push('='.repeat(60))
  lines.push('End of Report')
  
  return lines.join('\n')
}

export function downloadCSV(csvContent: string, filename: string = 'money-sandbox-export.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export function downloadText(textContent: string, filename: string = 'money-sandbox-report.txt'): void {
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// Simple PDF export using browser print functionality
export function exportToPDF(result: SimulationResult, inputs: FinancialInputs, scenarioName?: string): void {
  const textContent = exportToTextSummary(result, inputs, scenarioName)
  
  // Create a temporary element with the content
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to export as PDF')
    return
  }
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Money Sandbox Report</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            padding: 20px;
            line-height: 1.6;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <pre>${textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      </body>
    </html>
  `)
  
  printWindow.document.close()
  printWindow.focus()
  
  // Wait a bit for content to load, then print
  setTimeout(() => {
    printWindow.print()
  }, 250)
}
