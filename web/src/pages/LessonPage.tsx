import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import lessonSource from '../../../curriculum/level-01/lesson-01.md?raw'
import { FlowDiagram, Inspector } from '../components/FlowDiagram.tsx'
import { MarkdownBody } from '../components/MarkdownBody.tsx'
import { Quiz } from '../components/Quiz.tsx'
import { SiteHeader } from '../components/SiteHeader.tsx'
import { findLesson } from '../content/curriculum.ts'
import { FLOWS, FLOW_COLOR, type FlowId, type NodeId } from '../content/lesson01.ts'
import { useProgress } from '../lib/progress.ts'

const GhostCar = lazy(() =>
  import('../scenes/GhostCar.tsx').then((module) => ({ default: module.GhostCar })),
)

export function LessonPage() {
  const { id = '' } = useParams()
  const found = findLesson(id)
  const { progress, markCurrent, markCompleted } = useProgress()
  const [tab, setTab] = useState<'diagram' | 'model'>('diagram')
  const [flows, setFlows] = useState<FlowId[]>(FLOWS.map((flow) => flow.id))
  const [selected, setSelected] = useState<NodeId>('engine')
  const [playing, setPlaying] = useState(false)
  const [yaw, setYaw] = useState(0.15)
  const active = useMemo(() => new Set(flows), [flows])

  useEffect(() => {
    if (found?.lesson.available) markCurrent(found.lesson.id)
  }, [found?.lesson.available, found?.lesson.id, markCurrent])

  if (!found) {
    return (
      <div className="shell">
        <SiteHeader meta="Không có bài" />
        <article className="locked">
          <h1>Không thấy bài này</h1>
          <p>
            <Link to="/">Quay lại bản đồ</Link>
          </p>
        </article>
      </div>
    )
  }

  if (!found.lesson.available || found.lesson.id !== 'L01') {
    return (
      <div className="shell">
        <SiteHeader meta={`${found.lesson.id} · chưa mở`} />
        <article className="locked">
          <p className="kicker">Level {found.level.id}</p>
          <h1>{found.lesson.title}</h1>
          <p>{found.lesson.question}</p>
          <p>Bài này nằm trên lộ trình. Nội dung và hình sẽ mở khi bạn học tới, sau Lesson 01.</p>
          <p>
            <Link to="/">Về bản đồ các bước</Link>
          </p>
        </article>
      </div>
    )
  }

  const activeFlows = FLOWS.filter((flow) => active.has(flow.id))
  const hints =
    activeFlows.length === FLOWS.length
      ? 'Cả năm luồng đang bật. Tắt một màu để nhìn riêng đường đó.'
      : activeFlows.map((flow) => flow.hint).join(' · ')

  function toggle(flow: FlowId) {
    setFlows((current) =>
      current.includes(flow) ? current.filter((item) => item !== flow) : [...current, flow],
    )
  }

  return (
    <div className="shell">
      <SiteHeader meta={`Level ${found.level.id} · ${found.lesson.id}`} />
      <div className="lesson-grid">
        <article className="lesson-copy">
          <p className="kicker">
            {found.level.title} · {found.lesson.id}
          </p>
          <MarkdownBody source={lessonSource} />
        </article>
        <aside className="stage-col">
          <div className="panel">
            <div className="stage-bar">
              <div className="tabs">
                <button type="button" className={tab === 'diagram' ? 'is-on' : ''} onClick={() => setTab('diagram')}>
                  Sơ đồ 2D
                </button>
                <button type="button" className={tab === 'model' ? 'is-on' : ''} onClick={() => setTab('model')}>
                  Xe 3D
                </button>
              </div>
              <button type="button" className={playing ? 'is-on' : ''} onClick={() => setPlaying((value) => !value)}>
                {playing ? 'Dừng dòng năng lượng' : 'Chạy dòng năng lượng'}
              </button>
            </div>
            <div className="toggles" role="group" aria-label="Bật tắt luồng">
              {FLOWS.map((flow) => {
                const on = active.has(flow.id)
                return (
                  <button
                    key={flow.id}
                    type="button"
                    className={on ? 'is-on' : ''}
                    aria-pressed={on}
                    style={on ? { background: FLOW_COLOR[flow.id] } : undefined}
                    onClick={() => toggle(flow.id)}
                  >
                    <i className="swatch" style={{ background: FLOW_COLOR[flow.id] }} />
                    {flow.label}
                  </button>
                )
              })}
            </div>
            <p className="flow-hints">{hints || 'Hãy bật ít nhất một luồng để thấy đường đi.'}</p>
            {tab === 'diagram' ? (
              <FlowDiagram active={active} playing={playing} selected={selected} onSelect={setSelected} />
            ) : (
              <>
                <div className="model-bar">
                  <button type="button" onClick={() => setYaw((value) => value + 0.45)}>
                    Xoay trái
                  </button>
                  <button type="button" onClick={() => setYaw((value) => value - 0.45)}>
                    Xoay phải
                  </button>
                </div>
                <Suspense fallback={<p className="model-note">Đang mở mô hình 3D…</p>}>
                  <div className="canvas-wrap">
                    <GhostCar
                      active={active}
                      playing={playing}
                      selected={selected}
                      onSelect={setSelected}
                      yaw={yaw}
                    />
                  </div>
                </Suspense>
                <p className="model-note">
                  Kéo trên hình để xoay, lăn để phóng to. Khối trong suốt là sơ đồ bố trí cầu trước, không phải CAD của
                  Honda City. Piston chỉ báo nhịp máy. Mặt cắt 4 thì nằm ở Lesson 05.
                </p>
              </>
            )}
            <Inspector id={selected} />
          </div>
        </aside>
      </div>
      <Quiz completed={progress.completed.includes('L01')} onPass={() => markCompleted('L01')} />
    </div>
  )
}
