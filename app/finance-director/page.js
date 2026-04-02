'use client'

import { useState } from 'react'
import { subscribeLead } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function FinanceDirector() {
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

    const result = await subscribeLead(name, email, 'finance-director')

    setLoading(false)

    if (result.success) {
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('email_signup', { email, source: 'finance-director' })
      }
      router.push('/thank-you?guide=finance-director')
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  return (
    <main className="hero py-16 text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">The Finance Director&apos;s Exit Checklist</h1>
        <p className="text-lg sm:text-xl text-slate-300 text-center mb-2">When the Numbers Are Fine and the Problem Is Something Else</p>
        <p className="text-base text-slate-400 text-center mb-8">Free. No commitment.</p>

        <div className="bg-white text-slate-900 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">What&apos;s inside</h2>
          <p className="text-slate-600 mb-6 text-sm">
            This checklist is for the point where the spreadsheet says one thing, but the decision still will not settle. It covers the tax mechanics, sequencing choices, and harder human question underneath them.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'The Lump Sum Allowance (£268,275): what counts, what\'s left, what to do next',
              'Drawdown sequencing: ISA, pension, property — the order that minimises tax',
              'IHT and pension assets post-2027: what the current proposal actually means',
              'NED roles and income in retirement: the line between staying useful and drifting back',
              'The honest question: can you afford — emotionally — to leave mid-restructure?',
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
