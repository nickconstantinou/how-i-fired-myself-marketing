'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// ── Archetype data ─────────────────────────────────────────────────────────────

const ARCHETYPES = {
  identity_hollow: {
    name: 'The Identity Hollow',
    quote: '"I\'m afraid I\'ll lose the person I was."',
    bullets: [
      'Your identity is deeply tied to what you do — not just what you earn.',
      'The title goes first. Then the daily rhythm. Then the sense of being needed.',
      'Most people in your position feel this one most honestly — and most silently.',
    ],
    chapter: 'Chapter 5: Identity After the Title',
    chapterSummary: 'What belonging, rhythm and purpose look like after the function is gone.',
  },
  spouse_mismatch: {
    name: 'The Spouse Mismatch',
    quote: '"We\'re not on the same page."',
    bullets: [
      'You\'ve probably had the money conversation. You haven\'t had the real one.',
      'Most couples are on different timelines and have never said it out loud.',
      'Reading this chapter alone is a mistake. Read it together.',
    ],
    chapter: 'Chapter 3: The Spouse Conversation',
    chapterSummary: 'The framework most couples avoid for years until a date forces it.',
  },
  purpose_void: {
    name: 'The Purpose Void',
    quote: '"I\'m afraid there\'s nothing on the other side."',
    bullets: [
      'You\'re not worried about money. You\'re not worried about identity.',
      'You\'re worried that when the structure of work disappears, so does your reason to get up.',
      'This is the fear nobody talks about honestly.',
    ],
    chapter: 'Chapter 6: Year One Month by Month',
    chapterSummary: 'Designing the first 12 months before Day One arrives.',
  },
  financial_doubter: {
    name: 'The Financial Doubter',
    quote: '"The numbers probably work — I just don\'t believe them."',
    bullets: [
      'You\'ve run the numbers six times. They say you\'re ready.',
      'But some part of you doesn\'t trust the spreadsheet.',
      'If the numbers work and you still can\'t decide, the problem isn\'t the money.',
    ],
    chapter: 'Chapter 2: The Fear That Doesn\'t Have a Name',
    chapterSummary: 'The fear audit that separates financial readiness from psychological readiness.',
  },
}

// ── Supabase fetch ─────────────────────────────────────────────────────────────

/**
 * Fetches quiz result from Supabase by quiz_responses UUID.
 * Returns null on failure — results page handles gracefully.
 * @param {string} id
 * @returns {Promise<{archetype: string, scores: object}|null>}
 */
async function fetchResult(id) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const res = await fetch(
      `${supabaseUrl}/rest/v1/quiz_responses?id=eq.${encodeURIComponent(id)}&select=id,archetype,fear_scores,created_at&limit=1`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        cache: 'no-store',
      },
    )

    if (!res.ok) return null
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return null
    const row = data[0]
    return {
      archetype: row.archetype,
      scores: row.fear_scores,
    }
  } catch {
    return null
  }
}

// ── Copy link button ───────────────────────────────────────────────────────────

