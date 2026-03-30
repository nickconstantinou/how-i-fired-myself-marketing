// Supabase Edge Function — quiz-subscribe
// Handles Fear Quiz completion:
//  1. Validates request
//  2. Inserts into quiz_responses
//  3. Sends double opt-in confirmation email
//  4. Sends full Fear Profile results email
//  5. Upserts lead into newsletter_subscribers (unconfirmed)
//  6. Returns response UUID
//
// Secrets set via: supabase secrets set RESEND_API_KEY=... FROM_EMAIL=...

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

const VALID_ARCHETYPES = [
  'identity_hollow',
  'spouse_mismatch',
  'purpose_void',
  'financial_doubter',
]

const ARCHETYPE_DATA = {
  identity_hollow: {
    name: 'The Identity Hollow',
    quote: '"I\'m afraid I\'ll lose the person I was."',
    chapter: 'Chapter 5: Identity After the Title',
    chapterSummary: 'What belonging, rhythm and purpose look like after the function is gone.',
    recommendedAction: 'Take the Third Tuesday Test (Chapter 4) to separate the financial question from the identity question.',
  },
  spouse_mismatch: {
    name: 'The Spouse Mismatch',
    quote: '"We\'re not on the same page."',
    chapter: 'Chapter 3: The Spouse Conversation',
    chapterSummary: 'The framework most couples avoid for years until a date forces it.',
    recommendedAction: 'Don\'t read this chapter alone. Read it together.',
  },
  purpose_void: {
    name: 'The Purpose Void',
    quote: '"I\'m afraid there\'s nothing on the other side."',
    chapter: 'Chapter 6: Year One Month by Month',
    chapterSummary: 'Designing the first 12 months before Day One arrives.',
    recommendedAction: 'Design next year before it arrives. The fear subsides when there\'s a plan.',
  },
  financial_doubter: {
    name: 'The Financial Doubter',
    quote: '"The numbers probably work — I just don\'t believe them."',
    chapter: 'Chapter 2: The Fear That Doesn\'t Have a Name',
    chapterSummary: 'The fear audit that separates financial readiness from psychological readiness.',
    recommendedAction: 'The fear audit in this chapter will help you separate financial readiness from psychological readiness.',
  },
}

function buildConfirmationHtml(name: string, archetype: string, responseId: string, confirmUrl: string): string {
  const archetypeData = ARCHETYPE_DATA[archetype as keyof typeof ARCHETYPE_DATA]
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Confirm your subscription</title></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 20px; color: #1a1a2e;">
  <p style="color: #888; font-size: 14px;">The Anti-Retirement Guide</p>
  <h1 style="font-size: 28px; color: #1a1a2e; margin-bottom: 8px;">Hi ${name || 'there'},</h1>
  <p style="font-size: 18px; color: #333; line-height: 1.6;">
    You completed the Fear Profile Quiz — and your dominant archetype is
    <strong style="color: #b45309;">${archetypeData?.name || archetype}</strong>.
  </p>
  <p style="font-size: 16px; color: #555; line-height: 1.6;">
    Your full Fear Profile is on its way. But first, we need to confirm your email address.
  </p>
  <div style="text-align: center; margin: 36px 0;">
    <a href="${confirmUrl}" style="display: inline-block; background: #b45309; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
      Confirm my subscription
    </a>
  </div>
  <p style="font-size: 13px; color: #999;">
    If you didn't complete the Fear Profile Quiz, you can safely ignore this email.
  </p>
</body>
</html>`
}

function buildResultsHtml(name: string, archetype: string, scores: Record<string, number>): string {
  const archetypeData = ARCHETYPE_DATA[archetype as keyof typeof ARCHETYPE_DATA]
  if (!archetypeData) return '<p>Error loading results.</p>'

  const scoreLines = Object.entries(scores)
    .map(([key, val]) => {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      return `<li style="margin-bottom: 6px;"><strong>${label}:</strong> ${val}</li>`
    })
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Your Fear Profile</title></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 20px; color: #1a1a2e;">
  <p style="color: #888; font-size: 14px;">The Anti-Retirement Guide</p>
  <p style="font-size: 14px; color: #888;">Your Fear Profile</p>
  <h1 style="font-size: 32px; color: #1a1a2e; margin-bottom: 4px;">${archetypeData.name}</h1>
  <p style="font-size: 20px; color: #b45309; font-style: italic; margin-bottom: 32px;">${archetypeData.quote}</p>

  <h2 style="font-size: 18px; color: #1a1a2e; margin-bottom: 12px;">Your scores</h2>
  <ul style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 32px;">${scoreLines}</ul>

  <h2 style="font-size: 18px; color: #1a1a2e; margin-bottom: 12px;">Start here</h2>
  <div style="background: #fffbeb; border-left: 4px solid #b45309; padding: 16px 20px; margin-bottom: 32px;">
    <p style="font-size: 15px; color: #92400e; font-weight: bold; margin: 0 0 4px;">${archetypeData.chapter}</p>
    <p style="font-size: 14px; color: #a16207; margin: 0 0 12px;">${archetypeData.chapterSummary}</p>
    <p style="font-size: 14px; color: #713f12; margin: 0;">${archetypeData.recommendedAction}</p>
  </div>

  <div style="text-align: center; margin: 36px 0;">
    <a href="https://www.amazon.co.uk/dp/XXXXXXXXXX" style="display: inline-block; background: #b45309; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
      Get the book on Amazon
    </a>
  </div>
  <p style="font-size: 12px; color: #aaa; text-align: center;">
    The Anti-Retirement Guide — Available on Amazon UK
  </p>
</body>
</html>`
}

