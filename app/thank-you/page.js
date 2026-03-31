'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const GUIDES = {
  'cluster-a': { file: '/spouse-conversation-guide.pdf', label: 'Download The Spouse Conversation Guide (PDF)' },
  'cluster-b': { file: '/loneliness-after-work.pdf', label: 'Download Loneliness After Work (PDF)' },
  'cluster-c': { file: '/what-i-actually-want.pdf', label: 'Download What I Actually Want (PDF)' },
  launch: { file: null, label: 'Launch List' },
  default: { file: '/jumpstart-guide.pdf', label: 'Download the Guide (PDF)' },
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const guide = searchParams.get('guide') || 'default'
  const guideData = GUIDES[guide] ?? GUIDES.default
  const { file, label } = guideData
  const isLaunch = guide === 'launch'

  return (
    <main className="py-16 section-alt">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Check your email</h1>
        {isLaunch ? (
          <p className="text-xl mb-4 text-slate-700">You're on the list. We'll email you the moment pre-orders open — at the launch discount.</p>
        ) : (
          <>
            <p className="text-xl mb-4 text-slate-700">Your guide is on its way.</p>
            <div className="mb-8 mt-8">
              <a
                href={file}
                download
                className="inline-block bg-amber-500 text-slate-900 text-xl px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition shadow-md"
              >
                {label}
              </a>
            </div>
          </>
        )}
        <p className="text-slate-500 text-sm">If the email doesn&apos;t arrive within a few minutes, check your spam folder.</p>
      </div>
    </main>
  )
}

export default function ThankYou() {
  return (
    <Suspense fallback={
      <main className="py-16 section-alt">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Check your email</h1>
        </div>
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
