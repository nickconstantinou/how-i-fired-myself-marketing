/**
 * The Anti-Retirement Fear Profile Quiz — Scoring Engine
 *
 * 8 YES/NO questions map to 4 fear archetypes.
 * Each archetype's score is the count of YES answers mapped to it.
 * The dominant archetype is the one with the highest score.
 * Tie-break priority (highest first): purpose_void > identity_hollow > spouse_mismatch > financial_doubter
 *
 * @param {string[]} answers - Array of 8 'YES'/'NO' strings, ordered Q1–Q8
 * @returns {QuizResult}
 *
 * @example
 * // Q1=Y, Q5=Y → identity_hollow = 2; Q3=Y, Q4=Y, Q8=Y → purpose_void = 3
 * scoreQuiz(['YES','NO','YES','YES','YES','NO','NO','YES'])
 * // → { archetype: 'purpose_void', scores: { identity_hollow: 2, spouse_mismatch: 0, purpose_void: 3, financial_doubter: 0 } }
 */

/** @type {Record<number, string>} */
const QUESTION_ARCHETYPE_MAP = {
  1: 'identity_hollow',
  2: 'spouse_mismatch',
  3: 'purpose_void',
  4: 'purpose_void',
  5: 'identity_hollow',
  6: 'financial_doubter',
  7: 'spouse_mismatch',
  8: 'purpose_void',
}

/**
 * Tie-break priority — higher index wins.
 * Listed from lowest to highest priority.
 * @type {Archetype[]}
 */
const TIE_BREAK_PRIORITY = [
  'financial_doubter',
  'spouse_mismatch',
  'identity_hollow',
  'purpose_void',
]

/**
 * @param {string[]} answers
 * @returns {QuizResult}
 */
function scoreQuiz(answers) {
  if (!Array.isArray(answers) || answers.length !== 8) {
    throw new Error('quizScoring: answers must be an array of exactly 8 YES/NO strings')
  }

  /** @type {ArchetypeScores} */
  const scores = {
    identity_hollow: 0,
    spouse_mismatch: 0,
    purpose_void: 0,
    financial_doubter: 0,
  }

  for (let i = 0; i < 8; i++) {
    const answer = answers[i].toUpperCase()
    if (answer !== 'YES' && answer !== 'NO') {
      throw new Error(`quizScoring: answer at index ${i} must be YES or NO, got ${answer}`)
    }
    if (answer === 'YES') {
      const archetype = QUESTION_ARCHETYPE_MAP[i + 1]
      scores[archetype]++
    }
  }

  // Find the maximum score
  const maxScore = Math.max(
    scores.identity_hollow,
    scores.spouse_mismatch,
    scores.purpose_void,
    scores.financial_doubter,
  )

  if (maxScore === 0) {
    // All-zero: tie-break defaults to purpose_void (top priority)
    return { archetype: 'purpose_void', scores }
  }

  // Find all archetypes tied at maxScore
  const tiedArchetypes = TIE_BREAK_PRIORITY.filter((a) => scores[a] === maxScore)

  // Last in TIE_BREAK_PRIORITY wins (highest priority)
  const dominantArchetype = tiedArchetypes[tiedArchetypes.length - 1]

  return { archetype: dominantArchetype, scores }
}

module.exports = { scoreQuiz }