// ── Deno serve ────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS })
  }

  // Parse body
  let body: {
    email?: string
    name?: string
    archetype?: string
    fearScores?: Record<string, number>
    consentGiven?: boolean
  }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const { email, name, archetype, fearScores, consentGiven } = body

  // Validate
  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Valid email is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
  if (!archetype || !VALID_ARCHETYPES.includes(archetype)) {
    return new Response(JSON.stringify({ error: 'Valid archetype is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
  if (!fearScores || typeof fearScores !== 'object') {
    return new Response(JSON.stringify({ error: 'fearScores object is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
  if (!consentGiven) {
    return new Response(JSON.stringify({ error: 'Consent is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const resendKey   = Deno.env.get('RESEND_API_KEY')!
  const fromEmail   = Deno.env.get('FROM_EMAIL') || 'The Anti-Retirement Guide <noreply@theantiretirementguide.co.uk>'
  const baseUrl     = 'https://theantiretirementguide.co.uk'

  // ── Step 1: Insert into quiz_responses ─────────────────────────────────────
  let responseId: string
  try {
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/quiz_responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        email,
        archetype,
        fear_scores: fearScores,
        consent_given: consentGiven,
      }),
    })

    if (!insertRes.ok) {
      const errText = await insertRes.text()
      // Check for duplicate email — return existing ID
      if (insertRes.status === 409 || errText.includes('unique') || errText.includes('duplicate')) {
        // Fetch existing response by email
        const existingRes = await fetch(
          `${supabaseUrl}/rest/v1/quiz_responses?email=eq.${encodeURIComponent(email)}&select=id&limit=1`,
          { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } },
        )
        const existing = await existingRes.json()
        if (Array.isArray(existing) && existing.length > 0) {
          return new Response(JSON.stringify({ success: true, responseId: existing[0].id }), {
            headers: { ...CORS, 'Content-Type': 'application/json' },
          })
        }
      }
      throw new Error(`Insert failed (${insertRes.status}): ${errText}`)
    }

    const insertData = await insertRes.json()
    if (!Array.isArray(insertData) || insertData.length === 0) {
      throw new Error('No response ID returned from insert')
    }
    responseId = insertData[0].id
  } catch (err) {
    console.error('quiz-subscribe: insert error', err)
    return new Response(JSON.stringify({ error: 'Failed to save quiz response' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  // ── Step 2: Upsert into newsletter_subscribers (unconfirmed) ────────────────
  // This is a launch-list lead — confirmed=true only after double opt-in click
  try {
    const unsubToken = crypto.randomUUID() // not used in v1 but stored for future
    await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        email,
        fpl_team_id: 'quiz-leads',
        team_name: name || email.split('@')[0],
        confirmed: false, // double opt-in required
        opt_in: true,
        unsubscribe_token: unsubToken,
        source: 'quiz',
      }),
    })
  } catch (err) {
    console.error('quiz-subscribe: newsletter insert warning (non-fatal)', err)
    // Non-fatal — don't fail the request
  }

  // ── Step 3: Send double opt-in confirmation email ───────────────────────────
  const confirmUrl = `${baseUrl}/confirm-quiz?id=${encodeURIComponent(responseId)}`
  const confirmHtml = buildConfirmationHtml(name, archetype, responseId, confirmUrl)

  try {
    const confirmRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: 'Confirm your subscription — The Anti-Retirement Guide',
        html: confirmHtml,
      }),
    })
    if (!confirmRes.ok) {
      const err = await confirmRes.text()
      console.error('quiz-subscribe: confirmation email failed (non-fatal):', err)
    }
  } catch (err) {
    console.error('quiz-subscribe: confirmation email error (non-fatal)', err)
  }

  // ── Step 4: Send full Fear Profile results email (non-blocking) ─────────────
  // Fire and forget — don't block the response on email delivery
  const resultsHtml = buildResultsHtml(name, archetype, fearScores)
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: 'Your Fear Profile — The Anti-Retirement Guide',
      html: resultsHtml,
    }),
  }).catch((err) => console.error('quiz-subscribe: results email failed (non-fatal):', err))

  // ── Step 5: Return response ID to client ────────────────────────────────────
  return new Response(JSON.stringify({ success: true, responseId }), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})