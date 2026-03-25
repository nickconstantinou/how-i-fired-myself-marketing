// Supabase Edge Function — unsubscribe
// Deletes a marketing lead by email. Called from /unsubscribe page.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS })
  }

  let email: string
  try {
    ;({ email } = await req.json())
    if (!email) throw new Error('Missing email')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

  const response = await fetch(
    `${supabaseUrl}/rest/v1/marketing_leads?email=eq.${encodeURIComponent(email)}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
    }
  )

  if (!response.ok) {
    const msg = await response.text()
    console.error('Unsubscribe failed:', msg)
    return new Response(JSON.stringify({ error: 'Unsubscribe failed' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})
