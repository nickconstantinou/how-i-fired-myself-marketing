// FAQ Page
const BASE_URL = 'https://nickconstantinou.github.io/the-anti-retirement-guide-marketing'

export const metadata = {
  title: 'FAQ - The Anti-Retirement Guide',
  description: 'Frequently asked questions about The Anti-Retirement Guide and the retirement transition.',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL + '/faq/',
    languages: {
      'en-GB': BASE_URL + '/faq/',
    },
  },
  openGraph: {
    title: 'FAQ - The Anti-Retirement Guide',
    description: 'Frequently asked questions about designing your next chapter.',
    type: 'website',
    url: BASE_URL + '/faq/',
    locale: 'en_GB',
  },
}

const faqs = [
  { q: 'What is The Anti-Retirement Guide about?', a: "It's for people who are close to retirement — or financially ready — but haven't been able to move. Not because the money isn't there. Because the thing on the other side doesn't have a shape yet. The book helps you give it one." },
  { q: 'Who is this book for?', a: "People who've spent 30 years being genuinely good at something and find the idea of stopping is not simple. It works whether you're choosing this transition or whether a redundancy, health scare, or restructure has made the decision for you." },
  { q: "What's the main message?", a: "This is not a financial plan — your IFA handles that. This book sits next to the spreadsheet and asks what the numbers are in service of. It's about identity, structure, belonging, and designing what comes next." },
  { q: 'Why should I trust the author?', a: "Nick is 54, still working, and writing from inside the decision he hasn't made yet. He's not a financial adviser, not a life coach, and not someone who has already figured this out. He wrote the book he couldn't find: honest about the fear, specific about the money, and clear-eyed about the parts that don't resolve neatly." },
  { q: "My spouse is not ready to retire. What do I do?", a: "The book covers this directly — including a structured framework for the conversation most couples avoid for years. The key insight: couples on completely different timelines need a different approach than the standard retirement planning playbook offers." },
  { q: "I'm an introvert. Do I have to build a big social life?", a: "'Join a club' is not the answer this book gives you. There's a dedicated section on social connection for introverts — building the right kind of structure before you leave, not a packed calendar that doesn't fit who you are." },
  { q: "I was made redundant — is this book still relevant?", a: "Yes. The book works for both people who are choosing this transition and those who arrived here without choosing it. Some sections are written specifically for people facing an unexpected crossroads." },
  { q: "I'm self-employed — is my situation covered?", a: "Part Five includes a dedicated guide for the self-employed exit. Leaving when you own the business is a different problem — and it gets its own treatment." },
  { q: "What is the First Week Guide?", a: "A free seven-day exercise guide to get you unstuck. One exercise per day, 20–30 minutes each. By the end of the week you'll have named what's actually stopping you and have a clearer picture of what comes next." },
  { q: 'What format is the book available in?', a: "Available on Amazon Kindle and paperback from 7 April 2026." },
]

export default function FAQ() {
  return (
    <main className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-slate-900">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-600 text-center mb-12 max-w-xl mx-auto">
          Questions about the book and what to expect.
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

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL + "/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "FAQ",
                "item": BASE_URL + "/faq/"
              }
            ]
          })
        }}
      />
    </main>
  )
}
