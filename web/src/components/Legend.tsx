import { FLOW_COLOR, FLOWS } from '../content/lesson01.ts'

export function Legend() {
  return (
    <ul className="legend">
      {FLOWS.map((flow) => (
        <li key={flow.id}>
          <i style={{ background: FLOW_COLOR[flow.id] }} />
          {flow.label}
        </li>
      ))}
    </ul>
  )
}
