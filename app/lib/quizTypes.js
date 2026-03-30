/**
 * @typedef {'identity_hollow' | 'spouse_mismatch' | 'purpose_void' | 'financial_doubter'} Archetype
 *
 * @typedef {Object} ArchetypeScores
 * @property {number} identity_hollow   - 0 to 2
 * @property {number} spouse_mismatch   - 0 to 2
 * @property {number} purpose_void      - 0 to 3
 * @property {number} financial_doubter - 0 to 1
 *
 * @typedef {Object} QuizResult
 * @property {Archetype} archetype
 * @property {ArchetypeScores} scores
 *
 * @typedef {'YES' | 'NO'} Answer
 *
 * @typedef {Answer[]} QuizAnswers - Array of 8 answers in order (Q1–Q8)
 */
