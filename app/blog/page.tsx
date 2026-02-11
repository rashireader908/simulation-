import { Card } from '../../components/ui/Card'
import Link from 'next/link'

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'Getting Started with Financial Planning',
      excerpt: 'Learn the basics of using Money Sandbox to plan your financial future and make informed decisions.',
      date: '2024-01-15',
      category: 'Getting Started',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Understanding Cash Flow Simulation',
      excerpt: 'Discover how cash flow simulation can help you identify potential financial challenges before they happen.',
      date: '2024-01-10',
      category: 'Tutorials',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Creating Effective Financial Scenarios',
      excerpt: 'Tips and tricks for creating meaningful "what-if" scenarios that help you make better financial decisions.',
      date: '2024-01-05',
      category: 'Tips & Tricks',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Privacy in Financial Tools: Why It Matters',
      excerpt: 'Understanding the importance of keeping your financial data private and how Money Sandbox protects you.',
      date: '2024-01-01',
      category: 'Privacy',
      readTime: '4 min read',
    },
  ]

  const categories = ['All', 'Getting Started', 'Tutorials', 'Tips & Tricks', 'Privacy', 'Updates']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Blog & News</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Stay updated with tips, tutorials, and insights about financial planning
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-xl transition-shadow cursor-pointer">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-600 border-t-2 border-gray-200 pt-4">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>{post.readTime}</span>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 text-lg">
            We regularly publish new articles about financial planning, tips, and updates. 
            Check back often for the latest content!
          </p>
          <p className="text-blue-200 text-sm">
            Have a topic you'd like us to cover?{' '}
            <Link href="/contact" className="underline hover:text-white">
              Let us know
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
