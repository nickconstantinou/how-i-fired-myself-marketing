// Supabase Edge Function — subscribe-lead
// Called by the browser; sends welcome email via Resend and saves to Supabase.
// Secrets set via: supabase secrets set RESEND_API_KEY=... FROM_EMAIL=...

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

const BASE_URL = 'https://theantiretirementguide.co.uk'

const GUIDES: Record<string, { pdf: string; subject: (name: string) => string; title: string; desc: string; cta: string; bookAngle: string; bookBullets: string[]; bookCta: string }> = {
  'cluster-a': {
    pdf: `${BASE_URL}/spouse-conversation-guide.pdf`,
    subject: (n) => `Your Spouse Conversation Guide is here, ${n}`,
    title: 'The Spouse Conversation Guide',
    desc: 'Five questions that change the shape of the conversation — away from the spreadsheet and toward what actually needs to be said.',
    cta: 'Download your guide',
    bookAngle: 'If this guide lands, the full book will help you handle the part couples usually avoid: different timelines, different fears, and the emotional negotiation underneath the pension chat.',
    bookBullets: [
      'A full chapter on the spouse conversation most couples postpone for years',
      'How to tell a numbers disagreement from an identity disagreement',
      'What retirement changes inside a marriage after the practical planning is done',
    ],
    bookCta: 'Join the reader list',
  },
  'cluster-b': {
    pdf: `${BASE_URL}/loneliness-after-work.pdf`,
    subject: (n) => `Your guide to the social side of leaving is here, ${n}`,
    title: 'Loneliness After Work',
    desc: 'An honest look at what happens to your social life when work ends — and three things that consistently help.',
    cta: 'Download your guide',
    bookAngle: 'If the social side of leaving is what worries you, the book goes much further into structure, belonging, and the quiet loneliness people rarely admit before they retire.',
    bookBullets: [
      'How to map the hidden social scaffolding work currently provides',
      'Why “just join a club” is not good enough for most readers',
      'How to build year-one structure before the silence arrives',
    ],
    bookCta: 'Join the reader list',
  },
  'cluster-c': {
    pdf: `${BASE_URL}/what-i-actually-want.pdf`,
    subject: (n) => `Your Discovery Deck is here, ${n}`,
    title: 'What I Actually Want',
    desc: 'Twelve questions designed to cut through the noise and get to something real about what you want from your next chapter.',
    cta: 'Download your guide',
    bookAngle: 'If clarity is the real issue, the book is built for exactly that moment: when the money may be close enough but the future still has no convincing shape.',
    bookBullets: [
      'A practical framework for designing year one before day one arrives',
      'The identity questions high-achievers are usually least prepared for',
      'How to tell the difference between caution and avoidance',
    ],
    bookCta: 'Join the reader list',
  },
  'launch': {
    pdf: '',
    subject: (n) => `You're on the list — The Anti-Retirement Guide launches soon`,
    title: 'The Anti-Retirement Guide',
    desc: "You're on the reader list. We'll email you when the book is available, along with any early-reader news worth sending.",
    cta: 'View launch page',
    bookAngle: 'This book is for people who are financially close, emotionally stuck, and tired of being told retirement is solved by golf, gratitude, and a better spreadsheet.',
    bookBullets: [
      'The fear audit: what is actually stopping you from moving',
      'The spouse conversation, identity shift, and social reality of leaving',
      'A month-by-month approach to building a credible life after work',
    ],
    bookCta: 'View the reader page',
  },
  'cluster-d': {
    pdf: `${BASE_URL}/jumpstart-guide.pdf`,
    subject: (n) => `Your 7-Day Jumpstart Guide is here, ${n}`,
    title: 'The 7-Day Jumpstart Guide',
    desc: 'Seven focused mornings to help you name what is actually stopping you and give shape to what comes after work.',
    cta: 'Download your guide',
    bookAngle: 'This guide is the short version. The book is the full argument, framework, and set of decisions underneath it for readers who know the real issue is bigger than one worksheet.',
    bookBullets: [
      'How to separate money fear from identity fear',
      'What to do when the numbers work and you still cannot move',
      'How to give a future life enough shape to trust',
    ],
    bookCta: 'Join the reader list',
  },
  'nhs-manager': {
    pdf: `${BASE_URL}/nhs-manager-exit-checklist.pdf`,
    subject: (n) => `Your NHS Manager's Exit Checklist is here, ${n}`,
    title: "The NHS Manager's Exit Checklist",
    desc: 'A practical guide to the pension rules, timing questions, and identity shift that sit underneath leaving the NHS.',
    cta: 'Download your guide',
    bookAngle: 'If you are navigating an NHS exit, the book helps with the harder part after the pension mechanics: who you are when the institution no longer structures your days.',
    bookBullets: [
      'What retirement feels like when the system has been your identity as well as your employer',
      'How to handle purpose, structure, and usefulness after a high-responsibility role',
      'How to prepare your first year instead of improvising it under stress',
    ],
    bookCta: 'Join the reader list',
  },
  teacher: {
    pdf: `${BASE_URL}/teacher-exit-checklist.pdf`,
    subject: (n) => `Your Teacher's Guide to the Final Bell is here, ${n}`,
    title: "The Teacher's Guide to the Final Bell",
    desc: 'A focused guide to the pension checkpoints, timing decisions, and identity questions that come with leaving the classroom.',
    cta: 'Download your guide',
    bookAngle: 'If the timetable has been carrying more of your identity than you realised, the book will help you think beyond the pension date and into the life that replaces the school year.',
    bookBullets: [
      'The identity shift after a role built around rhythm, service, and usefulness',
      'How to avoid swapping the timetable for drift',
      'The conversations and preparations most teachers leave too late',
    ],
    bookCta: 'Join the reader list',
  },
  'finance-director': {
    pdf: `${BASE_URL}/finance-director-exit-checklist.pdf`,
    subject: (n) => `Your Finance Director's Exit Checklist is here, ${n}`,
    title: "The Finance Director's Exit Checklist",
    desc: 'For the moment when the numbers work but the decision still does not settle, covering sequencing, tax, and the harder question underneath them.',
    cta: 'Download your guide',
    bookAngle: 'If you are analytically sophisticated and still stuck, the book is designed for the exact point where more modelling stops helping and the psychological barrier takes over.',
    bookBullets: [
      'Why competent people keep hiding in the spreadsheet',
      'How to test whether this is really a finance problem at all',
      'What a convincing post-work life needs besides tax efficiency',
    ],
    bookCta: 'Join the reader list',
  },
  'ni-decision-matrix': {
    pdf: `${BASE_URL}/ni-decision-matrix.pdf`,
    subject: (n) => `Your NI Decision Matrix is here, ${n}`,
    title: 'The NI Decision Matrix',
    desc: 'A decision framework for working out whether buying missing National Insurance years actually changes your outcome.',
    cta: 'Download your guide',
    bookAngle: 'If you care about getting the detail right, the book complements this kind of practical decision with the part most retirement guidance skips: what the numbers are actually for.',
    bookBullets: [
      'How to stop practical pension questions becoming a hiding place',
      'The emotional blockers that survive after the detail is sorted',
      'A framework for moving from technical readiness to personal readiness',
    ],
    bookCta: 'Join the reader list',
  },
  'third-tuesday-test': {
    pdf: `${BASE_URL}/third-tuesday-test.pdf`,
    subject: (n) => `Your Third Tuesday Test is here, ${n}`,
    title: 'The Third Tuesday Test',
    desc: 'A short guide to the question that exposes whether you are actually ready to leave work or still avoiding the real issue.',
    cta: 'Download your guide',
    bookAngle: 'If the Third Tuesday question hits home, the full book expands it into a complete way of thinking about readiness, fear, and life-shape after work.',
    bookBullets: [
      'How to tell whether you are delaying wisely or merely delaying',
      'The identity, spouse, and purpose questions behind the test',
      'How to design a first year you can actually believe in',
    ],
    bookCta: 'Join the reader list',
  },
  default: {
    pdf: `${BASE_URL}/jumpstart-guide.pdf`,
    subject: (n) => `Your First Week Guide is here, ${n}`,
    title: 'The First Week Guide',
    desc: 'A practical framework for structuring your first week out of work so you don\'t just drift — you start building the life you actually want.',
    cta: 'Download your guide',
    bookAngle: 'If this guide helps, the book takes the same honest approach across the whole retirement transition: fear, identity, relationships, money, and the shape of everyday life after work.',
    bookBullets: [
      'The fears most people mislabel as “not quite ready yet”',
      'How to build a future life that feels credible rather than decorative',
      'Why the emotional side of retirement deserves the same rigour as the spreadsheet',
    ],
    bookCta: 'Join the reader list',
  },
}

