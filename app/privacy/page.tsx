import { Card } from '../../components/ui/Card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collection</h2>
          <p className="text-gray-700 leading-relaxed">
            We collect analytics. Nothing more.
          </p>
        </Card>
      </div>
    </div>
  )
}
