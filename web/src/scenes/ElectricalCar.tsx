import { Edges, Line, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { CanvasTexture, CatmullRomCurve3, TubeGeometry, Vector3 } from 'three'
import type { Mesh } from 'three'
import { type FlowId } from '../content/lesson01.ts'

type Props = {
  active: ReadonlySet<FlowId>
  playing: boolean
  selected: string | null
  onSelect: (id: string) => void
  yaw: number
}

type V3 = [number, number, number]

const POWER = '#e23d3d'
const ACCENT = '#f08a2a'
const GROUND = '#d5dbe3'
const SIGNAL = '#3dbe7a'
const CAN = '#c084fc'
const LIN = '#3ec6e0'

const NODES: { id: string; label: string; at: V3; size: V3; color: string; flow: FlowId; slot: 'up' | 'down' }[] = [
  { id: 'abs', label: 'ABS/VSA', at: [-1.82, 0.32, 0.22], size: [0.2, 0.1, 0.16], color: CAN, flow: 'can', slot: 'down' },
  { id: 'fuse', label: 'Cầu chì máy', at: [-1.48, 0.58, -0.28], size: [0.18, 0.1, 0.16], color: ACCENT, flow: 'electrical', slot: 'up' },
  { id: 'battery', label: 'Ắc quy', at: [-1.18, 0.4, -0.42], size: [0.2, 0.14, 0.16], color: POWER, flow: 'electrical', slot: 'down' },
  { id: 'alternator', label: 'Máy phát', at: [-0.98, 0.66, 0.32], size: [0.14, 0.14, 0.14], color: POWER, flow: 'electrical', slot: 'up' },
  { id: 'pcm', label: 'PCM', at: [-0.78, 0.9, 0.02], size: [0.18, 0.08, 0.14], color: SIGNAL, flow: 'data', slot: 'up' },
  { id: 'eps', label: 'EPS', at: [-0.42, 0.78, -0.08], size: [0.12, 0.1, 0.12], color: CAN, flow: 'can', slot: 'down' },
  { id: 'cluster', label: 'Đồng hồ', at: [-0.22, 1.12, 0.08], size: [0.2, 0.06, 0.05], color: CAN, flow: 'can', slot: 'up' },
  { id: 'bcm', label: 'BCM', at: [0.02, 0.74, 0.16], size: [0.16, 0.08, 0.12], color: LIN, flow: 'lin', slot: 'down' },
  { id: 'ivi', label: 'Màn hình', at: [0.28, 1.02, -0.02], size: [0.16, 0.07, 0.05], color: CAN, flow: 'can', slot: 'up' },
  { id: 'hvac', label: 'HVAC', at: [0.18, 0.58, -0.22], size: [0.14, 0.1, 0.12], color: LIN, flow: 'lin', slot: 'down' },
  { id: 'srs', label: 'SRS', at: [0.48, 0.4, 0], size: [0.14, 0.08, 0.12], color: '#f0c14a', flow: 'electrical', slot: 'down' },
  { id: 'door', label: 'Cửa trước', at: [0.22, 0.72, 0.68], size: [0.08, 0.22, 0.06], color: LIN, flow: 'lin', slot: 'up' },
  { id: 'doorR', label: 'Cửa sau', at: [0.92, 0.7, 0.68], size: [0.08, 0.22, 0.06], color: LIN, flow: 'lin', slot: 'down' },
  { id: 'tpms', label: 'TPMS', at: [1.42, 0.52, -0.22], size: [0.12, 0.08, 0.1], color: CAN, flow: 'can', slot: 'up' },
  { id: 'park', label: 'Camera', at: [1.82, 0.78, 0.08], size: [0.12, 0.08, 0.1], color: CAN, flow: 'can', slot: 'down' },
  { id: 'antenna', label: 'Anten', at: [0.55, 1.52, 0], size: [0.08, 0.06, 0.08], color: CAN, flow: 'can', slot: 'up' },
  { id: 'lamp', label: 'Đèn pha', at: [-2.02, 0.48, 0.42], size: [0.08, 0.08, 0.1], color: POWER, flow: 'electrical', slot: 'up' },
]

const GROUNDS: { id: string; label: string; at: V3 }[] = [
  { id: 'g1', label: 'G1', at: [-1.05, 0.18, 0.05] },
  { id: 'g2', label: 'G2', at: [-0.48, 0.16, 0.12] },
  { id: 'g3', label: 'G3', at: [0.35, 0.14, 0] },
  { id: 'g4', label: 'G4', at: [1.15, 0.18, -0.12] },
  { id: 'g5', label: 'G5', at: [-0.05, 0.48, 0.02] },
  { id: 'g6', label: 'G6', at: [-0.82, 0.52, 0.22] },
]

const STRANDS: { flow: FlowId; color: string; points: V3[]; radius?: number }[] = [
  {
    flow: 'electrical',
    color: POWER,
    radius: 0.018,
    points: [
      [-1.18, 0.4, -0.42],
      [-1.48, 0.55, -0.28],
      [-1.7, 0.4, 0.05],
      [-0.9, 0.48, 0.02],
      [0.05, 0.48, 0.08],
      [1.5, 0.4, 0],
    ],
  },
  {
    flow: 'electrical',
    color: ACCENT,
    points: [
      [-1.48, 0.58, -0.28],
      [-0.9, 0.7, 0.15],
      [-0.2, 0.85, 0.05],
      [0.4, 0.7, -0.05],
    ],
  },
  {
    flow: 'electrical',
    color: POWER,
    points: [
      [-0.98, 0.66, 0.32],
      [-1.18, 0.5, -0.1],
      [-1.18, 0.4, -0.42],
    ],
  },
  {
    flow: 'ground',
    color: GROUND,
    radius: 0.016,
    points: [
      [-1.18, 0.28, -0.42],
      [-1.05, 0.18, 0.05],
      [-0.48, 0.16, 0.12],
      [0.35, 0.14, 0],
      [1.15, 0.18, -0.12],
    ],
  },
  {
    flow: 'ground',
    color: GROUND,
    points: [
      [-0.82, 0.52, 0.22],
      [-0.78, 0.7, 0.08],
      [-0.05, 0.48, 0.02],
    ],
  },
  {
    flow: 'can',
    color: CAN,
    radius: 0.014,
    points: [
      [-0.78, 0.9, 0.02],
      [-1.5, 0.55, 0.12],
      [-1.82, 0.32, 0.22],
    ],
  },
  {
    flow: 'can',
    color: CAN,
    points: [
      [-0.78, 0.9, 0.02],
      [-0.42, 0.78, -0.08],
      [0.02, 0.74, 0.16],
      [-0.22, 1.12, 0.08],
      [0.28, 1.02, -0.02],
      [0.55, 1.35, 0],
    ],
  },
  {
    flow: 'can',
    color: CAN,
    points: [
      [0.02, 0.74, 0.16],
      [0.8, 0.55, 0],
      [1.42, 0.52, -0.22],
      [1.82, 0.78, 0.08],
    ],
  },
  {
    flow: 'lin',
    color: LIN,
    points: [
      [0.02, 0.74, 0.16],
      [0.22, 0.72, 0.68],
      [0.92, 0.7, 0.68],
    ],
  },
  {
    flow: 'lin',
    color: LIN,
    points: [
      [0.02, 0.74, 0.16],
      [0.18, 0.58, -0.22],
    ],
  },
  {
    flow: 'data',
    color: SIGNAL,
    points: [
      [-1.15, 0.78, 0.22],
      [-0.78, 0.9, 0.02],
      [-0.95, 0.62, 0.05],
    ],
  },
]

function makeLabel(text: string) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return null
  const font = '600 26px "Be Vietnam Pro", "Segoe UI", sans-serif'
  context.font = font
  const width = Math.ceil(context.measureText(text).width) + 24
  canvas.width = width
  canvas.height = 44
  context.font = font
  context.fillStyle = 'rgba(10, 14, 20, 0.88)'
  context.beginPath()
  context.roundRect(2, 2, width - 4, 40, 20)
  context.fill()
  context.fillStyle = '#e8edf4'
  context.textBaseline = 'middle'
  context.fillText(text, 12, 22)
  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return { texture, aspect: width / 44 }
}

