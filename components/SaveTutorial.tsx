'use client'

import { useState } from 'react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'

interface SaveTutorialProps {
  onDismiss?: () => void
}

export function SaveTutorial({ onDismiss }: SaveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Welcome! Let\'s get you started',
      description: 'This tutorial will guide you through saving your financial information for the first time.',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Saving your financial inputs allows you to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Run simulations to see your cash flow</li>
            <li>Compare different financial scenarios</li>
            <li>Track your bills and subscriptions</li>
            <li>Make informed financial decisions</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Step 1: Fill in your financial basics',
      description: 'Enter your monthly income, starting cash, and spending information.',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">What to enter:</p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Monthly Income:</strong> Your total monthly earnings</li>
              <li><strong>Starting Cash Buffer:</strong> Money you have right now</li>
              <li><strong>Monthly Flexible Spending:</strong> Variable expenses like groceries, entertainment</li>
              <li><strong>Simulation Period:</strong> How many months to simulate (1-6 months)</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Tip:</strong> Don't worry about being exact - you can always edit these later!
          </p>
        </div>
      ),
    },
    {
      title: 'Step 2: Click the Save button',
      description: 'Once you\'ve entered your information, click the Save button at the bottom of the form.',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <p className="font-semibold text-gray-900 mb-2">What happens when you save:</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Your data is saved locally on your device</li>
              <li>✓ A baseline scenario is created</li>
              <li>✓ You'll be redirected to the dashboard</li>
              <li>✓ You can then run simulations and add bills/subscriptions</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Privacy:</strong> All your data stays on your device - nothing is sent to any server!
          </p>
        </div>
      ),
    },
    {
      title: 'Step 3: After saving',
      description: 'After saving, you can explore more features of the app.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-purple-50 p-3 rounded-lg border-2 border-purple-200">
              <p className="font-semibold text-gray-900 mb-1">Run Simulation</p>
              <p className="text-sm text-gray-700">See how your cash flow looks over time</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border-2 border-purple-200">
              <p className="font-semibold text-gray-900 mb-1">Manage Bills</p>
              <p className="text-sm text-gray-700">Add fixed monthly expenses with due dates</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border-2 border-purple-200">
              <p className="font-semibold text-gray-900 mb-1">Manage Subscriptions</p>
              <p className="text-sm text-gray-700">Track recurring services and subscriptions</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Ready to get started? Fill in the form below and click Save!
          </p>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleDismiss()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDismiss = () => {
    // Store dismissal in localStorage so it doesn't show again
    if (typeof window !== 'undefined') {
      localStorage.setItem('save-tutorial-dismissed', 'true')
    }
    onDismiss?.()
  }

  const currentStepData = steps[currentStep]

  return (
    <Card className="mb-6 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
      <div className="relative">
        <button
          onClick={handleDismiss}
          className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close tutorial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pr-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">
              {currentStep + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-600">
                {currentStepData.description}
              </p>
            </div>
          </div>

          <div className="mb-6">
            {currentStepData.content}
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  className="px-4"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="px-6"
              >
                {currentStep === steps.length - 1 ? 'Got it!' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
