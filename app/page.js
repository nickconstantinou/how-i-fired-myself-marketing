// Homepage - How I FIREd Myself
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Not Retiring — Launching</h1>
          <p className="text-xl mb-8 text-emerald-100">
            The anti-retirement guide for pre-retirees who aren't ready to stop—they're ready to start something new.
          </p>
          <a href="/jumpstart" className="bg-amber-500 text-emerald-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 transition">
            Get the Free 30-Day Jumpstart Guide →
          </a>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Retirement Anxiety Is Real</h2>
          <p className="text-lg mb-6">You're 50-something. You've worked decades. You're "mostly ready" on paper.</p>
          <p className="text-lg mb-4">But:</p>
          <ul className="space-y-2 text-lg">
            <li>• You're scared of running out of money</li>
            <li>• You're worried about losing your identity</li>
            <li>• Your spouse isn't ready to retire</li>
            <li>• You don't know who you are without your job title</li>
            <li>• Social connections feel intimidating</li>
          </ul>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Design Your Next Chapter</h2>
          <p className="text-lg mb-6">This isn't about the 4% rule or compound interest.</p>
          <p className="text-lg mb-4">This is about:</p>
          <ul className="space-y-2 text-lg">
            <li>• Understanding your fear cocktail (and why it's normal)</li>
            <li>• Having the conversation with your spouse</li>
            <li>• Building your social network BEFORE you leave</li>
            <li>• Stress-testing your plan against worst-case scenarios</li>
            <li>• Designing Year One with intention</li>
          </ul>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What's Inside the Book</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Part 1: The Decision</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Why "retirement" is the wrong word</li>
                <li>• Understanding your fear (anxiety + excitement + guilt)</li>
                <li>• Having the conversation with your spouse</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Part 2: The Preparation</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Who are you without your job title?</li>
                <li>• The psychology of leaving</li>
                <li>• Building social connections</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Part 3: The Numbers</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• The Reality Check (mortgage, kids, commitments)</li>
                <li>• Building your Freedom Budget</li>
                <li>• Stress-testing your plan</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Part 4: The Transition</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Designing Year One</li>
                <li>• Answering "What do you DO now?"</li>
                <li>• Owning your new story</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get the Free 30-Day Retirement Jumpstart Guide</h2>
          <p className="text-lg mb-8 text-emerald-100">
            Not sure if you're ready? Take this free challenge to get clarity.
          </p>
          <a href="/jumpstart" className="bg-amber-500 text-emerald-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 transition inline-block">
            Send Me the Free Guide →
          </a>
        </div>
      </section>

      {/* About Author */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">About the Author</h2>
          <p className="text-lg">
            I'm Nick. I'm 54. I'm not retired yet—I'm planning.
          </p>
          <p className="text-lg mt-4">
            I've spent months researching, interviewing, and writing this book. I've talked to hundreds of pre-retirees. I've faced my own fears about leaving work.
          </p>
          <p className="text-lg mt-4">
            This book is my journey—and your guide.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Readers Say</h2>
          <blockquote className="text-lg italic mb-6">
            "This book changed how I think about retirement. I'm not scared anymore—I'm excited."
            <cite className="block not-italic mt-2">— Sarah, 57</cite>
          </blockquote>
          <blockquote className="text-lg italic">
            "Nick's honesty about his own fears made me feel less alone. This is the retirement book I needed."
            <cite className="block not-italic mt-2">— David, 61</cite>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-emerald-950 text-emerald-200">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="/blog" className="hover:text-white">Blog</a>
          <a href="/faq" className="hover:text-white">FAQ</a>
          <a href="/jumpstart" className="hover:text-white">Free Guide</a>
        </div>
      </footer>
    </main>
  )
}
