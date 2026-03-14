// Thank You Page
export const metadata = {
  title: 'Thank You - How I FIREd Myself',
  description: 'Thank you for signing up!',
}

export default function ThankYou() {
  return (
    <main className="min-h-screen py-16 bg-emerald-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Thank You!</h1>
        <p className="text-xl mb-8">Check your email for the Free 30-Day Retirement Jumpstart Guide.</p>
        <p className="text-lg">In the meantime, explore the blog for more retirement insights.</p>
      </div>
    </main>
  )
}
