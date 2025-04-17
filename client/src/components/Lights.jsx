'use client'

import React from 'react'

export const Lights = () => {
  return (
    <>
    
      <ambientLight intensity={0.4} />

  
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      
      <pointLight
        position={[0, 5, 5]}
        intensity={0.8}
        color={'#ffddaa'}
      />
    </>
  )
}
