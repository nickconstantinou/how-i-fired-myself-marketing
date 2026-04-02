import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-amber-400 mb-6 font-semibold">Available 7 April 2026</p>
          <h1 className="font-bold mb-6 tracking-tight">The Anti-Retirement Guide</h1>
          <p className="text-xl md:text-2xl mb-4 text-slate-300 max-w-2xl mx-auto leading-relaxed" style={{fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic'}}>
            For people who are financially ready, quietly terrified, and absolutely certain that sitting on a sofa isn&apos;t the answer.
          </p>
          <p className="text-lg mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            For people who are close — or financially ready — but haven&apos;t been able to move. Not because the money isn&apos;t there. Because the thing on the other side doesn&apos;t have a shape yet.
          </p>
          <Link href="/fear-quiz" className="btn-primary text-lg">
            Take the Fear Quiz →
          </Link>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">The question keeps circling</h2>
          <p className="text-lg mb-6 text-slate-700">You&apos;ve spent 30 years being genuinely good at something. Not just employed — <em>good</em>. The idea of stopping is not simple.</p>
          <p className="text-lg mb-6 text-slate-700">It is not just a financial question. It is a question about what your days are actually for. About whether the person you&apos;ve been at work is someone you want to keep being.</p>
          <p className="text-lg mb-6 text-slate-700">Most retirement books tell you to play golf, volunteer, and call it a life well spent.</p>
          <p className="text-lg font-semibold text-slate-800">This one doesn&apos;t.</p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-4">Who is this book for?</h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Some of you are choosing this. Some arrived here after a redundancy, a health scare, or a restructure that didn&apos;t ask for your opinion.
          </p>

          <div className="grid gap-4 md:grid-cols-2 w-full">
            {[
              "You're close to retirement but can't bring yourself to move",
              "The money is mostly there — the question isn't financial",
              "You don't know who you are without the job title",
              "Your spouse isn't on the same timeline",
              "You were pushed out and now face an unexpected crossroads",
              "You're a business owner planning your exit",
              "You want to work in some form — but differently",
              "You're an introvert who dreads 'join a club' as the answer",
              "You're single and thinking carefully about structure and belonging",
              "You want to design Year One before Day One arrives",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg w-full">
                <span className="text-amber-500 text-xl flex-shrink-0">✓</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 section-alt">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 sm:p-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-widest text-amber-700 mb-3 font-semibold">Free: The NI Decision Matrix</p>
              <p className="text-lg text-slate-800 mb-5">
                Should you buy missing National Insurance years? This one-page decision tool walks you through the four questions — in the right order — before you spend £907 per year.
              </p>
              <Link
                href="/thank-you?guide=ni-decision-matrix"
                className="inline-block bg-amber-500 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-amber-400 transition shadow-sm"
              >
                Download the NI Decision Matrix — Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What The Book Covers */}
      <section className="py-24 section-alt">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-4">What the book covers</h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            This is not a financial plan. Your IFA handles that. This book sits next to the spreadsheet — and asks what the numbers are in service of.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-6 w-full">
            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part One: The Decision</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• The fear that doesn&apos;t have a name</li>
                <li>• Why high achievers handle this kind of ambiguity badly</li>
                <li>• The conversation most couples avoid for years</li>
              </ul>
            </div>

            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part Two: The Preparation</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• What identity looks like after the function is gone</li>
                <li>• Not just the title — the belonging, the rhythm, the reason to get up at six</li>
                <li>• Building social structure before you leave, not after</li>
              </ul>
            </div>

            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part Three: The Numbers</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• A freedom budget — what you&apos;ll actually spend when the diary empties</li>
                <li>• Stress-testing against worst-case scenarios</li>
                <li>• Working in retirement: what that looks like in practice</li>
              </ul>
            </div>

            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part Four: Day One</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Designing Year One month by month</li>
                <li>• Answering &quot;what do you do now?&quot; without hesitating</li>
                <li>• Owning the transition on your own terms</li>
              </ul>
            </div>
          </div>

          <div className="card w-full">
            <h3 className="font-semibold mb-3 text-slate-800">Part Five: For Your Specific Situation</h3>
            <p className="text-slate-600 mb-3">Dedicated guides for situations that don&apos;t fit the standard retirement narrative:</p>
            <div className="grid md:grid-cols-2 gap-2 text-slate-600">
              <div>• The late starter</div>
              <div>• The self-employed exit</div>
              <div>• The introvert in retirement</div>
              <div>• Couples on different timelines</div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Stats */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center justify-items-center">
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">20</div>
                <div className="text-slate-300">chapters</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">5</div>
                <div className="text-slate-300">structured parts</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">1</div>
                <div className="text-slate-300">honest guide to the transition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 section-alt">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-12">What readers say</h2>
          <div className="grid gap-6 md:grid-cols-3 w-full">
            <blockquote className="card w-full">
              <p className="text-slate-700 mb-4 italic">&quot;Good salary, good pension, and I was dying inside. I&apos;d been telling myself another five years for about four years. This book helped me see that the thing stopping me wasn&apos;t the money — it was that I&apos;d built my entire identity around my job title. I handed my notice in eight months after reading it.&quot;</p>
              <cite className="block not-italic font-semibold text-amber-600">— Dave, 52, former IT manager</cite>
            </blockquote>
            <blockquote className="card w-full">
              <p className="text-slate-700 mb-4 italic">&quot;Every other retirement book assumed a spouse, a house, and a plan you&apos;d made together. I&apos;m divorced, renting, and on my own timeline. This was the only one that addressed what that actually looks like — the finances, the identity, the social gap. It didn&apos;t give me a template. It gave me a way of thinking.&quot;</p>
              <cite className="block not-italic font-semibold text-amber-600">— Anonymous, 58</cite>
            </blockquote>
            <blockquote className="card w-full">
              <p className="text-slate-700 mb-4 italic">&quot;My knees have been telling me for two years that I&apos;ve got maybe a decade left on ladders. I knew it, but I hadn&apos;t done anything about it. The book made me stop treating that as a vague future problem and start treating it as a planning fact. I&apos;m now training my son to take over and I have a transition timeline.&quot;</p>
              <cite className="block not-italic font-semibold text-amber-600">— Mike, 57, carpenter</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="hero py-24 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6">Start with the fear profile</h2>
          <p className="text-lg mb-8 text-slate-200">
            Eight questions to identify what is actually keeping you stuck.
          </p>
          <Link href="/fear-quiz" className="btn-primary text-lg">
            Take the Fear Quiz →
          </Link>
        </div>
      </section>

      {/* About Author */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6">About the author</h2>
          <p className="text-lg text-slate-700">
            Nick Constantinou is 54, still working, and writing from inside the decision he hasn&apos;t made yet. He has a mortgage with seven years left, two children in university, and a wife who isn&apos;t ready to retire.
          </p>
          <p className="text-lg mt-4 text-slate-700">
            He&apos;s not a financial adviser, not a life coach, and not someone who has already figured this out. He wrote the book he couldn&apos;t find: honest about the fear, specific about the money, and clear-eyed about the parts that don&apos;t resolve neatly.
          </p>
        </div>
      </section>
    </main>
  )
}

// PostHog CTA tracking — runs after hydration
if (typeof window !== 'undefined') {
  window.posthog && document.querySelectorAll('a[href="/fear-quiz"]').forEach(function(el) {
    el.addEventListener('click', function() {
      window.posthog.capture('cta_click', {
        cta_text: el.textContent.trim(),
        source: 'homepage'
      })
    })
  })
}
