'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'
import { simulateCashflow } from '../../lib/simulation'
import { exportData, importData } from '../../lib/storage'
import { exportToCSV, exportToTextSummary, exportToPDF, downloadCSV, downloadText } from '../../lib/export'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { CashflowChart } from '../../components/CashflowChart'
import { MonthlyBreakdownChart } from '../../components/MonthlyBreakdownChart'
import { SpendingCategoryChart } from '../../components/SpendingCategoryChart'
import { ComparisonChart } from '../../components/ComparisonChart'
import { TransactionTimeline } from '../../components/TransactionTimeline'
import { WhatIfControls } from '../../components/WhatIfControls'
import { MonthlySummaryTable } from '../../components/MonthlySummaryTable'
import { TransactionLog } from '../../components/TransactionLog'
import { SpendingBreakdown } from '../../components/SpendingBreakdown'
import { ScenarioSelector } from '../../components/ScenarioSelector'
import { PrivacyNotice } from '../../components/PrivacyNotice'
import { FinancialInputs } from '../../lib/types'
import Link from 'next/link'

export default function ResultsPage() {
  const router = useRouter()
  const { scenarios, currentScenarioId, baselineScenarioId, setCurrentScenario, initialize, importState, duplicateScenario, updateScenario } = useStore()
  
  const [baselineResult, setBaselineResult] = useState<any>(null)
  const [currentResult, setCurrentResult] = useState<any>(null)
  const [whatIfInputs, setWhatIfInputs] = useState<FinancialInputs | null>(null)
  const [whatIfResult, setWhatIfResult] = useState<any>(null)
  const [showWhatIf, setShowWhatIf] = useState(false)
  const [activeTab, setActiveTab] = useState<'charts' | 'breakdowns' | 'transactions'>('charts')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['insights']))

  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scenarios.length === 0) {
      router.push('/')
      return
    }

    const baseline = scenarios.find((s) => s.id === baselineScenarioId)
    const current = scenarios.find((s) => s.id === currentScenarioId)

    if (baseline) {
      setBaselineResult(simulateCashflow(baseline.inputs))
    }

    if (current) {
      const result = simulateCashflow(current.inputs)
      setCurrentResult(result)
      setWhatIfInputs(null)
      setWhatIfResult(null)
      setShowWhatIf(false)
    }
  }, [scenarios, currentScenarioId, baselineScenarioId, router])

  // Recalculate what-if when inputs change
  useEffect(() => {
    if (whatIfInputs) {
      setWhatIfResult(simulateCashflow(whatIfInputs))
    }
  }, [whatIfInputs])

  const displayResult = whatIfResult || currentResult
  const displayInputs = whatIfInputs || scenarios.find((s) => s.id === currentScenarioId)?.inputs

  const handleWhatIfChange = (adjustedInputs: FinancialInputs) => {
    setWhatIfInputs(adjustedInputs)
    setShowWhatIf(true)
  }

  const handleWhatIfReset = () => {
    setWhatIfInputs(null)
    setWhatIfResult(null)
    setShowWhatIf(false)
  }

  const handleSaveAsScenario = () => {
    if (!whatIfInputs || !currentScenarioId) return
    
    const currentScenario = scenarios.find((s) => s.id === currentScenarioId)
    if (!currentScenario) return

    const name = prompt('Enter a name for this scenario:', `${currentScenario.name} (What-If)`)
    if (!name) return

    // Create new scenario with what-if inputs
    duplicateScenario(currentScenarioId, name)
    
    // The duplicateScenario function creates the scenario, then we update it
    // We need to access the store directly to get the latest state
    const store = useStore.getState()
    const updatedScenarios = store.scenarios
    const newScenario = updatedScenarios.find(s => s.name === name && s.id !== currentScenarioId)
    
    if (newScenario) {
      updateScenario(newScenario.id, whatIfInputs)
      setCurrentScenario(newScenario.id)
      handleWhatIfReset()
    } else {
      // If not found immediately, try again after a short delay
      setTimeout(() => {
        const store2 = useStore.getState()
        const updatedScenarios2 = store2.scenarios
        const newScenario2 = updatedScenarios2.find(s => s.name === name && s.id !== currentScenarioId)
        if (newScenario2) {
          updateScenario(newScenario2.id, whatIfInputs)
          setCurrentScenario(newScenario2.id)
          handleWhatIfReset()
        }
      }, 200)
    }
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'money-sandbox-export.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const imported = importData(text)
        if (imported) {
          importState(imported)
          alert('Import successful!')
        } else {
          alert('Failed to import data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleExportCSV = () => {
    if (!displayResult || !displayInputs) return
    const csv = exportToCSV(displayResult, displayInputs)
    const scenarioName = scenarios.find((s) => s.id === currentScenarioId)?.name || 'scenario'
    downloadCSV(csv, `money-sandbox-${scenarioName}-${Date.now()}.csv`)
  }

  const handleExportText = () => {
    if (!displayResult || !displayInputs) return
    const scenarioName = scenarios.find((s) => s.id === currentScenarioId)?.name
    const text = exportToTextSummary(displayResult, displayInputs, scenarioName)
    downloadText(text, `money-sandbox-report-${Date.now()}.txt`)
  }

  const handleExportPDF = () => {
    if (!displayResult || !displayInputs) return
    const scenarioName = scenarios.find((s) => s.id === currentScenarioId)?.name
    exportToPDF(displayResult, displayInputs, scenarioName)
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  if (!baselineResult || !currentResult || !displayResult || !displayInputs) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <p className="text-gray-600">Loading simulation results...</p>
          </Card>
        </div>
      </div>
    )
  }

  const isBaseline = currentScenarioId === baselineScenarioId
  const deltaMinBalance = displayResult.minBalance - baselineResult.minBalance
  const deltaNegativeDays = displayResult.negativeDays - baselineResult.negativeDays
  const deltaEndBalance = displayResult.endBalance - baselineResult.endBalance

  const riskColor: Record<'low' | 'medium' | 'high', string> = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300'
  }
  const riskColorClass = riskColor[displayResult.riskScore]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Simulation Results</h1>
          {showWhatIf && (
            <Button onClick={handleSaveAsScenario} className="bg-green-600 hover:bg-green-700">
              Save as New Scenario
            </Button>
          )}
        </div>
        
        <PrivacyNotice />

        <div className="mb-6">
          <ScenarioSelector />
        </div>

        {/* What-If Controls */}
        <div className="mb-6">
          <button
            onClick={() => setShowWhatIf(!showWhatIf)}
            className="w-full text-left p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">What-If Analysis</h2>
              <span className="text-sm text-gray-500">{showWhatIf ? '▼' : '▶'}</span>
            </div>
          </button>
          {showWhatIf && displayInputs && (
            <div className="mt-2">
              <WhatIfControls
                originalInputs={scenarios.find((s) => s.id === currentScenarioId)!.inputs}
                onInputsChange={handleWhatIfChange}
                onReset={handleWhatIfReset}
              />
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <p className="text-sm text-gray-600 mb-1">Risk Score</p>
            <p className={`text-2xl font-bold px-3 py-2 rounded border-2 inline-block ${riskColorClass}`}>
              {displayResult.riskScore.toUpperCase()}
            </p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">Worst Balance</p>
            <p className={`text-2xl font-bold ${displayResult.minBalance < 0 ? 'text-red-600' : ''}`}>
              ${displayResult.minBalance.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Day {displayResult.minBalanceDay + 1}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">Negative Days</p>
            <p className={`text-2xl font-bold ${displayResult.negativeDays > 0 ? 'text-red-600' : ''}`}>
              {displayResult.negativeDays}
            </p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">End Balance</p>
            <p className={`text-2xl font-bold ${displayResult.endBalance >= displayInputs.startingCash ? 'text-green-600' : 'text-red-600'}`}>
              ${displayResult.endBalance.toFixed(2)}
            </p>
          </Card>
        </div>

        {/* Comparison with Baseline */}
        {!isBaseline && !showWhatIf && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Changes vs Baseline</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Worst Balance</p>
                <p className={`text-xl font-bold ${deltaMinBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {deltaMinBalance >= 0 ? '+' : ''}${deltaMinBalance.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Negative Days</p>
                <p className={`text-xl font-bold ${deltaNegativeDays <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {deltaNegativeDays >= 0 ? '+' : ''}{deltaNegativeDays}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End Balance</p>
                <p className={`text-xl font-bold ${deltaEndBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {deltaEndBalance >= 0 ? '+' : ''}${deltaEndBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Tabs for Charts and Breakdowns */}
        <div className="mb-6">
          <div className="flex border-b border-gray-300 mb-4">
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-4 py-2 font-medium ${activeTab === 'charts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Charts
            </button>
            <button
              onClick={() => setActiveTab('breakdowns')}
              className={`px-4 py-2 font-medium ${activeTab === 'breakdowns' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Breakdowns
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 font-medium ${activeTab === 'transactions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Transactions
            </button>
          </div>

          {activeTab === 'charts' && (
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-semibold mb-4">Cash Flow Chart</h2>
                <CashflowChart 
                  dailyBalances={displayResult.dailyBalances} 
                  months={displayInputs.months}
                  transactions={displayResult.transactions}
                />
              </Card>

              {!isBaseline && baselineResult && (
                <Card>
                  <h2 className="text-xl font-semibold mb-4">Comparison: Baseline vs Current</h2>
                  <ComparisonChart
                    baselineBalances={baselineResult.dailyBalances}
                    currentBalances={displayResult.dailyBalances}
                    months={displayInputs.months}
                  />
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <h2 className="text-xl font-semibold mb-4">Monthly Breakdown</h2>
                  <MonthlyBreakdownChart monthlySummaries={displayResult.monthlySummaries} />
                </Card>

                <Card>
                  <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
                  <SpendingCategoryChart categoryBreakdown={displayResult.categoryBreakdown} />
                </Card>
              </div>

              <Card>
                <h2 className="text-xl font-semibold mb-4">Cash Flow Events Timeline</h2>
                <TransactionTimeline 
                  cashFlowEvents={displayResult.cashFlowEvents} 
                  months={displayInputs.months}
                />
              </Card>
            </div>
          )}

          {activeTab === 'breakdowns' && (
            <div className="space-y-6">
              <MonthlySummaryTable monthlySummaries={displayResult.monthlySummaries} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpendingBreakdown categoryBreakdown={displayResult.categoryBreakdown} />
                
                <Card title="Baseline vs Current Comparison">
                  {baselineResult && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Baseline Scenario</p>
                        <div className="space-y-1 text-sm">
                          <p>Worst Balance: <span className="font-semibold">${baselineResult.minBalance.toFixed(2)}</span></p>
                          <p>Negative Days: <span className="font-semibold">{baselineResult.negativeDays}</span></p>
                          <p>End Balance: <span className="font-semibold">${baselineResult.endBalance.toFixed(2)}</span></p>
                        </div>
                      </div>
                      {!isBaseline && (
                        <div className="pt-4 border-t">
                          <p className="text-sm text-gray-600 mb-2">Current Scenario</p>
                          <div className="space-y-1 text-sm">
                            <p>Worst Balance: <span className="font-semibold">${displayResult.minBalance.toFixed(2)}</span></p>
                            <p>Negative Days: <span className="font-semibold">{displayResult.negativeDays}</span></p>
                            <p>End Balance: <span className="font-semibold">${displayResult.endBalance.toFixed(2)}</span></p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <TransactionLog 
              transactions={displayResult.transactions} 
              months={displayInputs.months}
            />
          )}
        </div>

        {/* Insights Section */}
        <Card className="mb-6">
          <button
            onClick={() => toggleSection('insights')}
            className="w-full text-left"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Insights & Recommendations</h2>
              <span className="text-sm text-gray-500">{expandedSections.has('insights') ? '▼' : '▶'}</span>
            </div>
          </button>
          {expandedSections.has('insights') && (
            <ul className="space-y-2">
              {displayResult.insights.map((insight: string, index: number) => (
                <li key={index} className="text-gray-700">• {insight}</li>
              ))}
            </ul>
          )}
        </Card>

        {/* Export Options */}
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Export Results</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExportCSV} variant="secondary">
              Export CSV
            </Button>
            <Button onClick={handleExportText} variant="secondary">
              Export Text Report
            </Button>
            <Button onClick={handleExportPDF} variant="secondary">
              Export PDF
            </Button>
            <Button onClick={handleExport} variant="secondary">
              Export Data (JSON)
            </Button>
            <Button onClick={handleImport} variant="secondary">
              Import Data
            </Button>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