function buildGuideEmailHtml(firstName: string, guide: { pdf: string; title: string; desc: string; cta: string; bookAngle: string; bookBullets: string[]; bookCta: string }, email: string) {
  const actionUrl = guide.pdf || `${BASE_URL}/launch`
  const readerUrl = `${BASE_URL}/launch`
  const bookBullets = guide.bookBullets
    .map((bullet) => `<li style="margin-bottom: 10px;">${bullet}</li>`)
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${guide.title}</title></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 20px; color: #1a1a2e;">
  <p style="color: #888; font-size: 14px;">The Anti-Retirement Guide</p>
  <p style="font-size: 14px; color: #888;">Your guide is ready</p>
  <h1 style="font-size: 32px; color: #1a1a2e; margin-bottom: 8px;">${guide.title}</h1>
  <p style="font-size: 18px; color: #b45309; font-style: italic; margin-bottom: 24px;">
    For people who are financially close, emotionally stuck, and trying to name what is really going on.
  </p>

  <div style="background: #fffbeb; border-left: 4px solid #b45309; padding: 16px 20px; margin-bottom: 32px;">
    <p style="font-size: 16px; color: #444; margin: 0 0 12px;">Hi ${firstName},</p>
    <p style="font-size: 15px; color: #444; line-height: 1.8; margin: 0;">
      ${guide.desc}
    </p>
  </div>

  <div style="text-align: center; margin: 36px 0;">
    <a href="${actionUrl}" style="display: inline-block; background: #b45309; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
      ${guide.cta}
    </a>
  </div>

  <div style="background: #fff7ed; border: 1px solid #fdba74; border-radius: 14px; padding: 22px 24px; margin: 32px 0;">
    <p style="font-size: 13px; color: #9a3412; text-transform: uppercase; letter-spacing: 0.12em; font-weight: bold; margin: 0 0 10px;">
      Why the book is worth reading
    </p>
    <p style="font-size: 15px; color: #431407; line-height: 1.8; margin: 0 0 14px;">
      ${guide.bookAngle}
    </p>
    <ul style="font-size: 15px; color: #7c2d12; line-height: 1.7; padding-left: 20px; margin: 0 0 20px;">
      ${bookBullets}
    </ul>
    <a href="${readerUrl}" style="display: inline-block; background: #1e293b; color: white; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 15px; font-weight: bold;">
      ${guide.bookCta}
    </a>
  </div>

  <p style="font-size: 15px; color: #444; line-height: 1.8;">
    If the guide feels uncomfortably accurate, that is a good sign. It usually means the full book will land too.
  </p>
  <p style="font-size: 15px; color: #444; line-height: 1.8;">Nick</p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
  <p style="font-size:12px;color:#999">
    You're receiving this because you signed up at theantiretirementguide.co.uk.
    <a href="${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>.
  </p>
</body>
</html>`
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

  // Ensure project row exists (idempotent — safe to call even if it already exists)
  try {
    await fetch(`${supabaseUrl}/rest/v1/marketing_projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        id: 'anti-retirement-guide',
        name: 'The Anti-Retirement Guide',
        url: 'https://theantiretirementguide.co.uk',
      }),
    })
  } catch (err) {
    console.warn('subscribe-lead: project upsert failed (non-fatal):', err)
  }
  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'hello@theantiretirementguide.co.uk'
  const firstName = name.split(' ')[0]

  let leadId = 'unknown'
  try {
    const dbResponse = await fetch(
      `${supabaseUrl}/rest/v1/marketing_leads?on_conflict=email,project_id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=representation,resolution=merge-duplicates',
        },
        body: JSON.stringify({
          email,
          name,
          project_id: 'anti-retirement-guide',
          source,
          status: 'active',
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        }),
      },
    )

    if (!dbResponse.ok) {
      throw new Error(await dbResponse.text())
    }

    const dbData = await dbResponse.json()
    if (Array.isArray(dbData) && dbData.length > 0 && dbData[0].id) {
      leadId = dbData[0].id
    } else {
      const fetchRes = await fetch(
        `${supabaseUrl}/rest/v1/marketing_leads?email=eq.${encodeURIComponent(email)}&project_id=eq.anti-retirement-guide&select=id&limit=1`,
        {
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
        },
      )

      if (!fetchRes.ok) {
        throw new Error(await fetchRes.text())
      }

      const fetchData = await fetchRes.json()
      if (!Array.isArray(fetchData) || fetchData.length === 0 || !fetchData[0].id) {
        throw new Error('marketing_leads upsert did not return or persist a row')
      }

      leadId = fetchData[0].id
    }
  } catch (err) {
    console.error('subscribe-lead: marketing_leads upsert failed:', err)
    return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Nick Constantinou <${fromEmail}>`,
        to: [email],
        subject: guide.subject(firstName),
        html: buildGuideEmailHtml(firstName, guide, email),
      }),
    })

  if (!resendResponse.ok) {
    const msg = await resendResponse.text()
    console.error('Resend email failed:', msg)
    return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true, leadId }), {
    status: 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})
