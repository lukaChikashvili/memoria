'use client'

import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { OrbitControls } from '@react-three/drei'


export default function BackgroundCanvas() {
  return (
    <div className="canvas-container">
      <Canvas>
     
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
          <Experience />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}
