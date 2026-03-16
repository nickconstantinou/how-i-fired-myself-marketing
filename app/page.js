import Link from 'next/link'

// Homepage - How I FIREd Myself
export default function Home() {
  return (
    <main>
      {/* Hero Section - Updated with DON'T RETIRE — ESCAPE */}
      <section className="hero text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-bold mb-8 tracking-tight">DON'T RETIRE — <span className="gold-text">ESCAPE</span></h1>
          <p className="text-xl md:text-2xl mb-10 text-slate-200 max-w-2xl mx-auto leading-relaxed">
            The Anti-Retirement Guide for pre-retirees who aren't ready to stop—they're ready to escape and build something extraordinary.
          </p>
          <Link href="/jumpstart" className="btn-primary text-lg">
            Get the Free 30-Day Jumpstart Guide →
          </Link>
        </div>
      </section>

      {/* Who's It For - Comprehensive audience section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-4">Who Is This Book For?</h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            If any of these resonate, this book was written for you.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 w-full">
            {[
              "You're 50+ and thinking about retirement in the next 5-10 years",
              "You've done the math but still feel uncertain",
              "You're scared of running out of money—or purpose",
              "You don't know who you are without your job title",
              "Your spouse or partner isn't on the same page",
              "You're a physical worker whose body is starting to feel it",
              "You're single and worry about loneliness in retirement",
              "You're renting and don't have a property safety net",
              "You've already retired and feel lost—or are dreading it",
              "You're a caregiver thinking about your own future",
              "You've been made redundant and facing an unexpected crossroads",
              "You're a business owner planning your exit",
              "You're divorced and starting over in your 50s or 60s",
              "You want to retire early but need a realistic plan",
              "You're mentally ready but financially uncertain"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg w-full max-w-md">
                <span className="text-amber-500 text-xl">✓</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">Retirement Anxiety Is Real</h2>
          <p className="text-lg mb-6 text-slate-700">You're 50-something. You've worked decades. You're "mostly ready" on paper.</p>
          <p className="text-lg mb-6 font-semibold text-slate-800">But:</p>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">You're scared of running out of money</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">You're worried about losing your identity</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">Your spouse isn't ready to retire</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">You don't know who you are without your job title</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">Social connections feel intimidating</span></li>
          </ul>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">Design Your Next Chapter</h2>
          <p className="text-lg mb-6 text-slate-700">This isn't about the 4% rule or compound interest.</p>
          <p className="text-lg mb-6 font-semibold text-slate-800">This is about:</p>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">Understanding your fear cocktail (and why it's normal)</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">Having the conversation with your spouse</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">Building your social network BEFORE you leave</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">Stress-testing your plan against worst-case scenarios</span></li>
            <li className="flex items-start gap-3"><span className="text-amber-500 text-xl">✓</span> <span className="text-slate-700">Designing Year One with intention</span></li>
          </ul>
        </div>
      </section>

      {/* Book Specs */}
      <section className="py-24 section-alt">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-12">What's Inside the Book</h2>
          
          <div className="grid gap-6 md:grid-cols-2 mb-12 w-full">
            <div className="card w-full max-w-md">
              <h3 className="font-semibold mb-3 text-slate-800">Part 1: The Decision</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Why "retirement" is the wrong word</li>
                <li>• Understanding your fear cocktail</li>
                <li>• Having the conversation with your spouse</li>
              </ul>
            </div>
            
            <div className="card w-full max-w-md">
              <h3 className="font-semibold mb-3 text-slate-800">Part 2: The Preparation</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Who are you without your job title?</li>
                <li>• The psychology of leaving</li>
                <li>• Building social connections</li>
              </ul>
            </div>
            
            <div className="card w-full max-w-md">
              <h3 className="font-semibold mb-3 text-slate-800">Part 3: The Numbers</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• The Reality Check</li>
                <li>• Building your Freedom Budget</li>
                <li>• Stress-testing your plan</li>
              </ul>
            </div>
            
            <div className="card w-full max-w-md">
              <h3 className="font-semibold mb-3 text-slate-800">Part 4: The Transition</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Designing Year One</li>
                <li>• Answering "What do you DO now?"</li>
                <li>• Owning your new story</li>
              </ul>
            </div>
          </div>

          {/* Book Specs */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <h3 className="font-semibold text-center mb-8 text-amber-400">Book Specifications</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center justify-items-center">
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">34,000</div>
                <div className="text-slate-300">words of actionable content</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">20</div>
                <div className="text-slate-300">chapters across 4 parts</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">8</div>
                <div className="text-slate-300">real case studies from pre-retirees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Updated with Dave-52, Anonymous-divorced, Mike-57 */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-12">What Readers Say</h2>
          <div className="grid gap-6 md:grid-cols-3 w-full">
            <blockquote className="card w-full max-w-md">
              <p className="text-slate-700 mb-4 italic">"I was 52 and terrified. Thought I'd made every mistake possible. This book showed me I still had options—and time. I'm now freelancing part-time, stress-free."</p>
              <cite className="block not-italic font-semibold text-amber-600">— Dave, 52</cite>
            </blockquote>
            <blockquote className="card w-full max-w-md">
              <p className="text-slate-700 mb-4 italic">"Divorce at 58 left me starting over. Every retirement plan assumed a spouse. This book addressed the unique challenges I faced as a single woman. Finally, someone gets it."</p>
              <cite className="block not-italic font-semibold text-amber-600">— Anonymous, Divorced</cite>
            </blockquote>
            <blockquote className="card w-full max-w-md">
              <p className="text-slate-700 mb-4 italic">"I'm a carpenter. My knees aren't what they were at 40. This book helped me plan an exit strategy that doesn't rely on working until 67. I'm 3 years from my escape date."</p>
              <cite className="block not-italic font-semibold text-amber-600">— Mike, 57</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ - Physical Workers, Singles, Renters */}
      <section className="py-24 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="card w-full max-w-2xl">
              <h3 className="font-semibold mb-3 text-slate-800">I'm a physical worker—can this book help me?</h3>
              <p className="text-slate-600">Absolutely. If your body is starting to feel decades of manual labor, you need a plan that accounts for physical limitations. We cover stress-testing your financial plan against reduced earning capacity, exploring less physical income streams, and designing a retirement that works with your body, not against it.</p>
            </div>
            
            <div className="card w-full max-w-2xl">
              <h3 className="font-semibold mb-3 text-slate-800">I'm single—do I need a different approach?</h3>
              <p className="text-slate-600">Yes—and that's a good thing. Most retirement advice assumes a spouse or partner. This book addresses the unique challenges of singles: no second income to fall back on, different social dynamics, planning for one person instead of two, and building a support network that replaces what a partner might typically provide.</p>
            </div>
            
            <div className="card w-full max-w-2xl">
              <h3 className="font-semibold mb-3 text-slate-800">I rent—can I still retire comfortably?</h3>
              <p className="text-slate-600">You absolutely can. This book doesn't assume you own property. We explore renting in retirement (which can actually be more flexible), building a larger nest egg since you're not tying up capital in real estate, geographic flexibility, and the emotional considerations of not having "owned" your home. Your path is different—but it's not lesser.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="hero py-24 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6">Get the Free 30-Day Retirement Jumpstart Guide</h2>
          <p className="text-lg mb-8 text-slate-200">
            Not sure if you're ready? Take this free challenge to get clarity on your next chapter.
          </p>
          <Link href="/jumpstart" className="btn-primary text-lg">
            Send Me the Free Guide →
          </Link>
        </div>
      </section>

      {/* About Author */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6">About the Author</h2>
          <p className="text-lg text-slate-700">
            I'm Nick. I'm 54. I'm not retired yet—I'm planning.
          </p>
          <p className="text-lg mt-4 text-slate-700">
            I've spent months researching, interviewing, and writing this book. I've talked to hundreds of pre-retirees. I've faced my own fears about leaving work.
          </p>
          <p className="text-lg mt-4 text-slate-700">
            This book is my journey—and your guide.
          </p>
        </div>
      </section>
    </main>
  )
}
