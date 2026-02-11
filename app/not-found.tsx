import Link from 'next/link'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-12">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-700 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4 mb-8">
            <p className="text-gray-600">
              Here are some helpful links to get you back on track:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <Button>Go to Homepage</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary">About Us</Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary">Services</Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary">Contact</Button>
              </Link>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-600">
              If you believe this is an error, please{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">
                contact us
              </Link>
              {' '}and let us know what happened.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
