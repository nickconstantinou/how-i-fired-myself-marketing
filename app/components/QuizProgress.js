'use client'

/**
 * Animated progress bar for the Fear Quiz.
 * Shows "X of 8" complete with a smooth fill animation.
 *
 * @param {number} current - Current question number (1–8)
 * @param {number} total   - Total questions (always 8)
 */
export default function QuizProgress({ current, total = 8 }) {
  const pct = Math.round(((current - 1) / total) * 100)

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-400">
          Question {current} of {total}
        </span>
        <span className="text-sm font-semibold text-amber-400">
          {pct}%
        </span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
        />
      </div>
    </div>
  )
}
