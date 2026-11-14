import { AIR_FLOWS, FLOWS, type DiagramRow, type Essay, type FlowId, type Mcq, type PartDetail } from './lesson01.ts'

const ALL_FLOWS = [...FLOWS, ...AIR_FLOWS]

export function pickFlows(...ids: FlowId[]) {
  return ALL_FLOWS.filter((flow) => ids.includes(flow.id))
}

export type LessonPack = {
  id: string
  scene: 'ghost' | 'blocks' | 'engine'
  sceneNote: string
  defaultNode: string
  flows: readonly { id: FlowId; label: string; hint: string }[]
  details: Record<string, PartDetail>
  partFlows: Record<string, FlowId[]>
  diagram: DiagramRow[]
  quiz: Mcq[]
  essays: Essay[]
}

export function detail(
  id: string,
  title: string,
  en: string,
  flows: FlowId[],
  what: string,
  why: string,
  failure: string,
  symptom: string,
  chip?: string,
): { detail: PartDetail; flows: FlowId[] } {
  return {
    detail: { id, title, en, chip, what, why, failure, symptom },
    flows,
  }
}

export function assemble(
  id: string,
  scene: LessonPack['scene'],
  sceneNote: string,
  defaultNode: string,
  flows: LessonPack['flows'],
  diagram: DiagramRow[],
  parts: ReturnType<typeof detail>[],
  quiz: Mcq[],
  essays: Essay[],
): LessonPack {
  const details: Record<string, PartDetail> = {}
  const partFlows: Record<string, FlowId[]> = {}
  for (const part of parts) {
    details[part.detail.id] = part.detail
    partFlows[part.detail.id] = part.flows
  }
  return { id, scene, sceneNote, defaultNode, flows, details, partFlows, diagram, quiz, essays }
}
