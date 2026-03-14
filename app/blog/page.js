// Blog Page
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
    <main className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <a 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block p-6 border rounded-lg hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">Read more →</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