function Tag({ at, text, dim }: { at: V3; text: string; dim: boolean }) {
  const label = useMemo(() => makeLabel(text), [text])
  useEffect(() => () => label?.texture.dispose(), [label])
  if (!label) return null
  const height = 0.13
  return (
    <sprite position={at} scale={[height * label.aspect, height, 1]}>
      <spriteMaterial map={label.texture} transparent opacity={dim ? 0.25 : 1} depthTest={false} />
    </sprite>
  )
}

function Strand({ points, color, radius = 0.012 }: { points: V3[]; color: string; radius?: number }) {
  const geometry = useMemo(() => {
    const curve = new CatmullRomCurve3(points.map((point) => new Vector3(...point)))
    return new TubeGeometry(curve, 28, radius, 5, false)
  }, [points, radius])
  useEffect(() => () => geometry.dispose(), [geometry])
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} roughness={0.35} />
    </mesh>
  )
}

function Glass({ position, args }: { position: V3; args: V3 }) {
  return (
    <mesh position={position} raycast={() => undefined}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#d7e6f4" transparent opacity={0.08} depthWrite={false} />
      <Edges color="#8eabc4" threshold={20} />
    </mesh>
  )
}

function Body() {
  return (
    <group>
      <Glass position={[0.05, 0.36, 0]} args={[4.25, 0.4, 1.55]} />
      <Glass position={[-1.25, 0.68, 0]} args={[1.35, 0.22, 1.42]} />
      <Glass position={[0.42, 1.08, 0]} args={[2.05, 0.62, 1.32]} />
      <Glass position={[0.4, 1.4, 0]} args={[1.75, 0.06, 1.22]} />
      <Glass position={[1.72, 0.64, 0]} args={[0.85, 0.32, 1.38]} />
      <mesh position={[-2.05, 0.4, 0]} raycast={() => undefined}>
        <boxGeometry args={[0.12, 0.22, 1.35]} />
        <meshStandardMaterial color="#c5ced8" transparent opacity={0.35} />
      </mesh>
      {[
        [-1.45, 0.78],
        [1.4, -0.78],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.22, z]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
          <cylinderGeometry args={[0.28, 0.28, 0.16, 18]} />
          <meshStandardMaterial color="#1a212b" metalness={0.4} roughness={0.45} />
        </mesh>
      ))}
      {[
        [-1.45, -0.78],
        [1.4, 0.78],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.22, z]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
          <cylinderGeometry args={[0.28, 0.28, 0.16, 18]} />
          <meshStandardMaterial color="#1a212b" metalness={0.4} roughness={0.45} />
        </mesh>
      ))}
    </group>
  )
}

