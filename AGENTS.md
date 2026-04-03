# Repo Guidance

## Audience

- Write for UK readers aged roughly 50-65 who are approaching retirement and are financially literate but emotionally unconvinced.
- Prefer British English spellings, UK pension terminology, and UK cultural references.
- Avoid US-market assumptions such as `Social Security`, `401(k)`, `vacation`, or generic American retirement clichés unless the content is explicitly making a comparison.

## Public Repo Safety

- This repository is public. Never copy secrets, tokens, private dashboards, or credential blocks from private strategy/playbook files into this repo.
- If you consult the private launch playbook for context, only surface safe operational guidance here.

## Funnel State

- The book is still in a `coming soon` state. Do not invent or reintroduce a fixed publish date unless the user explicitly provides one.
- Amazon purchase links are not yet wired to the site, so public CTAs should point to the reader list, quizzes, or lead magnets rather than a fake buy flow.
- Public campaign routes should prefer the human-readable URLs such as `/fear-audit`, `/spouse-conversation-guide`, `/loneliness-after-work`, `/what-i-actually-want`, `/first-week-guide`, `/third-tuesday-test`, and `/spouse-readiness-quiz`.
- Internal source keys like `cluster-a` through `cluster-d` still exist for analytics and email routing. Do not expose them as the preferred public URL scheme.

## Lead Magnets And Email

- Lead-magnet emails should not stop at delivery. They should also sell the book.
- Every lead-magnet email should do three jobs:
  1. Deliver the promised asset clearly and quickly.
  2. Explain why the full book is worth reading for that specific reader.
  3. Give a credible next CTA into the reader list, launch page, or book purchase flow.
- Keep the tone warm and specific, not hype-driven. The persuasion should come from relevance, insight, and clarity.

## Content And Build Notes

- The blog archive should stay UK-focused in both copy and examples, even when older source material started from a US draft.
- `app/lib/leadMagnetPages.js` and `app/lib/blogIndex.js` are the main routing/content indexes for lead magnets and blog discovery metadata.
- `out/` is intentionally generated and committed for GitHub Pages deployment in this repo. If a change affects the public site, regenerate it with the site build rather than leaving source and export out of sync.

## Blog Content

- Blog posts should read like polished essays, not rough dumps of HTML content.
- Preserve strong spacing, readable line length, and clear hierarchy for headings, lists, and block quotes.
- Keep the archive UK-focused by default, including examples, pension language, and phrasing.
- If a post starts from older US-oriented copy, localise it before publishing or updating it.
