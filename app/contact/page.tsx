'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const [iconHover, setIconHover] = useState(false)
  const email = 'help.savecatcher@gmail.com'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="text-center w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mx-auto border border-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="mb-6">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 transition-all duration-300 cursor-pointer hover:bg-blue-200 hover:scale-110"
              onMouseEnter={() => setIconHover(true)}
              onMouseLeave={() => setIconHover(false)}
            >
              <svg 
                className={`w-8 h-8 text-blue-600 transition-transform duration-300 ${iconHover ? 'rotate-12 scale-110' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            style={{
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            Contact Us
          </h1>
          <p className="text-gray-600 mb-8">Get in touch with us</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-3 text-xl md:text-2xl font-semibold text-blue-600 hover:text-blue-700 transition-all duration-200 group"
              >
                <svg 
                  className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="group-hover:underline">{email}</span>
              </a>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Send Email</span>
              </a>
            </div>

            {copied && (
              <div 
                className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300"
                style={{
                  animation: 'fadeIn 0.5s ease-out',
                }}
              >
                <p className="text-sm font-medium">✓ Email copied to clipboard!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  )
}
