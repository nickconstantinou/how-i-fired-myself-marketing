// FAQ Page
export const metadata = {
  title: 'FAQ - How I FIREd Myself',
  description: 'Frequently asked questions about the book and retirement planning.',
}

const faqs = [
  { q: 'What is "How I FIREd Myself" about?', a: "This book is for people aged 50-65 who are thinking about retirement but aren't ready to 'stop.' It's about designing your next chapter—not fading away." },
  { q: 'Who is this book for?', a: "Anyone 50-65 who's: thinking about retirement but anxious, has a spouse at different retirement timelines, worries about identity beyond their career, wants practical guidance, or is an introvert concerned about social connections in retirement." },
  { q: "What's the main message?", a: "Retirement isn't the ending—it's a beginning. The book reframes 'retirement' as 'launching' into your next chapter." },
  { q: 'Why should I trust this author?', a: 'Nick shares his own fears, failures, and uncertainties. He hasn\'t figured it all out—but he\'s further along the path and sharing what he\'s learned.' },
  { q: "I'm 55. Am I too old to start planning?", a: 'Absolutely not. 55 is ideal—you have time to plan but enough urgency that forces action.' },
  { q: 'My spouse isn't ready to retire. What do I do?', a: "Chapter 3 covers 'The Spouse Tempo'—how to navigate different retirement timelines. The key is vision-first, spreadsheet-second." },
  { q: "I'm an introvert. Will I be lonely in retirement?", a: 'Chapter 6 addresses social connection for introverts. The key is building your social network BEFORE you leave work.' },
  { q: 'What is the 30-Day Jumpstart Guide?', a: 'A free 30-day action plan to help you: Clarify what you want from retirement, Have the conversation with your spouse, Run your own stress tests, Design your first year.' },
  { q: 'What format is the book available in?', a: 'The book will be available on Amazon Kindle and paperback.' },
]

export default function FAQ() {
  return (
    <main className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-2">{faq.q}</h2>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
