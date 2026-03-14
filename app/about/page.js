// About Page
export const metadata = {
  title: 'About - How I FIREd Myself',
  description: 'About the author of How I FIREd Myself.',
}

export default function About() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">About Nick</h1>
        <div className="prose-lg">
          <p>I'm 54. I've spent my career in operations management. I've been married for 25+ years. I have two kids in university.</p>
          <p className="mt-4">For years, I've been thinking about "the next chapter." My wife isn't ready to retire. I'm getting closer.</p>
          <p className="mt-4">This book is my attempt to figure it out—and help you do the same.</p>
          <p className="mt-4">I'm not a financial advisor. I'm not a retirement coach. I'm just someone asking the same questions you are.</p>
          <p className="mt-4">Let's figure this out together.</p>
        </div>
      </div>
    </main>
  )
}
