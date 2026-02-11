import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation, Footer } from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'simnace - Financial Decision Simulator',
  description: 'A local-only financial decision simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-yellow-400 text-yellow-900 text-center py-2 px-4 font-bold text-sm">
          WIP
        </div>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
