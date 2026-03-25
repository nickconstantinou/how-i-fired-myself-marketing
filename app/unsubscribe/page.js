'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { unsubscribeLead } from '../../lib/supabase'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [status, setStatus] = useState('pending') // pending | done | error

  useEffect(() => {
    if (!email) {
      setStatus('error')
      return
    }
    unsubscribeLead(email).then((result) => {
      setStatus(result.success ? 'done' : 'error')
    })
  }, [email])

  return (
    <main className="py-16 section-alt">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {status === 'pending' && (
          <>
            <h1 className="text-4xl font-bold mb-4">Unsubscribing...</h1>
            <p className="text-slate-600">Just a moment.</p>
          </>
        )}
        {status === 'done' && (
          <>
            <h1 className="text-4xl font-bold mb-4">You&apos;re unsubscribed</h1>
            <p className="text-slate-600">
              {email ? `${email} has been removed from the list.` : 'You have been removed from the list.'}
            </p>
            <p className="text-slate-500 text-sm mt-4">
              If you have any questions, reply to any email or contact{' '}
              <a href="mailto:hello@theantiretirementguide.co.uk" className="underline">
                hello@theantiretirementguide.co.uk
              </a>
              .
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-slate-600">
              We couldn&apos;t process your request. Please email{' '}
              <a href="mailto:hello@theantiretirementguide.co.uk" className="underline">
                hello@theantiretirementguide.co.uk
              </a>{' '}
              and we&apos;ll remove you manually.
            </p>
          </>
        )}
      </div>
    </main>
  )
}

export default function Unsubscribe() {
  return (
    <Suspense fallback={
      <main className="py-16 section-alt">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Unsubscribing...</h1>
        </div>
      </main>
    }>
      <UnsubscribeContent />
    </Suspense>
  )
}
