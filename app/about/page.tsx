import { Card } from '../../components/ui/Card'
import Link from 'next/link'
import { Button } from '../../components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">About Money Sandbox</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Empowering you to make better financial decisions through simulation and visualization
          </p>
        </div>

        <Card className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Money Sandbox was created to give you complete control over your financial planning. 
            We believe that everyone deserves access to powerful financial simulation tools without 
            compromising their privacy or security.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to provide a safe, local-only platform where you can experiment with 
            different financial scenarios, understand the impact of your decisions, and plan for 
            your future—all while keeping your data completely private and secure on your own device.
          </p>
        </Card>

        <Card className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-700 text-sm">
                All your data stays on your device. No servers, no tracking, no compromises.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Simplicity</h3>
              <p className="text-gray-700 text-sm">
                Complex financial planning made simple and accessible to everyone.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-700 text-sm">
                Clear visualizations help you understand your financial situation at a glance.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">100% Local</h3>
                <p className="text-gray-700">
                  Everything runs in your browser. No cloud storage, no external servers, no data transmission.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">No Account Required</h3>
                <p className="text-gray-700">
                  Start using Money Sandbox immediately. No sign-ups, no emails, no passwords to remember.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Scenario Comparison</h3>
                <p className="text-gray-700">
                  Create multiple "what-if" scenarios and compare them side-by-side to make informed decisions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Visual Analytics</h3>
                <p className="text-gray-700">
                  Interactive charts and graphs help you visualize your cash flow and understand trends.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started</h2>
          <p className="text-gray-700 mb-6">
            Ready to take control of your financial planning? Start by setting up your financial inputs 
            and running your first simulation.
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Button className="px-6 py-3">Go to Dashboard</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" className="px-6 py-3">Contact Us</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
