import { Card } from '../../components/ui/Card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using simnace ("the Application"), you accept and agree 
            to be bound by the terms and provision of this agreement.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
          <div className="space-y-3 text-gray-700">
            <p className="leading-relaxed">
              Permission is granted to temporarily use simnace for personal, 
              non-commercial use only. This is the grant of a license, not a transfer of title, 
              and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials for commercial purposes</li>
              <li>Attempt to reverse engineer or decompile the application</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <p className="text-gray-900 font-semibold mb-2">Important Disclaimer</p>
              <p className="text-gray-700 leading-relaxed">
                simnace is a financial simulation tool, not financial advice. The 
                application is provided for informational and planning purposes only. 
                The results and insights provided by the application are simulations and 
                approximations and should not be considered as professional financial advice.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The materials on simnace are provided on an 'as is' basis. We make no 
              warranties, expressed or implied, and hereby disclaim and negate all other 
              warranties including, without limitation, implied warranties or conditions of 
              merchantability, fitness for a particular purpose, or non-infringement of 
              intellectual property or other violation of rights.
            </p>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In no event shall simnace or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit, or due to
            business interruption) arising out of the use or inability to use the materials
            on simnace, even if simnace or a simnace authorized
            representative has been notified orally or in writing of the possibility of such damage.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Because some jurisdictions do not allow limitations on implied warranties, or 
            limitations of liability for consequential or incidental damages, these limitations 
            may not apply to you.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
          <p className="text-gray-700 leading-relaxed">
            The materials appearing on simnace could include technical, typographical, 
            or photographic errors. We do not warrant that any of the materials on the 
            application are accurate, complete, or current. We may make changes to the 
            materials contained on the application at any time without notice. However, 
            we do not make any commitment to update the materials.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Responsibility</h2>
          <div className="space-y-3 text-gray-700">
            <p className="leading-relaxed">
              Since simnace stores all data locally on your device:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You are responsible for backing up your data</li>
              <li>We are not responsible for data loss due to browser clearing, device issues, or user error</li>
              <li>You can export your data at any time to create backups</li>
              <li>We recommend regularly exporting your data to prevent loss</li>
            </ul>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
          <p className="text-gray-700 leading-relaxed">
            simnace has not reviewed all of the sites linked to the application and
            is not responsible for the contents of any such linked site. The inclusion of
            any link does not imply endorsement by simnace of the site. Use of any
            such linked website is at the user's own risk.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
          <p className="text-gray-700 leading-relaxed">
            simnace may revise these terms of service for its application at any time 
            without notice. By using this application you are agreeing to be bound by the 
            then current version of these terms of service.
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the 
            laws and you irrevocably submit to the exclusive jurisdiction of the courts in 
            that location.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms & Conditions, please contact us 
            through our <a href="/contact" className="text-blue-600 hover:underline">Contact page</a>.
          </p>
        </Card>
      </div>
    </div>
  )
}
