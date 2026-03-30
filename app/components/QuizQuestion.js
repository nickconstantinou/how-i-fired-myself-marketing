'use client'

/**
 * Single quiz question — YES/NO answer.
 * Animates in on mount, animates out on selection.
 *
 * @param {Object}   props
 * @param {string}   props.question    - The question text
 * @param {number}   props.number      - Question number (1–8)
 * @param {string|null} props.selected - 'YES' | 'NO' | null
 * @param {Function} props.onAnswer    - (answer: 'YES'|'NO') => void
 */
export default function QuizQuestion({ question, number, selected, onAnswer }) {
  return (
    <div className="w-full">
      {/* Question text */}
      <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-8 text-center">
        {question}
      </p>

      {/* YES / NO buttons */}
      <div className="grid grid-cols-2 gap-4">
        {(
          [
            { value: 'YES', label: 'Yes', sublabel: 'This is true for me' },
            { value: 'NO',  label: 'No',  sublabel: 'Not quite' },
          ]
        ).map(({ value, label, sublabel }) => {
          const isSelected = selected === value
          return (
            <button
              key={value}
              onClick={() => onAnswer(value)}
              aria-pressed={isSelected}
              className={`
                relative flex flex-col items-center justify-center
                p-6 sm:p-8 rounded-xl border-2 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900
                ${isSelected
                  ? 'border-amber-400 bg-amber-400/10 text-white'
                  : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                }
              `}
            >
              <span className="text-2xl font-bold mb-1">{label}</span>
              <span className={`text-sm ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                {sublabel}
              </span>

              {/* Selected checkmark */}
              {isSelected && (
                <span className="absolute top-3 right-3 text-amber-400 text-lg" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
