'use client'

import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { OrbitControls } from '@react-three/drei'
import { Lights } from './Lights'



export default function BackgroundCanvas() {
  return (
    <div className="canvas-container">
      <Canvas shadows
              camera={{ position: [0, 0, 2], fov: 100 }}>
     
      
           <Lights />
          <Experience />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}
