'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { PrivacyNotice } from '../../components/PrivacyNotice'
import { Subscription } from '../../lib/types'
import Link from 'next/link'

export default function SubscriptionsPage() {
  const router = useRouter()
  const { scenarios, currentScenarioId, addSubscription, updateSubscription, removeSubscription, cancelSubscription, pauseSubscription, initialize } = useStore()
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', amount: '', chargeDay: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentScenario = scenarios.find((s) => s.id === currentScenarioId)
  const subscriptions = currentScenario?.inputs.subscriptions || []

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount < 0) {
      newErrors.amount = 'Must be a valid number >= 0'
    }

    const chargeDay = parseInt(formData.chargeDay)
    if (isNaN(chargeDay) || chargeDay < 1 || chargeDay > 28) {
      newErrors.chargeDay = 'Must be between 1 and 28'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate() || !currentScenarioId) return

    const subscription: Subscription = {
      id: editingId || `sub-${Date.now()}`,
      name: formData.name.trim(),
      amount: parseFloat(formData.amount),
      chargeDay: parseInt(formData.chargeDay),
    }

    if (editingId) {
      updateSubscription(currentScenarioId, editingId, subscription)
    } else {
      addSubscription(currentScenarioId, subscription)
    }

    setFormData({ name: '', amount: '', chargeDay: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (sub: Subscription) => {
    setFormData({
      name: sub.name,
      amount: sub.amount.toString(),
      chargeDay: sub.chargeDay.toString(),
    })
    setEditingId(sub.id)
    setShowForm(true)
  }

  const handleDelete = (subId: string) => {
    if (!currentScenarioId) return
    if (confirm('Are you sure you want to delete this subscription?')) {
      removeSubscription(currentScenarioId, subId)
    }
  }

  const handleCancel = (subId: string) => {
    if (!currentScenarioId) return
    if (confirm('Cancel this subscription? It will stop charging starting next month.')) {
      cancelSubscription(currentScenarioId, subId)
    }
  }

  const handlePause = (subId: string) => {
    if (!currentScenarioId) return
    const nextMonth = 0 // First month (0-indexed) - skips the next charge
    pauseSubscription(currentScenarioId, subId, nextMonth)
    alert('Subscription paused for next month.')
  }

  if (!currentScenarioId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <p className="text-gray-600 mb-4">Please set up your financial inputs first.</p>
            <Link href="/inputs">
              <Button>Go to Inputs</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Subscriptions</h1>
        
        <PrivacyNotice />

        <div className="mb-4">
          <Button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', amount: '', chargeDay: '' }) }}>
            Add Subscription
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Subscription' : 'Add New Subscription'}
            </h3>
            <div className="space-y-4">
              <Input
                label="Subscription Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />
              <Input
                label="Amount ($)"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                error={errors.amount}
              />
              <Input
                label="Charge Day (1-28)"
                type="number"
                min="1"
                max="28"
                value={formData.chargeDay}
                onChange={(e) => setFormData({ ...formData, chargeDay: e.target.value })}
                error={errors.chargeDay}
              />
              <div className="flex gap-4">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="secondary" onClick={() => { setShowForm(false); setEditingId(null) }}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {subscriptions.length === 0 ? (
            <Card>
              <p className="text-gray-600">No subscriptions added yet.</p>
            </Card>
          ) : (
            subscriptions.map((sub) => (
              <Card key={sub.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{sub.name}</h3>
                      {sub.cancelled && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Cancelled</span>
                      )}
                      {sub.pausedMonths && sub.pausedMonths.length > 0 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          Paused ({sub.pausedMonths.length} month{sub.pausedMonths.length > 1 ? 's' : ''})
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">${sub.amount.toLocaleString()} charged on day {sub.chargeDay}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => handleEdit(sub)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(sub.id)}>
                        Delete
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {!sub.cancelled && (
                        <Button variant="secondary" onClick={() => handleCancel(sub.id)} className="text-xs">
                          Cancel
                        </Button>
                      )}
                      <Button variant="secondary" onClick={() => handlePause(sub.id)} className="text-xs">
                        Pause 1 Month
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-6">
          <Link href="/">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
