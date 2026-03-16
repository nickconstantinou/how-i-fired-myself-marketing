// Supabase client for How I FIREd Myself
// Add your Supabase credentials to .env.local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export async function subscribeLead(name, email) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log('Supabase not configured, storing locally:', { name, email })
    return { success: true, local: true }
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/marketing_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name,
        email,
        source: 'how-i-escaped'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe')
    }

    return { success: true }
  } catch (error) {
    console.error('Subscription error:', error)
    return { success: false, error: error.message }
  }
}
