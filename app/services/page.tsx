import { Card } from '../../components/ui/Card'
import Link from 'next/link'
import { Button } from '../../components/ui/Button'

export default function ServicesPage() {
  const services = [
    {
      title: 'Cash Flow Simulation',
      icon: '',
      description: 'Simulate your cash flow over 1-6 months to see how your financial decisions impact your balance.',
      features: [
        'Day-by-day cash flow tracking',
        'Visual balance trends',
        'Identify tight months',
        'Minimum balance alerts',
      ],
    },
    {
      title: 'Scenario Comparison',
      icon: '',
      description: 'Create multiple "what-if" scenarios and compare them side-by-side to make informed decisions.',
      features: [
        'Unlimited scenarios',
        'Side-by-side comparison',
        'Visual scenario differences',
        'Save and revisit scenarios',
      ],
    },
    {
      title: 'Bills Management',
      icon: '',
      description: 'Track your fixed monthly bills with due dates and see how they affect your cash flow.',
      features: [
        'Add/edit/remove bills',
        'Set due dates (1-28)',
        'Track monthly expenses',
        'Visual spending breakdown',
      ],
    },
    {
      title: 'Subscription Tracking',
      icon: '',
      description: 'Manage your recurring subscriptions with options to cancel or pause for specific months.',
      features: [
        'Track all subscriptions',
        'Cancel subscriptions',
        'Pause for specific months',
        'See impact on cash flow',
      ],
    },
    {
      title: 'Visual Analytics',
      icon: '',
      description: 'Interactive charts and graphs help you visualize your financial situation and trends.',
      features: [
        'Cash flow charts',
        'Monthly breakdowns',
        'Spending category analysis',
        'Transaction timeline',
      ],
    },
    {
      title: 'Data Privacy',
      icon: '',
      description: 'All your data stays on your device. No cloud storage, no external servers, complete privacy.',
      features: [
        '100% local storage',
        'No account required',
        'Export/import data',
        'Complete control',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Our Services</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Everything you need to plan, simulate, and visualize your financial future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              All our services are available for free. No sign-up required, no hidden fees.
            </p>
            <Link href="/">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Start Using Money Sandbox
              </Button>
            </Link>
          </div>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div>
                  <strong>Instant Access:</strong> Start using immediately, no registration needed
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div>
                  <strong>Completely Free:</strong> All features available at no cost
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div>
                  <strong>Privacy Guaranteed:</strong> Your data never leaves your device
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div>
                  <strong>Works Everywhere:</strong> Runs in any modern web browser
                </div>
              </li>
            </ul>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <strong>Enter Your Financial Data:</strong> Income, expenses, bills, and subscriptions
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <strong>Run Simulations:</strong> See how your cash flow looks over time
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <strong>Compare Scenarios:</strong> Test different "what-if" situations
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  4
                </span>
                <div>
                  <strong>Make Informed Decisions:</strong> Use insights to plan your financial future
                </div>
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  )
}
