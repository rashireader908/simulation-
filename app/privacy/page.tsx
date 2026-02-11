import { Card } from '../../components/ui/Card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Money Sandbox ("we", "our", or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we handle your data when you use our application.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Important:</strong> Money Sandbox is a local-only application. All your 
            data is stored exclusively on your device and never transmitted to any external 
            servers or third parties.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collection and Storage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Storage Only</h3>
              <p className="text-gray-700 leading-relaxed">
                All data you enter into Money Sandbox is stored locally on your device using 
                your browser's localStorage. This includes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 ml-4">
                <li>Financial inputs (income, expenses, bills, subscriptions)</li>
                <li>Scenarios and simulation data</li>
                <li>User preferences and settings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Transmission</h3>
              <p className="text-gray-700 leading-relaxed">
                We do not collect, transmit, or store any of your data on external servers. 
                Your financial information never leaves your device.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Account Required</h3>
              <p className="text-gray-700 leading-relaxed">
                Money Sandbox does not require you to create an account or provide any 
                personal information such as email addresses, names, or phone numbers.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Money Sandbox does not use any third-party analytics, tracking, or advertising services. 
            We do not integrate with any external APIs that would transmit your data.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The application runs entirely in your browser using open-source technologies. 
            You can verify this by checking the Network tab in your browser's developer tools— 
            you'll see no external requests being made.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <div className="space-y-3 text-gray-700">
            <p className="leading-relaxed">
              Since all data is stored locally on your device:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your data is protected by your device's security measures</li>
              <li>We cannot access your data even if we wanted to</li>
              <li>You have complete control over your data at all times</li>
              <li>You can export or delete your data whenever you choose</li>
            </ul>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Export and Deletion</h2>
          <div className="space-y-3 text-gray-700">
            <p className="leading-relaxed">
              You have full control over your data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Export:</strong> You can export all your data as a JSON file at any time</li>
              <li><strong>Delete:</strong> You can clear all data using the "Clear All Data" feature</li>
              <li><strong>Backup:</strong> You can create backups by exporting your data regularly</li>
            </ul>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed">
            Money Sandbox does not use cookies for tracking purposes. We do not use any 
            cookies, web beacons, or similar tracking technologies.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Money Sandbox does not knowingly collect any information from children under 
            the age of 13. Since we don't collect any data at all, this is not applicable, 
            but we want to make it clear that our application is safe for users of all ages.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted 
            on this page with an updated "Last updated" date. Since we don't collect any 
            data, changes to this policy are unlikely to affect how we handle your information.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us through 
            our <a href="/contact" className="text-blue-600 hover:underline">Contact page</a>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Remember:</strong> Your privacy is our priority. Money Sandbox is designed 
            from the ground up to respect and protect your privacy by keeping all your data 
            local to your device.
          </p>
        </Card>
      </div>
    </div>
  )
}
