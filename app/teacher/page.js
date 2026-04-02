'use client'

import { useState } from 'react'
import { subscribeLead } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Teacher() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const name = formData.get('name')

    const result = await subscribeLead(name, email, 'teacher')

    setLoading(false)

    if (result.success) {
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('email_signup', { email, source: 'teacher' })
      }
      router.push('/thank-you?guide=teacher')
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  return (
    <main className="hero py-16 text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">The Teacher&apos;s Guide to the Final Bell</h1>
        <p className="text-lg sm:text-xl text-slate-300 text-center mb-2">What to Think About Before You Leave the Classroom</p>
        <p className="text-base text-slate-400 text-center mb-8">Free. No commitment.</p>

        <div className="bg-white text-slate-900 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">What&apos;s inside</h2>
          <p className="text-slate-600 mb-6 text-sm">
            Leaving teaching is rarely just a pension date. This guide pulls together the decisions, timing, and identity questions that sit under the surface of the final term.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Final Salary vs Career Average: which section applies to you and what it means',
              'Normal Pension Age changes: check yours before you commit to a date',
              'AVCs and lump sum: the decision most teachers get wrong',
              'The rhythm of the school year — and what replaces it',
              'Identity after the classroom: who you are when September no longer means something',
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="name" id="name" required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" id="email" required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Me the Free Guide'}
            </button>
            <p className="text-sm text-slate-500 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