function Harness({ active, playing, selected, onSelect }: Omit<Props, 'yaw'>) {
  const packet = useRef<Mesh | null>(null)
  const path = useMemo(
    () =>
      [
        [-1.18, 0.4, -0.42],
        [-1.48, 0.55, -0.28],
        [-0.78, 0.9, 0.02],
      ].map((point) => new Vector3(...(point as V3))),
    [],
  )
  useFrame(({ clock }) => {
    const mesh = packet.current
    if (!mesh) return
    mesh.visible = playing && active.has('electrical')
    if (!mesh.visible) return
    const cursor = (clock.getElapsedTime() * 0.35) % path.length
    const index = Math.floor(cursor)
    const next = path[(index + 1) % path.length]
    const current = path[index]
    mesh.position.lerpVectors(current, next, cursor - index)
  })
  return (
    <group>
      <Body />
      {STRANDS.map((strand) =>
        active.has(strand.flow) ? (
          <Strand key={strand.points.map((point) => point.join(',')).join('|')} points={strand.points} color={strand.color} radius={strand.radius} />
        ) : null,
      )}
      {NODES.map((node) => {
        const on = active.has(node.flow)
        const picked = selected === node.id
        const labelAt: V3 = [node.at[0], node.at[1] + (node.slot === 'up' ? 0.24 : -0.22), node.at[2]]
        return (
          <group key={node.id}>
            <mesh
              position={node.at}
              onClick={(event) => {
                event.stopPropagation()
                onSelect(node.id)
              }}
            >
              <boxGeometry args={node.size} />
              <meshStandardMaterial
                color={node.color}
                transparent={!on}
                opacity={on ? 0.95 : 0.18}
                emissive={node.color}
                emissiveIntensity={picked ? 0.85 : on ? 0.28 : 0}
              />
            </mesh>
            <Line points={[node.at, labelAt]} color="#9aabbd" transparent opacity={on ? 0.55 : 0.15} />
            <Tag at={labelAt} text={node.label} dim={!on} />
          </group>
        )
      })}
      {GROUNDS.map((point) => {
        const on = active.has('ground')
        return (
          <group key={point.id}>
            <mesh
              position={point.at}
              onClick={(event) => {
                event.stopPropagation()
                onSelect(point.id)
              }}
            >
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color={GROUND} emissive={GROUND} emissiveIntensity={selected === point.id ? 0.8 : on ? 0.35 : 0} transparent={!on} opacity={on ? 1 : 0.2} />
            </mesh>
            {on ? <Tag at={[point.at[0], point.at[1] - 0.16, point.at[2]]} text={point.label} dim={false} /> : null}
          </group>
        )
      })}
      <mesh ref={packet} visible={false}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={POWER} emissive={POWER} emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

export function ElectricalCar(props: Props) {
  return (
    <Canvas camera={{ position: [0.15, 1.55, 6.6], fov: 30 }} dpr={[1, 1.75]}>
      <color attach="background" args={['#0e1218']} />
      <hemisphereLight args={['#d7e4f2', '#171b20', 0.85]} />
      <directionalLight position={[4, 6, 5]} intensity={1.35} />
      <OrbitControls enablePan={false} minDistance={3.2} maxDistance={11} target={[0.1, 0.62, 0]} />
      <group rotation={[0, props.yaw, 0]}>
        <Harness active={props.active} playing={props.playing} selected={props.selected} onSelect={props.onSelect} />
      </group>
    </Canvas>
  )
}
