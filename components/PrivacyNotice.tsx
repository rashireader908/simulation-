import React from 'react'

export function PrivacyNotice() {
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6 transform transition-all duration-300 hover:shadow-md">
      <p className="text-sm text-gray-700 leading-relaxed font-medium">
        <span className="font-bold text-blue-600">Privacy:</span>
        <span className="ml-2">Runs locally. Data stays on your device.</span>
        <span className="ml-3">
          <span className="font-bold text-blue-600">Disclaimer:</span>
        </span>
        <span className="ml-2">This is a simulator, not financial advice. Approximate inputs produce approximate outputs.</span>
      </p>
    </div>
  )
}
