import { useState } from 'react'
import { Link } from 'react-router-dom'
import { lessonCount, levels } from '../content/curriculum.ts'
import { Legend } from '../components/Legend.tsx'
import { SiteHeader } from '../components/SiteHeader.tsx'
import { useProgress } from '../lib/progress.ts'

export function LearningMap() {
  const [openLevel, setOpenLevel] = useState(1)
  const { progress } = useProgress()
  const done = progress.completed.length

  return (
    <div className="shell">
      <SiteHeader meta={`${done} / ${lessonCount} bài đã học`} />
      <p className="kicker">Level 1 → Level 9</p>
      <h1>Các bước để đọc một chiếc xe xăng</h1>
      <p className="lede">
        Ba mươi hai bài nền mở từ cách xe biến xăng thành chuyển động đến lúc chẩn đoán. Level 9 là bài điện nâng cao của City 2024.
        Màu dưới đây là ngôn ngữ của mọi sơ đồ: mỗi màu là một luồng, không phải một bước thời gian.
        Khí nạp và khí xả xuất hiện khi bài nói về máy.
      </p>
      <Legend />
      <div className="timeline">
        {levels.map((level) => {
          const open = openLevel === level.id
          return (
            <section className={open ? 'level is-open' : 'level'} key={level.id}>
              <button
                type="button"
                className="level-toggle"
                aria-expanded={open}
                onClick={() => setOpenLevel(open ? 0 : level.id)}
              >
                <span className="level-index">0{level.id}</span>
                <span>
                  <h2>{level.title}</h2>
                  <p>{level.blurb}</p>
                </span>
                <span className="chev">{open ? 'Thu gọn' : 'Xem bài'}</span>
              </button>
              {open ? (
                <ol className="lessons">
                  {level.lessons.map((lesson) => {
                    const learned = progress.completed.includes(lesson.id)
                    const current = lesson.available && !learned
                    if (!lesson.available) {
                      return (
                        <li key={lesson.id}>
                          <div className="lesson-row is-locked">
                            <span className="lesson-id">{lesson.id}</span>
                            <span>
                              <strong>{lesson.title}</strong>
                              <em>{lesson.question}</em>
                            </span>
                            <span className="badge">Chưa mở</span>
                          </div>
                        </li>
                      )
                    }
                    return (
                      <li key={lesson.id}>
                        <Link
                          className={current ? 'lesson-row is-current' : 'lesson-row'}
                          to={`/lesson/${lesson.id}`}
                        >
                          <span className="lesson-id">{lesson.id}</span>
                          <span>
                            <strong>{lesson.title}</strong>
                            <em>{lesson.question}</em>
                          </span>
                          <span className={learned ? 'badge is-done' : 'badge is-now'}>
                            {learned ? 'Đã học' : 'Đang mở'}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              ) : null}
            </section>
          )
        })}
      </div>
    </div>
  )
}
