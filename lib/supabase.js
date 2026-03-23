// Lead capture — calls the subscribe-lead Edge Function (server-side proxy)
// The Kit API key never touches the browser; it's a Supabase secret.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export async function subscribeLead(name, email) {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/subscribe-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
      },
      body: JSON.stringify({ name, email }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error || 'Subscription failed')
    }

    return { success: true }
  } catch (error) {
    console.error('Subscription error:', error)
    return { success: false, error: error.message }
  }
}
