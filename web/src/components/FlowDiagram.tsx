import type { CSSProperties } from 'react'
import {
  FLOW_COLOR,
  isFlowActive,
  type DiagramRow,
  type FlowId,
  type PartDetail,
} from '../content/lesson01.ts'

type Props = {
  active: ReadonlySet<FlowId>
  playing: boolean
  selected: string | null
  onSelect: (id: string) => void
  diagram: DiagramRow[]
  details: Record<string, PartDetail>
  partFlows: Record<string, FlowId[]>
}

function flowStyle(flow: FlowId): CSSProperties {
  return { '--c': FLOW_COLOR[flow] } as CSSProperties
}

function NodeButton({
  id,
  active,
  selected,
  onSelect,
  details,
  partFlows,
}: {
  id: string
  active: ReadonlySet<FlowId>
  selected: string | null
  onSelect: (id: string) => void
  details: Record<string, PartDetail>
  partFlows: Record<string, FlowId[]>
}) {
  const detail = details[id]
  const on = isFlowActive(id, active, partFlows)
  const className = ['node', on ? '' : 'is-dim', selected === id ? 'is-selected' : ''].filter(Boolean).join(' ')
  return (
    <button type="button" className={className} onClick={() => onSelect(id)} aria-pressed={selected === id}>
      <strong>{detail.title}</strong>
      <small>{detail.chip ?? detail.en}</small>
    </button>
  )
}

function HLink({ flow, on, playing }: { flow: FlowId; on: boolean; playing: boolean }) {
  return (
    <span className={on ? `hlink is-on${playing ? ' is-run' : ''}` : 'hlink is-off'} style={flowStyle(flow)} aria-hidden="true">
      <i />
    </span>
  )
}

function VLinks({ flows, active, playing }: { flows: FlowId[]; active: ReadonlySet<FlowId>; playing: boolean }) {
  const shown = flows.filter((flow) => active.has(flow))
  if (shown.length === 0) return <div className="vlinks" />
  return (
    <div className="vlinks" aria-hidden="true">
      {shown.map((flow) => (
        <span key={flow} className={playing ? 'vlink is-run' : 'vlink'} style={flowStyle(flow)} />
      ))}
    </div>
  )
}

export function FlowDiagram({ active, playing, selected, onSelect, diagram, details, partFlows }: Props) {
  return (
    <div className="diagram">
      {diagram.map((row, index) => {
        if (row.kind === 'spine') {
          return (
            <div key={row.id}>
              <NodeButton id={row.id} active={active} selected={selected} onSelect={onSelect} details={details} partFlows={partFlows} />
              <VLinks flows={row.below} active={active} playing={playing} />
            </div>
          )
        }
        if (row.kind === 'pair') {
          return (
            <div key={`${row.to}-${index}`}>
              <div className="row-side">
                <NodeButton id={row.from} active={active} selected={selected} onSelect={onSelect} details={details} partFlows={partFlows} />
                <HLink flow={row.flow} on={active.has(row.flow)} playing={playing} />
                <NodeButton id={row.to} active={active} selected={selected} onSelect={onSelect} details={details} partFlows={partFlows} />
              </div>
              <VLinks flows={row.below} active={active} playing={playing} />
            </div>
          )
        }
        return (
          <div key={row.center}>
            <div className="row-side">
              <NodeButton id={row.left} active={active} selected={selected} onSelect={onSelect} details={details} partFlows={partFlows} />
              <HLink flow={row.leftFlow} on={active.has(row.leftFlow)} playing={playing} />
              <NodeButton id={row.center} active={active} selected={selected} onSelect={onSelect} details={details} partFlows={partFlows} />
              <HLink flow={row.rightFlow} on={active.has(row.rightFlow)} playing={playing} />
              <NodeButton id={row.right} active={active} selected={selected} onSelect={onSelect} details={details} partFlows={partFlows} />
            </div>
            <VLinks flows={row.below} active={active} playing={playing} />
          </div>
        )
      })}
    </div>
  )
}

export function Inspector({ id, details }: { id: string; details: Record<string, PartDetail> }) {
  const detail = details[id]
  if (!detail) return null
  return (
    <article className="inspector">
      <h3>{detail.title}</h3>
      <p className="en">{detail.en}</p>
      <dl>
        <div>
          <dt>Là gì</dt>
          <dd>{detail.what}</dd>
        </div>
        <div>
          <dt>Vì sao xe cần</dt>
          <dd>{detail.why}</dd>
        </div>
        <div>
          <dt>Nếu hỏng</dt>
          <dd>{detail.failure}</dd>
        </div>
        <div>
          <dt>Người lái thấy gì</dt>
          <dd>{detail.symptom}</dd>
        </div>
      </dl>
    </article>
  )
}
