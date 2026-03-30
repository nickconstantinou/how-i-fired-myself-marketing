const { test, describe } = require('node:test')
const assert = require('node:assert')
const { scoreQuiz } = require('./quizScoring')

// Helper — y(3,5) means Q3=YES, Q5=YES, all others=NO
const y = (...qs) => {
  const answers = Array(8).fill('NO')
  qs.forEach((q) => { answers[q - 1] = 'YES' })
  return answers
}

describe('quizScoring', () => {
  describe('all YES answers', () => {
    test('each archetype gets its expected score', () => {
      const result = scoreQuiz(y(1, 2, 3, 4, 5, 6, 7, 8))
      assert.equal(result.scores.identity_hollow, 2)   // Q1, Q5
      assert.equal(result.scores.spouse_mismatch, 2)   // Q2, Q7
      assert.equal(result.scores.purpose_void, 3)      // Q3, Q4, Q8
      assert.equal(result.scores.financial_doubter, 1) // Q6
    })

    test('dominant archetype is purpose_void (highest score: 3)', () => {
      const result = scoreQuiz(y(1, 2, 3, 4, 5, 6, 7, 8))
      assert.equal(result.archetype, 'purpose_void')
    })
  })

  describe('all NO answers', () => {
    test('all scores are zero', () => {
      const result = scoreQuiz(y())
      assert.equal(result.scores.identity_hollow, 0)
      assert.equal(result.scores.spouse_mismatch, 0)
      assert.equal(result.scores.purpose_void, 0)
      assert.equal(result.scores.financial_doubter, 0)
    })

    test('tie-break defaults to purpose_void', () => {
      const result = scoreQuiz(y())
      assert.equal(result.archetype, 'purpose_void')
    })
  })

  describe('single-archetype answers', () => {
    test('Identity Hollow only: Q1 + Q5 → score=2, others=0', () => {
      const result = scoreQuiz(y(1, 5))
      assert.equal(result.scores.identity_hollow, 2)
      assert.equal(result.scores.spouse_mismatch, 0)
      assert.equal(result.scores.purpose_void, 0)
      assert.equal(result.scores.financial_doubter, 0)
      assert.equal(result.archetype, 'identity_hollow')
    })

    test('Spouse Mismatch only: Q2 + Q7 → score=2, others=0', () => {
      const result = scoreQuiz(y(2, 7))
      assert.equal(result.scores.spouse_mismatch, 2)
      assert.equal(result.archetype, 'spouse_mismatch')
    })

    test('Purpose Void only: Q3 + Q4 + Q8 → score=3, others=0', () => {
      const result = scoreQuiz(y(3, 4, 8))
      assert.equal(result.scores.purpose_void, 3)
      assert.equal(result.archetype, 'purpose_void')
    })

    test('Financial Doubter only: Q6 → score=1, others=0', () => {
      const result = scoreQuiz(y(6))
      assert.equal(result.scores.financial_doubter, 1)
      assert.equal(result.archetype, 'financial_doubter')
    })
  })

  describe('tie-breaking', () => {
    test('two archetypes tied at non-zero → higher priority wins', () => {
      // Q3=YES, Q4=YES (purpose_void=2) + Q1=YES, Q5=YES (identity_hollow=2)
      // purpose_void wins (higher priority)
      const result = scoreQuiz(y(1, 3, 4, 5))
      assert.equal(result.scores.purpose_void, 2)
      assert.equal(result.scores.identity_hollow, 2)
      assert.equal(result.archetype, 'purpose_void')
    })

    test('all four archetypes tied at 0 → purpose_void wins (top priority)', () => {
      const result = scoreQuiz(y())
      assert.equal(result.archetype, 'purpose_void')
    })
  })

  describe('mixed answers — realistic scenarios', () => {
    test('financial_doubter + spouse_mismatch tied at 1 → spouse_mismatch wins (priority)', () => {
      // Q2=YES (spouse), Q6=YES (financial), rest NO
      const result = scoreQuiz(y(2, 6))
      assert.equal(result.scores.spouse_mismatch, 1)
      assert.equal(result.scores.financial_doubter, 1)
      // spouse_mismatch wins (higher priority)
      assert.equal(result.archetype, 'spouse_mismatch')
    })
  })

  describe('input validation', () => {
    test('throws on wrong number of answers', () => {
      assert.throws(() => scoreQuiz(['YES']), /exactly 8 YES\/NO strings/)
      assert.throws(() => scoreQuiz(['YES', 'NO', 'YES']), /exactly 8 YES\/NO strings/)
    })

    test('throws on invalid answer value', () => {
      const invalid = ['YES', 'NO', 'MAYBE', 'NO', 'NO', 'NO', 'NO', 'NO']
      assert.throws(() => scoreQuiz(invalid), /must be YES or NO/)
    })

    test('throws on non-array input', () => {
      assert.throws(() => scoreQuiz(null), /must be an array/)
      assert.throws(() => scoreQuiz(undefined), /must be an array/)
    })
  })
})
