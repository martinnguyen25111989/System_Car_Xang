import { Edges, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { CanvasTexture, CatmullRomCurve3, Vector3 } from 'three'
import type { Group, Mesh } from 'three'
import { FLOW_COLOR, isFlowActive, type FlowId, type NodeId } from '../content/lesson01.ts'

type SceneProps = {
  active: ReadonlySet<FlowId>
  playing: boolean
  selected: NodeId | null
  onSelect: (id: NodeId) => void
  yaw: number
}

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
  const height = 0.28
  return (
    <sprite position={position} scale={[height * label.aspect, height, 1]}>
      <spriteMaterial map={label.texture} transparent opacity={dim ? 0.4 : 1} depthTest={false} />
    </sprite>
  )
}

function Block({
  id,
  position,
  size,
  color,
  active,
  selected,
  onSelect,
  opacity = 1,
}: {
  id: NodeId
  position: [number, number, number]
  size: [number, number, number]
  color: string
  active: boolean
  selected: NodeId | null
  onSelect: (id: NodeId) => void
  opacity?: number
}) {
  const picked = selected === id
  const transparent = opacity < 1
  return (
    <mesh
      position={position}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(id)
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        transparent={transparent}
        opacity={opacity}
        roughness={0.42}
        metalness={0.28}
        emissive={color}
        emissiveIntensity={picked ? 0.7 : active ? 0.34 : 0.03}
        depthWrite={!transparent}
      />
    </mesh>
  )
}

function Pistons({ playing }: { playing: boolean }) {
  const left = useRef<Mesh | null>(null)
  const right = useRef<Mesh | null>(null)
  useFrame(({ clock }) => {
    const phase = playing ? clock.getElapsedTime() * 9 : 0
    if (left.current) left.current.position.y = 0.8 + Math.sin(phase) * 0.07
    if (right.current) right.current.position.y = 0.8 + Math.sin(phase + Math.PI) * 0.07
  })
  return (
    <group>
      <mesh ref={left} position={[1.2, 0.8, 0.12]}>
        <cylinderGeometry args={[0.055, 0.055, 0.1, 16]} />
        <meshStandardMaterial color="#eef2f6" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh ref={right} position={[1.2, 0.8, -0.12]}>
        <cylinderGeometry args={[0.055, 0.055, 0.1, 16]} />
        <meshStandardMaterial color="#eef2f6" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  )
}

function EnergyPacket({ playing }: { playing: boolean }) {
  const ref = useRef<Mesh | null>(null)
  const curve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-1.15, 0.55, 0.2),
        new Vector3(0.15, 0.62, 0.15),
        new Vector3(1.2, 0.95, 0),
        new Vector3(0.9, 0.5, 0.2),
        new Vector3(1.22, 0.32, 0.72),
      ]),
    [],
  )
  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    mesh.visible = playing
    if (!playing) return
    mesh.position.copy(curve.getPoint((clock.getElapsedTime() * 0.2) % 1))
  })
  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.055, 16, 16]} />
      <meshStandardMaterial color={FLOW_COLOR.energy} emissive={FLOW_COLOR.energy} emissiveIntensity={1.1} />
    </mesh>
  )
}

function Wheel({
  position,
  spinning,
  active,
  selected,
  onSelect,
}: {
  position: [number, number, number]
  spinning: boolean
  active: boolean
  selected: boolean
  onSelect: () => void
}) {
  const spin = useRef<Group | null>(null)
  useFrame((_, delta) => {
    if (spinning && spin.current) spin.current.rotation.y -= delta * 4
  })
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={spin}>
        <mesh
          onClick={(event) => {
            event.stopPropagation()
            onSelect()
          }}
        >
          <cylinderGeometry args={[0.32, 0.32, 0.18, 28]} />
          <meshStandardMaterial
            color={selected ? '#d5e2f0' : '#222830'}
            metalness={0.45}
            roughness={0.55}
            emissive={FLOW_COLOR.mechanical}
            emissiveIntensity={selected ? 0.55 : active ? 0.28 : 0}
          />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 16]} />
          <meshStandardMaterial color="#98a4b3" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

