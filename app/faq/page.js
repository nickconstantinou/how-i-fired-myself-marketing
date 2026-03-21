// FAQ Page
export const metadata = {
  title: 'FAQ - How I FIREd Myself',
  description: 'Frequently asked questions about the book and retirement planning.',
}

const faqs = [
  { q: 'What is "How I FIREd Myself" about?', a: "This book is for people aged 50-65 who are thinking about retirement but aren't ready to stop. It's about designing your next chapter—not fading away." },
  { q: 'Who is this book for?', a: "Anyone 50-65 who is: thinking about retirement but anxious, has a spouse at different retirement timelines, worries about identity beyond their career, wants practical guidance, or is an introvert concerned about social connections in retirement." },
  { q: "What is the main message?", a: "Retirement is not the ending—it is a beginning. The book reframes retirement as launching into your next chapter." },
  { q: 'Why should I trust this author?', a: "Nick shares his own fears, failures, and uncertainties. He has not figured it all out—but he is further along the path and sharing what he has learned." },
  { q: "I am 55. Am I too old to start planning?", a: "Absolutely not. 55 is ideal—you have time to plan but enough urgency that forces action." },
  { q: "My spouse is not ready to retire. What do I do?", a: "Chapter 3 covers The Spouse Tempo—how to navigate different retirement timelines. The key is vision-first, spreadsheet-second." },
  { q: "I am an introvert. Will I be lonely in retirement?", a: "Chapter 6 addresses social connection for introverts. The key is building your social network BEFORE you leave work." },
  { q: 'What is the 30-Day Jumpstart Guide?', a: "A free 30-day action plan to help you: Clarify what you want from retirement, Have the conversation with your spouse, Run your own stress tests, Design your first year." },
  { q: 'What format is the book available in?', a: "The book will be available on Amazon Kindle and paperback." },
  // New FAQs from landing page
  { q: "I'm a physical worker—can this book help me?", a: "Absolutely. If your body is starting to feel decades of manual labor, you need a plan that accounts for physical limitations. We cover stress-testing your financial plan against reduced earning capacity, exploring less physical income streams, and designing a retirement that works with your body, not against it." },
  { q: "I'm single—do I need a different approach?", a: "Yes—and that's a good thing. Most retirement advice assumes a spouse or partner. This book addresses the unique challenges of singles: no second income to fall back on, different social dynamics, planning for one person instead of two, and building a support network that replaces what a partner might typically provide." },
  { q: "I rent—can I still retire comfortably?", a: "You absolutely can. This book doesn't assume you own property. We explore renting in retirement (which can actually be more flexible), building a larger nest egg since you're not tying up capital in real estate, geographic flexibility, and the emotional considerations of not having 'owned' your home. Your path is different—but it's not lesser." },
]

export default function FAQ() {
  return (
    <main className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-slate-900">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-600 text-center mb-12 max-w-xl mx-auto">
          Everything you need to know about escaping the traditional retirement trap.
        </p>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="card">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">{faq.q}</h2>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