function CopyLinkButton({ id }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const url = `${window.location.origin}/fear-quiz/results?id=${encodeURIComponent(id)}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition"
    >
      {copied ? (
        <>
          <span>✓</span> Copied
        </>
      ) : (
        <>
          <span>🔗</span> Share my results
        </>
      )}
    </button>
  )
}

// ── Loading skeleton ────────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 space-y-6 animate-pulse">
      <div className="h-8 bg-slate-800 rounded w-2/3" />
      <div className="h-4 bg-slate-800 rounded w-1/3" />
      <div className="space-y-3">
        <div className="h-4 bg-slate-800 rounded" />
        <div className="h-4 bg-slate-800 rounded" />
        <div className="h-4 bg-slate-800 rounded w-5/6" />
      </div>
    </div>
  )
}

// ── Results page ────────────────────────────────────────────────────────────────

function FearQuizResultsPage() {
  const searchParams = useSearchParams()
  const responseId   = searchParams.get('id')

  const [result, setResult]     = useState(/** @type {object|null} */ (null))
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!responseId) {
      setLoading(false)
      setNotFound(true)
      return
    }

    // Retry with exponential backoff to handle Supabase replica lag (typically 0–2s)
    const MAX_RETRIES = 4
    const delays = [500, 1000, 2000, 3000]

    let cancelled = false

    const attempt = (retryCount) => {
      if (cancelled) return
      fetchResult(responseId).then((data) => {
        if (cancelled) return
        if (data) {
          setResult(data)
          setLoading(false)
        } else if (retryCount < MAX_RETRIES) {
          setTimeout(() => attempt(retryCount + 1), delays[retryCount - 1] ?? 2000)
        } else {
          setNotFound(true)
          setLoading(false)
        }
      })
    }

    attempt(1)
    return () => { cancelled = true }
  }, [responseId])

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-center">
        <LoadingSkeleton />
      </main>
    )
  }

  // No ID in URL
  if (!responseId || notFound) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-white mb-4">No results found</h1>
          <p className="text-slate-400 mb-8">
            We couldn&apos;t find your results. Please complete the quiz to get your Fear Profile.
          </p>
          <a
            href="/fear-quiz"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-xl transition"
          >
            Take the Quiz
          </a>
        </div>
      </main>
    )
  }

  const archetypeKey = result.archetype
  const archetype    = ARCHETYPES[archetypeKey] || ARCHETYPES.purpose_void

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Header */}
      <div className="w-full border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-slate-400 text-sm font-medium">Your Fear Profile</span>
          <CopyLinkButton id={responseId} />
        </div>
      </div>

      {/* Results content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto px-4 py-12 w-full">

          {/* Archetype name */}
          <div className="text-center mb-10">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Your dominant fear archetype
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {archetype.name}
            </h1>
            <p className="text-slate-400 italic text-lg">
              {archetype.quote}
            </p>
          </div>

          {/* Bullets */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 sm:p-8 mb-8">
            <ul className="space-y-4">
              {archetype.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                  <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended chapter */}
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6 mb-8">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Start here
            </p>
            <p className="text-white font-semibold text-lg mb-1">
              {archetype.chapter}
            </p>
            <p className="text-slate-400 text-sm">
              {archetype.chapterSummary}
            </p>
          </div>

          {/* Launch status */}
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6 mb-6 text-center">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Launch list — half price
            </p>
            <p className="text-white font-semibold text-lg mb-1">
              You&apos;re already on the list
            </p>
            <p className="text-slate-400 text-sm mb-4">
              Your quiz signup already added you to the launch list, so you&apos;ll get your Fear Profile by email and hear first when the book goes live at the launch discount.
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 mb-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Want a clearer read?</h2>
            <p className="text-slate-300 text-sm sm:text-base mb-4">
              The Third Tuesday Test is 10 questions designed to separate the financial question from the identity question. Print it. Fill it in. It takes 10 minutes.
            </p>
            <a
              href="/thank-you?guide=third-tuesday-test"
              className="inline-block bg-amber-500 text-slate-900 px-5 py-3 rounded-xl font-semibold hover:bg-amber-400 transition"
            >
              Download the Third Tuesday Test — Free →
            </a>
          </div>

          {/* Retake quiz */}
          <div className="text-center mt-8">
            <a href="/fear-quiz" className="text-slate-500 hover:text-slate-300 text-sm transition">
              Retake the quiz
            </a>
          </div>

        </div>
      </div>
    </main>
  )
}

// Next.js 15: useSearchParams() requires Suspense boundary
function LoadingFallback() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-center">
      <div className="max-w-xl mx-auto px-4 py-16 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-2/3" />
        <div className="h-4 bg-slate-800 rounded w-1/3" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    </main>
  )
}

export default function FearQuizResults() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FearQuizResultsPage />
    </Suspense>
  )
}
