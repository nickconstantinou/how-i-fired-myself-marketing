// Blog Page
import Link from 'next/link'

export const metadata = {
  title: 'Blog - How I FIREd Myself',
  description: 'SEO-optimized blog posts about retirement planning.',
}

const posts = [
  { title: "I Took 6 Weeks Off to Simulate Retirement—Here's What Happened", slug: 'simulate-retirement' },
  { title: "The 'Twinge of Regret' Every Retiree Feels", slug: 'twinge-of-regret' },
  { title: "My Spouse Isn't Ready to Retire—How Do We Navigate That?", slug: 'spouse-tempo' },
  { title: "The Fear Cocktail: Why You're Anxious AND Excited", slug: 'fear-cocktail' },
  { title: "What Do You DO All Day? A Retired Person's Answer", slug: 'what-do-you-do' },
  { title: "How to Ask for a Severance Package", slug: 'severance-package' },
  { title: "Why I'm Still Working at 65 (And That's Okay)", slug: 'working-at-65' },
  { title: "The First Year of Retirement: A Real Reckoning", slug: 'first-year-reckoning' },
  { title: "How Much Do You Actually Need to Retire?", slug: 'how-much-to-retire' },
  { title: "The Conversation You're Not Having With Your Spouse", slug: 'spouse-conversation' },
]

export default function Blog() {
  return (
    <main className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Blog</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-amber-400 hover:shadow-amber-100/50 transition-all duration-300 group"
            >
              <h2 className="text-xl font-semibold mb-2 text-slate-800 group-hover:text-amber-700 transition-colors">{post.title}</h2>
              <p className="text-slate-500 group-hover:text-slate-600 transition-colors">Read more →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
