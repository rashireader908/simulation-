'use client'

import { useState } from 'react'
import { Card } from '../../components/ui/Card'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const faqs: FAQItem[] = [
    {
      category: 'Getting Started',
      question: 'How do I get started with simnace?',
      answer: 'Getting started is easy! Simply navigate to the Inputs page and enter your financial information: monthly income, starting cash buffer, monthly flexible spending, and simulation period. Then click Save to create your baseline scenario. You can then add bills and subscriptions, and run your first simulation.',
    },
    {
      category: 'Getting Started',
      question: 'Do I need to create an account?',
      answer: 'No! simnace is completely free and requires no account creation. All your data is stored locally on your device using your browser\'s localStorage. Just start using the app immediately.',
    },
    {
      category: 'Getting Started',
      question: 'Is simnace really free?',
      answer: 'Yes, simnace is completely free with no hidden fees, subscriptions, or premium features. All functionality is available to all users at no cost.',
    },
    {
      category: 'Data & Privacy',
      question: 'Where is my data stored?',
      answer: 'All your data is stored locally on your device using your browser\'s localStorage. Nothing is sent to any external servers. Your financial information never leaves your device.',
    },
    {
      category: 'Data & Privacy',
      question: 'Can I export my data?',
      answer: 'Yes! You can export all your data as a JSON file from the Results page. This allows you to create backups or transfer your data to another device. You can also import previously exported data.',
    },
    {
      category: 'Data & Privacy',
      question: 'What happens if I clear my browser data?',
      answer: 'If you clear your browser\'s localStorage, your simnace data will be deleted. We recommend regularly exporting your data as a backup. You can do this from the Results page or the Dashboard.',
    },
    {
      category: 'Features',
      question: 'How many scenarios can I create?',
      answer: 'You can create unlimited scenarios! Start with a baseline scenario, then duplicate it to create "what if" scenarios. Compare different scenarios side by side to see how different decisions affect your cash flow.',
    },
    {
      category: 'Features',
      question: 'Can I cancel or pause subscriptions?',
      answer: 'Yes! You can cancel subscriptions (which stops charging from the next month) or pause them for specific months. This allows you to simulate different subscription management strategies.',
    },
    {
      category: 'Features',
      question: 'What is the maximum simulation period?',
      answer: 'You can simulate your cash flow for up to 6 months. This gives you a good view of your short to medium-term financial situation.',
    },
    {
      category: 'Features',
      question: 'How accurate are the simulations?',
      answer: 'The simulations use a deterministic day by day cash flow model. They provide approximations based on your inputs. Remember, simnace is a planning tool, not financial advice. Real world results may vary based on many factors.',
    },
    {
      category: 'Troubleshooting',
      question: 'My data disappeared. What should I do?',
      answer: 'If your data disappeared, it may have been cleared from your browser. Check if you have an exported backup file. If so, you can import it. If not, you\'ll need to re-enter your data. We recommend exporting your data regularly as a backup.',
    },
    {
      category: 'Troubleshooting',
      question: 'The simulation isn\'t showing what I expected. Why?',
      answer: 'Double-check your inputs, especially bill due dates and subscription charge days. Make sure all amounts are entered correctly. The simulation processes transactions day by day, so the timing of income and expenses matters.',
    },
    {
      category: 'General',
      question: 'Is simnace financial advice?',
      answer: 'No. simnace is a financial simulation and planning tool, not financial advice. The results are simulations based on your inputs and should be used for planning purposes only. For professional financial advice, please consult a qualified financial advisor.',
    },
    {
      category: 'General',
      question: 'Can I use simnace on mobile devices?',
      answer: 'Yes! simnace works in any modern web browser on desktop, tablet, or mobile devices. However, for the best experience, we recommend using a desktop or tablet with a larger screen.',
    },
    {
      category: 'General',
      question: 'How do I report a bug or suggest a feature?',
      answer: 'We\'d love to hear from you! Visit our Contact page and send us a message with your bug report or feature suggestion. We appreciate all feedback!',
    },
  ]

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about simnace
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setOpenIndex(0)
                }}
                className={`px-4 py-2 rounded-lg border-2 transition-colors font-medium ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-200 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {filteredFAQs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <svg
                  className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 border-t-2 border-gray-200 pt-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-2 border-blue-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-700 mb-6">
              Can't find the answer you're looking for? We're here to help!
            </p>
            <a href="/contact" className="inline-block">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Contact Us
              </button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}
