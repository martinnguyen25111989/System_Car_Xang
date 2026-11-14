import { DETAILS, DIAGRAM, ESSAYS, FLOWS, PART_FLOWS, QUIZ } from './lesson01.ts'
import type { LessonPack } from './pack.ts'
import { LEVEL1 } from './packs/level1.ts'
import { LEVEL2 } from './packs/level2.ts'
import { LEVEL3 } from './packs/level3.ts'
import { LEVEL4 } from './packs/level4.ts'
import { LEVEL5 } from './packs/level5.ts'
import { LEVEL6 } from './packs/level6.ts'
import { LEVEL7 } from './packs/level7.ts'
import { LEVEL8 } from './packs/level8.ts'

const L01: LessonPack = {
  id: 'L01',
  scene: 'ghost',
  sceneNote:
    'Kéo trên hình để xoay, lăn để phóng to. Khối trong suốt là sơ đồ bố trí cầu trước, không phải CAD của Honda City. Piston chỉ báo nhịp máy. Mặt cắt 4 thì nằm ở Lesson 05.',
  defaultNode: 'engine',
  flows: FLOWS,
  details: DETAILS,
  partFlows: PART_FLOWS,
  diagram: DIAGRAM,
  quiz: QUIZ,
  essays: ESSAYS,
}

const PACKS: Record<string, LessonPack> = {
  L01,
  ...LEVEL1,
  ...LEVEL2,
  ...LEVEL3,
  ...LEVEL4,
  ...LEVEL5,
  ...LEVEL6,
  ...LEVEL7,
  ...LEVEL8,
}

export function getPack(id: string): LessonPack | null {
  return PACKS[id] ?? null
}
