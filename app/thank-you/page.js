// Thank You Page
import Link from 'next/link'

export const metadata = {
  title: 'Thank You - How I Escaped',
  description: 'Thank you for signing up!',
}

export default function ThankYou() {
  return (
    <main className="py-16 bg-emerald-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Thank You!</h1>
        <p className="text-xl mb-4">Check your email for the Free 30-Day Retirement Jumpstart Guide.</p>
        
        {/* Download Button - Direct PDF download */}
        <div className="mb-8">
          <a 
            href="/jumpstart-guide.pdf"
            download
            className="inline-block bg-emerald-600 text-white text-2xl px-8 py-4 rounded-xl font-bold hover:bg-emerald-500 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            📥 Download Free Guide (PDF)
          </a>
        </div>
        
        <p className="text-lg">In the meantime, explore the blog for more retirement insights.</p>
        <Link 
          href="/blog" 
          className="inline-block bg-amber-500 text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-400 transition mt-4"
        >
          Browse Blog Posts
        </Link>
      </div>
    </main>
  )
}
