import { useGLTF } from '@react-three/drei'
import React from 'react'

const Experience = () => {
    const model = useGLTF('./face.glb');

  return (
  <>
    <group position={[0, -4, 0]}>
      <primitive object={model.scene} scale = {3} position={[0, 0, 0]}  />
    </group>

 
  </>
  )
}

export default Experience
