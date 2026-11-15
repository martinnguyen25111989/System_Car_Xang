import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FlowDiagram, Inspector } from '../components/FlowDiagram.tsx'
import { MarkdownBody } from '../components/MarkdownBody.tsx'
import { Quiz } from '../components/Quiz.tsx'
import { SiteHeader } from '../components/SiteHeader.tsx'
import { findLesson } from '../content/curriculum.ts'
import { FLOW_COLOR, type FlowId } from '../content/lesson01.ts'
import { lessonMarkdown } from '../content/markdown.ts'
import { getPack } from '../content/catalog.ts'
import { useProgress } from '../lib/progress.ts'

const GhostCar = lazy(() =>
  import('../scenes/GhostCar.tsx').then((module) => ({ default: module.GhostCar })),
)
const BlockScene = lazy(() =>
  import('../scenes/BlockScene.tsx').then((module) => ({ default: module.BlockScene })),
)
const EngineScene = lazy(() =>
  import('../scenes/EngineScene.tsx').then((module) => ({ default: module.EngineScene })),
)
const ElectricalCar = lazy(() =>
  import('../scenes/ElectricalCar.tsx').then((module) => ({ default: module.ElectricalCar })),
)

export function LessonPage() {
  const { id = '' } = useParams()
  return <LessonView key={id} id={id} />
}

function LessonView({ id }: { id: string }) {
  const found = findLesson(id)
  const pack = getPack(id)
  const source = lessonMarkdown(id)
  const { progress, markCurrent, markCompleted } = useProgress()
  const [tab, setTab] = useState<'diagram' | 'model'>('diagram')
  const [flows, setFlows] = useState<FlowId[]>(() => (pack ? pack.flows.map((flow) => flow.id) : []))
  const [selected, setSelected] = useState(pack?.defaultNode ?? '')
  const [playing, setPlaying] = useState(false)
  const [yaw, setYaw] = useState(0.15)
  const [viewId, setViewId] = useState(pack?.views?.[0]?.id ?? '')
  const active = useMemo(() => new Set(flows), [flows])
  const diagram = pack?.views?.find((item) => item.id === viewId)?.diagram ?? pack?.diagram ?? []

  useEffect(() => {
    if (found?.lesson.available && pack) markCurrent(found.lesson.id)
  }, [found?.lesson.available, found?.lesson.id, markCurrent, pack])

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

  if (!found.lesson.available || !pack || !source) {
    return (
      <div className="shell">
        <SiteHeader meta={`${found.lesson.id} · chưa mở`} />
        <article className="locked">
          <p className="kicker">Level {found.level.id}</p>
          <h1>{found.lesson.title}</h1>
          <p>{found.lesson.question}</p>
          <p>Bài này nằm trên lộ trình nhưng nội dung chưa được gắn vào app.</p>
          <p>
            <Link to="/">Về bản đồ các bước</Link>
          </p>
        </article>
      </div>
    )
  }

  const activeFlows = pack.flows.filter((flow) => active.has(flow.id))
  const hints =
    activeFlows.length === pack.flows.length
      ? 'Mọi luồng của bài này đang bật. Tắt một màu để nhìn riêng đường đó.'
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
          <MarkdownBody source={source} />
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
              {pack.flows.map((flow) => {
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
            {tab === 'diagram' && pack.views ? (
              <div className="tabs view-tabs">
                {pack.views.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={viewId === item.id ? 'is-on' : ''}
                    onClick={() => setViewId(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
            {tab === 'diagram' ? (
              <FlowDiagram
                active={active}
                playing={playing}
                selected={selected}
                onSelect={setSelected}
                diagram={diagram}
                details={pack.details}
                partFlows={pack.partFlows}
              />
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
                    {pack.scene === 'ghost' ? (
                      <GhostCar
                        active={active}
                        playing={playing}
                        selected={selected}
                        onSelect={setSelected}
                        yaw={yaw}
                      />
                    ) : pack.scene === 'electrical' ? (
                      <ElectricalCar
                        active={active}
                        playing={playing}
                        selected={selected}
                        onSelect={setSelected}
                        yaw={yaw}
                      />
                    ) : pack.scene === 'engine' ? (
                      <EngineScene
                        details={pack.details}
                        playing={playing}
                        selected={selected}
                        onSelect={setSelected}
                        yaw={yaw}
                      />
                    ) : (
                      <BlockScene
                        diagram={pack.diagram}
                        details={pack.details}
                        partFlows={pack.partFlows}
                        active={active}
                        playing={playing}
                        selected={selected}
                        onSelect={setSelected}
                        yaw={yaw}
                      />
                    )}
                  </div>
                </Suspense>
                <p className="model-note">{pack.sceneNote}</p>
              </>
            )}
            <Inspector id={selected} details={pack.details} />
          </div>
        </aside>
      </div>
      <Quiz
        quiz={pack.quiz}
        essays={pack.essays}
        completed={progress.completed.includes(id)}
        onPass={() => markCompleted(id)}
      />
    </div>
  )
}
