'use client'

import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Button } from './ui/Button'
import { Select } from './ui/Select'

export function ScenarioSelector() {
  const { scenarios, currentScenarioId, setCurrentScenario, duplicateScenario, baselineScenarioId } = useStore()
  const [newScenarioName, setNewScenarioName] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const currentScenario = scenarios.find((s) => s.id === currentScenarioId)
  const baseline = scenarios.find((s) => s.id === baselineScenarioId)

  const handleDuplicate = () => {
    if (currentScenarioId && newScenarioName.trim()) {
      duplicateScenario(currentScenarioId, newScenarioName.trim())
      setNewScenarioName('')
      setShowCreate(false)
    }
  }

  const options = scenarios.map((s) => ({
    value: s.id,
    label: s.name,
  }))

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <Select
            label="Select Scenario"
            options={options}
            value={currentScenarioId || ''}
            onChange={(e) => setCurrentScenario(e.target.value)}
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? 'Cancel' : 'Create New Scenario'}
        </Button>
      </div>

      {showCreate && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Scenario name"
            value={newScenarioName}
            onChange={(e) => setNewScenarioName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
          />
          <Button onClick={handleDuplicate} disabled={!newScenarioName.trim()}>
            Duplicate Current
          </Button>
        </div>
      )}

      {currentScenario && (
        <div className="text-sm text-gray-600">
          Created: {new Date(currentScenario.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}
