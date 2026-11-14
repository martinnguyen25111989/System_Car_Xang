import { AIR_FLOWS, FLOW_COLOR, FLOWS } from '../content/lesson01.ts'

const LEGEND = [...FLOWS, ...AIR_FLOWS]

export function Legend() {
  return (
    <ul className="legend">
      {LEGEND.map((flow) => (
        <li key={flow.id}>
          <i style={{ background: FLOW_COLOR[flow.id] }} />
          {flow.label}
        </li>
      ))}
    </ul>
  )
}
