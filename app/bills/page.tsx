'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { PrivacyNotice } from '../../components/PrivacyNotice'
import { Bill } from '../../lib/types'
import Link from 'next/link'

export default function BillsPage() {
  const router = useRouter()
  const { scenarios, currentScenarioId, addBill, updateBill, removeBill, initialize } = useStore()
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', amount: '', dueDay: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentScenario = scenarios.find((s) => s.id === currentScenarioId)
  const bills = currentScenario?.inputs.bills || []

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount < 0) {
      newErrors.amount = 'Must be a valid number >= 0'
    }

    const dueDay = parseInt(formData.dueDay)
    if (isNaN(dueDay) || dueDay < 1 || dueDay > 28) {
      newErrors.dueDay = 'Must be between 1 and 28'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate() || !currentScenarioId) return

    const bill: Bill = {
      id: editingId || `bill-${Date.now()}`,
      name: formData.name.trim(),
      amount: parseFloat(formData.amount),
      dueDay: parseInt(formData.dueDay),
    }

    if (editingId) {
      updateBill(currentScenarioId, editingId, bill)
    } else {
      addBill(currentScenarioId, bill)
    }

    setFormData({ name: '', amount: '', dueDay: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (bill: Bill) => {
    setFormData({
      name: bill.name,
      amount: bill.amount.toString(),
      dueDay: bill.dueDay.toString(),
    })
    setEditingId(bill.id)
    setShowForm(true)
  }

  const handleDelete = (billId: string) => {
    if (!currentScenarioId) return
    if (confirm('Are you sure you want to delete this bill?')) {
      removeBill(currentScenarioId, billId)
    }
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
        <h1 className="text-3xl font-bold mb-6">Manage Bills</h1>
        
        <PrivacyNotice />

        <div className="mb-4">
          <Button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', amount: '', dueDay: '' }) }}>
            Add Bill
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Bill' : 'Add New Bill'}
            </h3>
            <div className="space-y-4">
              <Input
                label="Bill Name"
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
                label="Due Day (1-28)"
                type="number"
                min="1"
                max="28"
                value={formData.dueDay}
                onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
                error={errors.dueDay}
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
          {bills.length === 0 ? (
            <Card>
              <p className="text-gray-600">No bills added yet.</p>
            </Card>
          ) : (
            bills.map((bill) => (
              <Card key={bill.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{bill.name}</h3>
                    <p className="text-gray-600">${bill.amount.toLocaleString()} due on day {bill.dueDay}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleEdit(bill)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(bill.id)}>
                      Delete
                    </Button>
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
