// Jumpstart Lead Magnet Page
'use client'

import { useState } from 'react'

export const metadata = {
  title: 'Free 30-Day Retirement Jumpstart Guide',
  description: 'Get clear. Get prepared. Get launched.',
}

export default function Jumpstart() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const name = formData.get('name')
    
    // TODO: Connect to Supabase
    console.log('Submit:', { name, email })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen py-16 bg-emerald-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Check Your Email!</h1>
          <p className="text-xl">The Free 30-Day Retirement Jumpstart Guide is on its way.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 bg-emerald-900 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Free 30-Day Retirement Jumpstart Guide</h1>
        <p className="text-xl text-emerald-100 text-center mb-8">Get clear. Get prepared. Get launched.</p>
        
        <div className="bg-white text-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">What's Inside:</h2>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
              <span><strong>Week 1:</strong> Clarify Your Vision</span>
            </li>
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
              <span><strong>Week 2:</strong> Have the Conversations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
              <span><strong>Week 3:</strong> Stress-Test Your Numbers</span>
            </li>
            <li className="flex items-start">
              <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
              <span><strong>Week 4:</strong> Design Year One</span>
            </li>
          </ul>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="name" id="name" required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" id="email" required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button type="submit" 
              className="w-full bg-amber-500 text-emerald-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition">
              Send Me the Free Guide
            </button>
            <p className="text-sm text-gray-500 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
