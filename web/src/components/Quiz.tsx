import { useState } from 'react'
import type { Essay, Mcq } from '../content/lesson01.ts'

const PASS = 4

export function Quiz({
  completed,
  onPass,
  quiz,
  essays,
}: {
  completed: boolean
  onPass: () => void
  quiz: Mcq[]
  essays: Essay[]
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [openGuides, setOpenGuides] = useState<Record<string, boolean>>({})

  const allAnswered = quiz.every((item) => answers[item.id])

  function submit() {
    const next = quiz.filter((item) => answers[item.id] === item.answer).length
    setScore(next)
    setSubmitted(true)
    if (next >= PASS) onPass()
  }

  return (
    <section className="quiz" id="quiz">
      <h2>Quiz</h2>
      <p className="lede">
        Năm câu trắc nghiệm chấm ngay trên trang. Ba câu tự luận để bạn kể lại chuỗi, rồi mới mở gợi ý.
        {completed ? ' Bài này đã được đánh dấu đã học.' : ''}
      </p>
      {quiz.map((item, index) => (
        <fieldset className="mcq" key={item.id}>
          <p>
            {index + 1}. {item.prompt}
          </p>
          <div className="choices">
            {item.choices.map((choice) => {
              const picked = answers[item.id] === choice.id
              const show = submitted && picked
              const mark = show ? (choice.id === item.answer ? 'is-right' : 'is-wrong') : ''
              return (
                <label key={choice.id} className={mark}>
                  <input
                    type="radio"
                    name={item.id}
                    value={choice.id}
                    checked={picked}
                    onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: choice.id }))}
                  />
                  <span>{choice.text}</span>
                </label>
              )
            })}
          </div>
          {submitted ? <p className="explain">{item.explain}</p> : null}
        </fieldset>
      ))}
      <div className="actions">
        <button type="button" className="primary" disabled={!allAnswered} onClick={submit}>
          Chấm trắc nghiệm
        </button>
      </div>
      {score !== null ? (
        <p className="score">
          {score}/{quiz.length}.
          {score >= PASS
            ? ' Đủ để ghi nhận bạn đã nắm chuỗi chính. Bài được đánh dấu đã học trên bản đồ.'
            : ' Chưa đủ 4/5. Đọc lại đoạn chuỗi bị sai rồi chấm lại.'}
        </p>
      ) : null}
      {essays.map((item, index) => (
        <article className="essay" key={item.id}>
          <p>
            Tự luận {index + 1}. {item.prompt}
          </p>
          <textarea aria-label={`Tự luận ${index + 1}`} />
          <div className="actions">
            <button
              type="button"
              onClick={() => setOpenGuides((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
            >
              {openGuides[item.id] ? 'Ẩn gợi ý' : 'Đối chiếu gợi ý'}
            </button>
          </div>
          {openGuides[item.id] ? <p className="guide">{item.guide}</p> : null}
        </article>
      ))}
    </section>
  )
}
