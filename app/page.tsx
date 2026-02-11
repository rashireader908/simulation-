'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PrivacyNotice } from '../components/PrivacyNotice'
import { clearAllData, exportData, importData } from '../lib/storage'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const { scenarios, currentScenarioId, initialize, importState } = useStore()
  
  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentScenario = scenarios.find((s) => s.id === currentScenarioId)
  const hasBaseline = scenarios.length > 0

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearAllData()
      window.location.reload()
    }
  }

  const handleRunSimulation = () => {
    if (!hasBaseline) {
      alert('Please set up your financial inputs first.')
      router.push('/inputs')
      return
    }
    router.push('/results')
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
          window.location.reload()
        } else {
          alert('Failed to import data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="mb-3">
            <h1 className="text-5xl font-bold text-blue-600 mb-2">
              Money Sandbox
            </h1>
            <p className="text-gray-700 text-lg font-medium">Plan and simulate your financial scenarios</p>
          </div>
        </div>
        
        <PrivacyNotice />

        {hasBaseline && currentScenario ? (
          <>
            <Card title="Your Financial Overview" className="mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="bg-white rounded-xl p-5 border-2 border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:border-blue-300"
                    >
                      <p className="text-sm font-medium text-gray-700 mb-2">Monthly Income</p>
                      <p className="text-3xl font-bold text-blue-600">${currentScenario.inputs.monthlyIncome.toLocaleString()}</p>
                    </div>
                    <div 
                      className="bg-white rounded-xl p-5 border-2 border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:border-blue-300"
                    >
                      <p className="text-sm font-medium text-gray-700 mb-2">Starting Cash</p>
                      <p className="text-3xl font-bold text-blue-600">${currentScenario.inputs.startingCash.toLocaleString()}</p>
                    </div>
                    <div 
                      className="bg-white rounded-xl p-5 border-2 border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:border-blue-300"
                    >
                      <p className="text-sm font-medium text-gray-700 mb-2">Flexible Spending</p>
                      <p className="text-3xl font-bold text-blue-600">${currentScenario.inputs.monthlyFlexSpend.toLocaleString()}</p>
                    </div>
                    <div 
                      className="bg-white rounded-xl p-5 border-2 border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:border-blue-300"
                    >
                      <p className="text-sm font-medium text-gray-700 mb-2">Simulation Period</p>
                      <p className="text-3xl font-bold text-blue-600">{currentScenario.inputs.months} month{currentScenario.inputs.months > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div 
                    className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:border-blue-300"
                  >
                    <p className="text-sm font-semibold text-gray-700 mb-2">Bills</p>
                    <p className="text-4xl font-bold text-blue-600">{currentScenario.inputs.bills.length}</p>
                    <p className="text-xs text-gray-600 mt-2 font-medium">Fixed monthly expenses</p>
                  </div>
                  <div 
                    className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:border-blue-300"
                  >
                    <p className="text-sm font-semibold text-gray-700 mb-2">Subscriptions</p>
                    <p className="text-4xl font-bold text-blue-600">{currentScenario.inputs.subscriptions.length}</p>
                    <p className="text-xs text-gray-600 mt-2 font-medium">Recurring services</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  onClick={handleRunSimulation} 
                  className="w-full h-auto py-5 text-base font-semibold bg-blue-600 hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Run Simulation
                </Button>
                <Link href="/inputs" className="w-full transform transition-all duration-300 hover:scale-105">
                  <Button variant="secondary" className="w-full h-auto py-5 text-base font-semibold bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300">
                    Edit Inputs
                  </Button>
                </Link>
                <Link href="/bills" className="w-full transform transition-all duration-300 hover:scale-105">
                  <Button variant="secondary" className="w-full h-auto py-5 text-base font-semibold bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300">
                    Manage Bills
                  </Button>
                </Link>
                <Link href="/subscriptions" className="w-full transform transition-all duration-300 hover:scale-105">
                  <Button variant="secondary" className="w-full h-auto py-5 text-base font-semibold bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300">
                    Manage Subscriptions
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Card className="mb-6 bg-white border-2 border-blue-200 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="text-center py-10">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                Get Started
              </h2>
              <p className="text-gray-700 mb-8 max-w-md mx-auto text-lg font-medium">
                Set up your financial inputs to begin simulating different scenarios and see how your decisions impact your cash flow.
              </p>
              <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">1</div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Enter your financial basics</p>
                    <p className="text-sm text-gray-600">Income, starting cash, and spending</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">2</div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Add bills and subscriptions</p>
                    <p className="text-sm text-gray-600">Track your recurring expenses</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">3</div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Run your simulation</p>
                    <p className="text-sm text-gray-600">See how your finances look over time</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => router.push('/inputs')} 
                className="px-10 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                Set Up Your Plan
              </Button>
            </div>
          </Card>
        )}

        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 transform transition-all duration-300 hover:shadow-xl">
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Data Management
                </h3>
                <p className="text-sm text-gray-700 font-medium">
                  All your data is stored locally on your device. Export to backup or import to restore your scenarios.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  variant="secondary" 
                  onClick={handleExport}
                  className="flex-1 sm:flex-none py-3 font-semibold bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 transform transition-all duration-300 hover:scale-105"
                >
                  Export Data
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleImport}
                  className="flex-1 sm:flex-none py-3 font-semibold bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 transform transition-all duration-300 hover:scale-105"
                >
                  Import Data
                </Button>
                <div className="flex-1 sm:flex-none sm:ml-auto">
                  <Button 
                    variant="secondary" 
                    onClick={handleClearData}
                    className="w-full sm:w-auto py-3 font-semibold bg-gray-200 hover:bg-gray-300 border-2 border-gray-400 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Clear All Data
                  </Button>
                </div>
              </div>
              
              <div className="pt-3 border-t-2 border-gray-200 bg-gray-50 rounded-lg p-3 border-2 border-gray-200">
                <p className="text-xs text-gray-700 font-medium">
                  <strong>Note:</strong> Clearing all data cannot be undone. Make sure to export your data first if you want to keep a backup.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
