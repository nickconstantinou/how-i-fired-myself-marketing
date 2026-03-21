// About Page
export const metadata = {
  title: 'About - How I FIREd Myself',
  description: 'About the author of How I FIREd Myself.',
}

export default function About() {
  return (
    <main className="py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-6 text-slate-900">About Nick</h1>
        <div className="prose-lg text-slate-700 space-y-4">
          <p className="text-lg">I'm 54. I've spent my career in operations management. I've been married for 25+ years. I have two kids in university.</p>
          <p className="text-lg">For years, I've been thinking about "the next chapter." My wife isn't ready to retire. I'm getting closer.</p>
          <p className="text-lg">This book is my attempt to figure it out—and help you do the same.</p>
          <p className="text-lg">I'm not a financial advisor. I'm not a retirement coach. I'm just someone asking the same questions you are.</p>
          <p className="text-lg">Let's figure this out together.</p>
        </div>
      </div>
    </main>
  )
}
