import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'
import type { PartDetail } from '../content/lesson01.ts'

type Props = {
  details: Record<string, PartDetail>
  playing: boolean
  selected: string | null
  onSelect: (id: string) => void
  yaw: number
}

const PISTONS = [
  { z: 0.36, phase: 0 },
  { z: 0.12, phase: Math.PI },
  { z: -0.12, phase: Math.PI },
  { z: -0.36, phase: 0 },
]

function clickable(details: Record<string, PartDetail>, id: string, onSelect: (id: string) => void) {
  if (!details[id]) return undefined
  return (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
    onSelect(id)
  }
}

function Moving({ playing, details, selected, onSelect }: Omit<Props, 'yaw'>) {
  const pistons = useRef<Array<Mesh | null>>([])
  const valves = useRef<Group | null>(null)
  const crank = useRef<Mesh | null>(null)
  useFrame(({ clock }) => {
    const angle = playing ? clock.getElapsedTime() * 3.2 : 0.4
    pistons.current.forEach((mesh, index) => {
      if (!mesh) return
      mesh.position.y = 0.15 + Math.sin(angle + PISTONS[index].phase) * 0.16
    })
    if (crank.current) crank.current.rotation.z = angle
    if (valves.current) {
      const lift = Math.max(0, Math.sin(angle))
      valves.current.position.y = 0.72 + lift * 0.06
    }
  })
  const hot = (id: string) => (selected === id ? 0.55 : 0.12)
  return (
    <group>
      <mesh position={[0, 0.15, 0]} onClick={clickable(details, 'block', onSelect)}>
        <boxGeometry args={[0.7, 0.72, 1.15]} />
        <meshStandardMaterial color="#7f93a8" metalness={0.45} roughness={0.4} emissive="#7f93a8" emissiveIntensity={hot('block')} />
      </mesh>
      {PISTONS.map((item, index) => (
        <mesh
          key={item.z}
          ref={(node) => {
            pistons.current[index] = node
          }}
          position={[0, 0.15, item.z]}
          onClick={clickable(details, 'piston', onSelect)}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.16, 20]} />
          <meshStandardMaterial color="#e7edf3" metalness={0.7} roughness={0.25} emissive="#e7edf3" emissiveIntensity={hot('piston')} />
        </mesh>
      ))}
      <mesh ref={crank} position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={clickable(details, 'crank', onSelect)}>
        <cylinderGeometry args={[0.05, 0.05, 1.25, 16]} />
        <meshStandardMaterial color="#c5ced8" metalness={0.8} roughness={0.25} emissive="#c5ced8" emissiveIntensity={hot('crank')} />
      </mesh>
      <mesh position={[0.28, 0.62, 0]} onClick={clickable(details, 'cam', onSelect)}>
        <boxGeometry args={[0.16, 0.16, 1.05]} />
        <meshStandardMaterial color="#d7c07a" metalness={0.5} roughness={0.35} emissive="#d7c07a" emissiveIntensity={hot('cam')} />
      </mesh>
      <group ref={valves}>
        <mesh position={[0.12, 0, 0.36]} onClick={clickable(details, 'valve', onSelect)}>
          <cylinderGeometry args={[0.03, 0.03, 0.22, 12]} />
          <meshStandardMaterial color="#3ec6d6" metalness={0.6} roughness={0.3} emissive="#3ec6d6" emissiveIntensity={hot('valve')} />
        </mesh>
        <mesh position={[-0.12, 0, 0.36]} onClick={clickable(details, 'valve', onSelect)}>
          <cylinderGeometry args={[0.03, 0.03, 0.22, 12]} />
          <meshStandardMaterial color="#8b939e" metalness={0.6} roughness={0.3} emissive="#8b939e" emissiveIntensity={hot('valve')} />
        </mesh>
      </group>
      <mesh position={[0, 0.58, 0.36]} onClick={clickable(details, 'plug', onSelect)}>
        <cylinderGeometry args={[0.035, 0.035, 0.16, 12]} />
        <meshStandardMaterial color="#e15b64" emissive="#e15b64" emissiveIntensity={hot('plug') + 0.2} />
      </mesh>
      <mesh position={[0.22, 0.48, 0.36]} onClick={clickable(details, 'injector', onSelect)}>
        <boxGeometry args={[0.06, 0.14, 0.06]} />
        <meshStandardMaterial color="#e3a008" emissive="#e3a008" emissiveIntensity={hot('injector')} />
      </mesh>
      <mesh position={[0, -0.28, 0.78]} onClick={clickable(details, 'flywheel', onSelect)}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
        <meshStandardMaterial color="#5c6772" metalness={0.7} roughness={0.35} emissive="#5c6772" emissiveIntensity={hot('flywheel')} />
      </mesh>
    </group>
  )
}

export function EngineScene(props: Props) {
  return (
    <Canvas camera={{ position: [2.4, 1.5, 2.8], fov: 35 }} dpr={[1, 1.75]}>
      <color attach="background" args={['#0e1218']} />
      <hemisphereLight args={['#d7e4f2', '#171b20', 0.85]} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <OrbitControls enablePan={false} minDistance={2.2} maxDistance={8} target={[0, 0.15, 0]} />
      <group rotation={[0.15, props.yaw, 0]}>
        <Moving playing={props.playing} details={props.details} selected={props.selected} onSelect={props.onSelect} />
      </group>
    </Canvas>
  )
}
