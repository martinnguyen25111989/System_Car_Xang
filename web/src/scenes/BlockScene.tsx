import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { CanvasTexture } from 'three'
import type { Mesh } from 'three'
import {
  FLOW_COLOR,
  isFlowActive,
  type DiagramRow,
  type FlowId,
  type PartDetail,
} from '../content/lesson01.ts'

type Props = {
  diagram: DiagramRow[]
  details: Record<string, PartDetail>
  partFlows: Record<string, FlowId[]>
  active: ReadonlySet<FlowId>
  playing: boolean
  selected: string | null
  onSelect: (id: string) => void
  yaw: number
}

type Placed = { id: string; position: [number, number, number]; color: string }

function makeLabel(text: string) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return null
  const font = '600 32px "Be Vietnam Pro", "Segoe UI", sans-serif'
  context.font = font
  const width = Math.ceil(context.measureText(text).width) + 36
  canvas.width = width
  canvas.height = 56
  context.font = font
  context.fillStyle = 'rgba(12, 16, 21, 0.9)'
  context.beginPath()
  context.roundRect(2, 2, width - 4, 52, 26)
  context.fill()
  context.lineWidth = 2
  context.strokeStyle = '#3a4658'
  context.stroke()
  context.fillStyle = '#e8edf4'
  context.textBaseline = 'middle'
  context.fillText(text, 18, 28)
  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return { texture, aspect: width / 56 }
}

function Tag({ position, text, dim }: { position: [number, number, number]; text: string; dim: boolean }) {
  const label = useMemo(() => makeLabel(text), [text])
  useEffect(() => {
    return () => label?.texture.dispose()
  }, [label])
  if (!label) return null
  const height = 0.22
  return (
    <sprite position={position} scale={[height * label.aspect, height, 1]}>
      <spriteMaterial map={label.texture} transparent opacity={dim ? 0.38 : 1} depthTest={false} />
    </sprite>
  )
}

function place(diagram: DiagramRow[], partFlows: Record<string, FlowId[]>): Placed[] {
  const gap = 0.72
  const top = ((diagram.length - 1) * gap) / 2
  const placed: Placed[] = []
  diagram.forEach((row, index) => {
    const y = top - index * gap
    const colorOf = (id: string) => FLOW_COLOR[partFlows[id]?.[0] ?? 'mechanical']
    if (row.kind === 'spine') {
      placed.push({ id: row.id, position: [0, y, 0], color: colorOf(row.id) })
    } else if (row.kind === 'pair') {
      placed.push({ id: row.from, position: [-0.95, y, 0], color: colorOf(row.from) })
      placed.push({ id: row.to, position: [0.95, y, 0], color: colorOf(row.to) })
    } else {
      placed.push({ id: row.left, position: [-1.55, y, 0], color: colorOf(row.left) })
      placed.push({ id: row.center, position: [0, y, 0], color: colorOf(row.center) })
      placed.push({ id: row.right, position: [1.55, y, 0], color: colorOf(row.right) })
    }
  })
  return placed
}

function Packet({ playing, nodes }: { playing: boolean; nodes: Placed[] }) {
  const ref = useRef<Mesh | null>(null)
  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh || nodes.length === 0) return
    mesh.visible = playing
    if (!playing) return
    const cursor = (clock.getElapsedTime() * 0.45) % nodes.length
    const index = Math.floor(cursor)
    const next = nodes[(index + 1) % nodes.length]
    const current = nodes[index]
    const t = cursor - index
    mesh.position.set(
      current.position[0] + (next.position[0] - current.position[0]) * t,
      current.position[1] + (next.position[1] - current.position[1]) * t,
      0.28,
    )
  })
  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#e3a008" emissive="#e3a008" emissiveIntensity={1.1} />
    </mesh>
  )
}

function Stack(props: Omit<Props, 'yaw'>) {
  const nodes = useMemo(() => place(props.diagram, props.partFlows), [props.diagram, props.partFlows])
  return (
    <group>
      {nodes.map((node) => {
        const on = isFlowActive(node.id, props.active, props.partFlows)
        const picked = props.selected === node.id
        const title = props.details[node.id]?.title ?? node.id
        return (
          <group key={node.id} position={node.position}>
            <mesh
              onClick={(event) => {
                event.stopPropagation()
                props.onSelect(node.id)
              }}
            >
              <boxGeometry args={[1.05, 0.38, 0.28]} />
              <meshStandardMaterial
                color={node.color}
                roughness={0.4}
                metalness={0.25}
                transparent={!on}
                opacity={on ? 1 : 0.28}
                emissive={node.color}
                emissiveIntensity={picked ? 0.65 : on ? 0.22 : 0.02}
              />
            </mesh>
            <Tag position={[0, 0.38, 0]} text={title} dim={!on} />
          </group>
        )
      })}
      <Packet playing={props.playing} nodes={nodes} />
    </group>
  )
}

export function BlockScene(props: Props) {
  const distance = Math.max(6.2, props.diagram.length * 0.85)
  return (
    <Canvas camera={{ position: [0.2, 0.4, distance], fov: 34 }} dpr={[1, 1.75]}>
      <color attach="background" args={['#0e1218']} />
      <hemisphereLight args={['#d7e4f2', '#171b20', 0.8]} />
      <directionalLight position={[4, 6, 5]} intensity={1.35} />
      <OrbitControls enablePan={false} minDistance={3} maxDistance={16} target={[0, 0, 0]} />
      <group rotation={[0, props.yaw, 0]}>
        <Stack
          diagram={props.diagram}
          details={props.details}
          partFlows={props.partFlows}
          active={props.active}
          playing={props.playing}
          selected={props.selected}
          onSelect={props.onSelect}
        />
      </group>
    </Canvas>
  )
}
