// Supabase Edge Function — subscribe-lead
// Called by the browser; sends welcome email via Resend and saves to Supabase.
// Secrets set via: supabase secrets set RESEND_API_KEY=... FROM_EMAIL=...

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

const BASE_URL = 'https://theantiretirementguide.co.uk'

const GUIDES: Record<string, { pdf: string; subject: (name: string) => string; title: string; desc: string }> = {
  'cluster-a': {
    pdf: `${BASE_URL}/spouse-conversation-guide.pdf`,
    subject: (n) => `Your Spouse Conversation Guide is here, ${n}`,
    title: 'The Spouse Conversation Guide',
    desc: 'Five questions that change the shape of the conversation — away from the spreadsheet and toward what actually needs to be said.',
  },
  'cluster-b': {
    pdf: `${BASE_URL}/loneliness-after-work.pdf`,
    subject: (n) => `Your guide to the social side of leaving is here, ${n}`,
    title: 'Loneliness After Work',
    desc: 'An honest look at what happens to your social life when work ends — and three things that consistently help.',
  },
  'cluster-c': {
    pdf: `${BASE_URL}/what-i-actually-want.pdf`,
    subject: (n) => `Your Discovery Deck is here, ${n}`,
    title: 'What I Actually Want',
    desc: 'Twelve questions designed to cut through the noise and get to something real about what you want from your next chapter.',
  },
  default: {
    pdf: `${BASE_URL}/jumpstart-guide.pdf`,
    subject: (n) => `Your First Week Guide is here, ${n}`,
    title: 'The First Week Guide',
    desc: 'A practical framework for structuring your first week out of work so you don\'t just drift — you start building the life you actually want.',
  },
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS })
  }

  let name: string, email: string, source: string
  try {
    ;({ name, email, source = 'default' } = await req.json())
    if (!name || !email) throw new Error('Missing fields')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const guide = GUIDES[source] ?? GUIDES.default

  const resendKey = Deno.env.get('RESEND_API_KEY') ?? ''
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'hello@theantiretirementguide.co.uk'
  const firstName = name.split(' ')[0]

  const [resendResult, dbResult] = await Promise.allSettled([
    // 1. Send welcome email via Resend (PDF delivery)
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Nick Constantinou <${fromEmail}>`,
        to: [email],
        subject: guide.subject(firstName),
        html: `
          <p>Hi ${firstName},</p>
          <p>Thanks for signing up — your copy of <strong>${guide.title}</strong> is ready.</p>
          <p><a href="${guide.pdf}" style="background:#1a1a1a;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;font-weight:bold;">Download your guide →</a></p>
          <p>${guide.desc}</p>
          <p>Reply to this email any time if you have questions.</p>
          <p>Nick</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="font-size:12px;color:#999">You're receiving this because you signed up at theantiretirementguide.co.uk. <a href="${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>.</p>
        `,
      }),
    }),

    // 2. Save to Supabase (subscriber record)
    fetch(`${supabaseUrl}/rest/v1/marketing_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, email, source }),
    }),
  ])

  // Resend is required — fail if it rejects
  if (resendResult.status === 'rejected' || !resendResult.value.ok) {
    const msg = resendResult.status === 'rejected'
      ? resendResult.reason?.message
      : await resendResult.value.text()
    console.error('Resend email failed:', msg)
    return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  if (dbResult.status === 'rejected' || !dbResult.value.ok) {
    const msg = dbResult.status === 'rejected'
      ? dbResult.reason?.message
      : await dbResult.value.text()
    console.warn('Supabase backup failed (non-fatal):', msg)
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})
