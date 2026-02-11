'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { PrivacyNotice } from '../../components/PrivacyNotice'
import { SaveTutorial } from '../../components/SaveTutorial'
import Link from 'next/link'

export default function InputsPage() {
  const router = useRouter()
  const { scenarios, currentScenarioId, createBaseline, updateScenario, initialize } = useStore()
  
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [startingCash, setStartingCash] = useState('')
  const [monthlyFlexSpend, setMonthlyFlexSpend] = useState('')
  const [months, setMonths] = useState('1')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    // Check if user has never saved before and tutorial hasn't been dismissed
    const hasNeverSaved = scenarios.length === 0 && !currentScenarioId
    const tutorialDismissed = typeof window !== 'undefined' 
      ? localStorage.getItem('save-tutorial-dismissed') === 'true'
      : false
    
    setShowTutorial(hasNeverSaved && !tutorialDismissed)
  }, [scenarios, currentScenarioId])
  
  useEffect(() => {
    const currentScenario = scenarios.find((s) => s.id === currentScenarioId)
    if (currentScenario) {
      setMonthlyIncome(currentScenario.inputs.monthlyIncome.toString())
      setStartingCash(currentScenario.inputs.startingCash.toString())
      setMonthlyFlexSpend(currentScenario.inputs.monthlyFlexSpend.toString())
      setMonths(currentScenario.inputs.months.toString())
    }
  }, [scenarios, currentScenarioId])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    const income = parseFloat(monthlyIncome)
    if (isNaN(income) || income < 0) {
      newErrors.monthlyIncome = 'Must be a valid number >= 0'
    }

    const cash = parseFloat(startingCash)
    if (isNaN(cash) || cash < 0) {
      newErrors.startingCash = 'Must be a valid number >= 0'
    }

    const flex = parseFloat(monthlyFlexSpend)
    if (isNaN(flex) || flex < 0) {
      newErrors.monthlyFlexSpend = 'Must be a valid number >= 0'
    }

    const monthsNum = parseInt(months)
    if (isNaN(monthsNum) || monthsNum < 1 || monthsNum > 6) {
      newErrors.months = 'Must be between 1 and 6'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    const inputs = {
      monthlyIncome: parseFloat(monthlyIncome),
      startingCash: parseFloat(startingCash),
      monthlyFlexSpend: parseFloat(monthlyFlexSpend),
      months: parseInt(months),
      bills: currentScenarioId ? scenarios.find((s) => s.id === currentScenarioId)?.inputs.bills || [] : [],
      subscriptions: currentScenarioId ? scenarios.find((s) => s.id === currentScenarioId)?.inputs.subscriptions || [] : [],
    }

    if (currentScenarioId) {
      updateScenario(currentScenarioId, inputs)
    } else {
      createBaseline(inputs)
    }

    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Financial Inputs</h1>
        
        <PrivacyNotice />

        {showTutorial && (
          <SaveTutorial onDismiss={() => setShowTutorial(false)} />
        )}

        <Card>
          <div className="space-y-4">
            <Input
              label="Monthly Income ($)"
              type="number"
              min="0"
              step="0.01"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              error={errors.monthlyIncome}
            />

            <Input
              label="Starting Cash Buffer ($)"
              type="number"
              min="0"
              step="0.01"
              value={startingCash}
              onChange={(e) => setStartingCash(e.target.value)}
              error={errors.startingCash}
            />

            <Input
              label="Monthly Flexible Spending ($)"
              type="number"
              min="0"
              step="0.01"
              value={monthlyFlexSpend}
              onChange={(e) => setMonthlyFlexSpend(e.target.value)}
              error={errors.monthlyFlexSpend}
            />

            <Input
              label="Simulation Period (months)"
              type="number"
              min="1"
              max="6"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              error={errors.months}
            />

            <div className="flex gap-4 pt-4">
              <Button onClick={handleSave} className="flex-1">
                Save
              </Button>
              <Link href="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