function Car({ active, playing, selected, onSelect }: Omit<SceneProps, 'yaw'>) {
  const mechanical = active.has('mechanical')
  const thermal = active.has('thermal')
  const energy = active.has('energy')
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={(event) => {
          event.stopPropagation()
          onSelect('road')
        }}
      >
        <planeGeometry args={[8.5, 3.4]} />
        <meshStandardMaterial
          color="#171c22"
          emissive={FLOW_COLOR.mechanical}
          emissiveIntensity={selected === 'road' ? 0.18 : mechanical ? 0.05 : 0}
        />
      </mesh>

      <mesh position={[0, 0.58, 0]} renderOrder={3} raycast={() => undefined}>
        <boxGeometry args={[3.9, 0.48, 1.62]} />
        <meshStandardMaterial color="#c5d4e4" transparent opacity={0.2} roughness={0.2} depthWrite={false} />
        <Edges color="#9eb4c8" threshold={20} />
      </mesh>
      <mesh position={[-0.22, 1.08, 0]} renderOrder={3} raycast={() => undefined}>
        <boxGeometry args={[1.8, 0.55, 1.4]} />
        <meshStandardMaterial color="#d5e4f2" transparent opacity={0.16} roughness={0.12} depthWrite={false} />
        <Edges color="#c5d6e6" threshold={20} />
      </mesh>

      <Block
        id="engine"
        position={[1.2, 0.78, 0]}
        size={[0.64, 0.48, 0.58]}
        color="#6f93b8"
        opacity={0.4}
        active={isFlowActive('engine', active)}
        selected={selected}
        onSelect={onSelect}
      />
      <Pistons playing={playing} />
      <Block
        id="trans"
        position={[0.78, 0.5, 0.28]}
        size={[0.36, 0.3, 0.34]}
        color="#8ea4ba"
        active={isFlowActive('trans', active)}
        selected={selected}
        onSelect={onSelect}
      />
      <Block
        id="diff"
        position={[1.22, 0.34, 0]}
        size={[0.26, 0.18, 0.26]}
        color="#9eb0c2"
        active={isFlowActive('diff', active)}
        selected={selected}
        onSelect={onSelect}
      />
      <mesh position={[1.22, 0.32, 0.4]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
        <cylinderGeometry args={[0.03, 0.03, 0.7, 12]} />
        <meshStandardMaterial
          color="#b7c3d0"
          metalness={0.6}
          roughness={0.3}
          emissive={FLOW_COLOR.mechanical}
          emissiveIntensity={mechanical ? 0.45 : 0.04}
        />
      </mesh>
      <mesh position={[1.22, 0.32, -0.4]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
        <cylinderGeometry args={[0.03, 0.03, 0.7, 12]} />
        <meshStandardMaterial
          color="#b7c3d0"
          metalness={0.6}
          roughness={0.3}
          emissive={FLOW_COLOR.mechanical}
          emissiveIntensity={mechanical ? 0.45 : 0.04}
        />
      </mesh>
      <Block
        id="radiator"
        position={[1.78, 0.74, 0]}
        size={[0.08, 0.46, 0.74]}
        color={FLOW_COLOR.thermal}
        active={isFlowActive('radiator', active)}
        selected={selected}
        onSelect={onSelect}
      />
      <Block
        id="battery"
        position={[1.5, 0.58, -0.58]}
        size={[0.24, 0.16, 0.3]}
        color={FLOW_COLOR.electrical}
        active={isFlowActive('battery', active)}
        selected={selected}
        onSelect={onSelect}
      />
      <Block
        id="ecu"
        position={[0.5, 0.78, 0.46]}
        size={[0.18, 0.06, 0.22]}
        color={FLOW_COLOR.data}
        active={isFlowActive('ecu', active)}
        selected={selected}
        onSelect={onSelect}
      />
      <Block
        id="tank"
        position={[-1.18, 0.4, 0]}
        size={[0.74, 0.18, 0.95]}
        color={FLOW_COLOR.energy}
        active={isFlowActive('tank', active)}
        selected={selected}
        onSelect={onSelect}
      />
      <mesh position={[0.05, 0.46, 0.38]} raycast={() => undefined}>
        <boxGeometry args={[2.15, 0.025, 0.025]} />
        <meshStandardMaterial
          color={FLOW_COLOR.energy}
          emissive={FLOW_COLOR.energy}
          emissiveIntensity={energy ? 0.7 : 0.05}
        />
      </mesh>
      <Block
        id="exhaust"
        position={[-0.2, 0.26, 0.32]}
        size={[2.15, 0.05, 0.07]}
        color="#8b939e"
        active={thermal}
        selected={selected}
        onSelect={onSelect}
      />
      <mesh position={[-1.5, 0.3, 0.32]} raycast={() => undefined}>
        <boxGeometry args={[0.38, 0.16, 0.2]} />
        <meshStandardMaterial color="#6e767f" emissive="#f07a3a" emissiveIntensity={thermal ? 0.25 : 0.02} />
      </mesh>

      <mesh
        position={[-0.35, 0.72, 0.28]}
        onClick={(event) => {
          event.stopPropagation()
          onSelect('cabin')
        }}
      >
        <boxGeometry args={[0.38, 0.28, 0.32]} />
        <meshStandardMaterial color="#3c342d" roughness={0.8} />
      </mesh>
      <mesh
        position={[-0.35, 0.72, -0.28]}
        onClick={(event) => {
          event.stopPropagation()
          onSelect('cabin')
        }}
      >
        <boxGeometry args={[0.38, 0.28, 0.32]} />
        <meshStandardMaterial color="#3c342d" roughness={0.8} />
      </mesh>
      <mesh
        position={[0.42, 0.92, 0.32]}
        rotation={[0.5, 0.2, 0]}
        onClick={(event) => {
          event.stopPropagation()
          onSelect('driver')
        }}
      >
        <torusGeometry args={[0.12, 0.015, 8, 20]} />
        <meshStandardMaterial color="#d7dee6" metalness={0.5} roughness={0.35} />
      </mesh>

      <Wheel
        position={[1.22, 0.32, 0.84]}
        spinning={playing}
        active={mechanical}
        selected={selected === 'wheels'}
        onSelect={() => onSelect('wheels')}
      />
      <Wheel
        position={[1.22, 0.32, -0.84]}
        spinning={playing}
        active={mechanical}
        selected={selected === 'wheels'}
        onSelect={() => onSelect('wheels')}
      />
      <Wheel
        position={[-1.28, 0.32, 0.84]}
        spinning={playing}
        active={mechanical}
        selected={selected === 'wheels'}
        onSelect={() => onSelect('wheels')}
      />
      <Wheel
        position={[-1.28, 0.32, -0.84]}
        spinning={playing}
        active={mechanical}
        selected={selected === 'wheels'}
        onSelect={() => onSelect('wheels')}
      />

      <EnergyPacket playing={playing} />

      <Tag position={[-1.05, 1.15, 0]} text="Bình xăng" dim={!isFlowActive('tank', active)} />
      <Tag position={[-0.3, 1.7, 0]} text="Cabin" dim={!isFlowActive('cabin', active)} />
      <Tag position={[0.15, 1.28, 0]} text="ECU" dim={!isFlowActive('ecu', active)} />
      <Tag position={[0.42, 0.48, 0]} text="Hộp số" dim={!isFlowActive('trans', active)} />
      <Tag position={[1.15, 1.52, 0]} text="Máy xăng" dim={!isFlowActive('engine', active)} />
      <Tag position={[2.15, 1.15, 0]} text="Két nước" dim={!isFlowActive('radiator', active)} />
      <Tag position={[1.95, 0.38, 0]} text="Ắc quy 12V" dim={!isFlowActive('battery', active)} />
      <Tag position={[0.78, -0.22, 0]} text="Bánh trước" dim={!mechanical} />
    </group>
  )
}

export function GhostCar(props: SceneProps) {
  return (
    <Canvas camera={{ position: [4.4, 2.5, 6.6], fov: 32 }} dpr={[1, 1.75]}>
      <color attach="background" args={['#0e1218']} />
      <hemisphereLight args={['#d7e4f2', '#171b20', 0.75]} />
      <directionalLight position={[5, 7, 4]} intensity={1.45} />
      <OrbitControls enablePan={false} minDistance={3.2} maxDistance={12} target={[0.1, 0.55, 0]} />
      <group rotation={[0, props.yaw, 0]}>
        <Car active={props.active} playing={props.playing} selected={props.selected} onSelect={props.onSelect} />
      </group>
    </Canvas>
  )
}
