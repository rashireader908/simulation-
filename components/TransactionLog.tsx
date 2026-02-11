'use client'

import React, { useState, useMemo } from 'react'
import { Transaction } from '../lib/types'
import { Card } from './ui/Card'
import { Button } from './ui/Button'

interface TransactionLogProps {
  transactions: Transaction[]
  months: number
}

type SortField = 'day' | 'amount' | 'type'
type SortDirection = 'asc' | 'desc'

export function TransactionLog({ transactions, months }: TransactionLogProps) {
  const [sortField, setSortField] = useState<SortField>('day')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterType, setFilterType] = useState<string>('all')
  const [page, setPage] = useState(1)
  const itemsPerPage = 50

  const sortedTransactions = useMemo(() => {
    let filtered = transactions
    
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType)
    }
    
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'day':
          comparison = a.day - b.day
          break
        case 'amount':
          comparison = Math.abs(a.amount) - Math.abs(b.amount)
          break
        case 'type':
          comparison = a.type.localeCompare(b.type)
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })
    
    return sorted
  }, [transactions, sortField, sortDirection, filterType])

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return sortedTransactions.slice(start, start + itemsPerPage)
  }, [sortedTransactions, page])

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return 'bg-green-100 text-green-800'
      case 'bill':
        return 'bg-red-100 text-red-800'
      case 'subscription':
        return 'bg-orange-100 text-orange-800'
      case 'flexible_spending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card title="Transaction Log">
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-sm font-medium text-gray-700 mr-2">Filter:</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value)
              setPage(1)
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="bill">Bills</option>
            <option value="subscription">Subscriptions</option>
            <option value="flexible_spending">Flexible Spending</option>
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {paginatedTransactions.length} of {sortedTransactions.length} transactions
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th 
                className="text-left p-2 font-semibold cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('day')}
              >
                Day {sortField === 'day' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-left p-2 font-semibold cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                Type {sortField === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left p-2 font-semibold">Description</th>
              <th 
                className="text-right p-2 font-semibold cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right p-2 font-semibold">Balance After</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((tx, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2">Day {tx.day + 1} (Month {Math.floor(tx.day / 30) + 1})</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(tx.type)}`}>
                    {tx.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-2">{tx.description}</td>
                <td className={`p-2 text-right font-semibold ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.amount >= 0 ? '+' : ''}${tx.amount.toFixed(2)}
                </td>
                <td className={`p-2 text-right ${tx.balanceAfter < 0 ? 'text-red-600 font-semibold' : ''}`}>
                  ${tx.balanceAfter.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  )
}
