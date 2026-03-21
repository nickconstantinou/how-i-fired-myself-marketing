'use client'

import { useState } from 'react'
import { subscribeLead } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Jumpstart() {
  const [submitted, setSubmitted] = useState(false)
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
    
    const result = await subscribeLead(name, email)
    
    setLoading(false)
    
    if (result.success) {
      // Redirect to thank you page
      router.push('/thank-you')
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  // Show inline thank you message only when still on this page (fallback)
  if (submitted) {
    return (
      <main className="py-16 bg-emerald-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-slate-900">Check Your Email!</h1>
          <p className="text-xl text-slate-700">The Free 30-Day Retirement Jumpstart Guide is on its way.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="py-16 bg-emerald-900 text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Free 30-Day Retirement Jumpstart Guide</h1>
        <p className="text-lg sm:text-xl text-emerald-100 text-center mb-8">Get clear. Get prepared. Get launched.</p>
        
        <div className="bg-white text-slate-900 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">What's Inside:</h2>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
              <span><strong>Week 1:</strong> Clarify Your Vision</span>
            </li>
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
              <span><strong>Week 2:</strong> Have the Conversations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
              <span><strong>Week 3:</strong> Stress-Test Your Numbers</span>
            </li>
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
              <span><strong>Week 4:</strong> Design Year One</span>
            </li>
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
              className="w-full bg-amber-500 text-emerald-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition disabled:opacity-50">
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
