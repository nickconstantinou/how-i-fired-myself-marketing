// Blog Page
import Link from 'next/link'
import { BLOG_INDEX } from '../lib/blogIndex'

const BASE_URL = 'https://nickconstantinou.github.io/the-anti-retirement-guide-marketing'

export const metadata = {
  title: 'Blog — The Anti-Retirement Guide',
  description: 'Reflections on retirement, identity, and designing your next chapter. For people in their 50s and 60s based in the UK.',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL + '/blog/',
    languages: {
      'en-GB': BASE_URL + '/blog/',
    },
  },
  openGraph: {
    title: 'Blog — The Anti-Retirement Guide',
    description: 'Reflections on retirement, identity, and designing your next chapter.',
    type: 'website',
    url: BASE_URL + '/blog/',
    locale: 'en_GB',
  },
}

export default function Blog() {
  return (
    <main className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-700 font-semibold mb-3">
          UK retirement essays
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">Blog</h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Essays, diagnostics, and decision frameworks for UK readers trying to think honestly about retirement before the date arrives.
        </p>
        
        {/* Author pull-quote from the book intro */}
        <blockquote className="border-l-4 border-amber-500 pl-6 py-5 mb-12 bg-amber-50 rounded-r-2xl shadow-sm">
          <p className="text-xl text-slate-700 italic leading-relaxed">
            &quot;I was sitting in my car in the office car park. Engine running. Air conditioning on. Not going in.&quot;
          </p>
          <footer className="mt-2 text-sm text-slate-500">
            — Nick Constantinou, <em>The Anti-Retirement Guide</em>
          </footer>
        </blockquote>
        
        <div className="grid gap-6 md:grid-cols-2">
          {BLOG_INDEX.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block p-6 sm:p-7 bg-white border border-stone-200 rounded-[24px] hover:shadow-lg hover:border-amber-400 hover:shadow-amber-100/50 transition-all duration-300 group"
            >
              <h2 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-amber-700 transition-colors leading-snug">{post.title}</h2>
              <p className="text-slate-500 text-sm sm:text-[15px] leading-7 mb-4 group-hover:text-slate-600 transition-colors">{post.hook}</p>
              <p className="text-amber-600 font-medium group-hover:text-amber-700 transition-colors">Read more →</p>
            </Link>
          ))}
        </div>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL + "/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": BASE_URL + "/blog/"
              }
            ]
          })
        }}
      />
    </main>
  )
}
