import { ThemeContext } from '@/context/ThemeContext';
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import React, { useContext, useEffect, useState } from 'react'
import * as THREE from 'three'

const Experience = () => {
    const model = useGLTF('./face.glb');

    const { bodyColor, hair, eye } = useContext(ThemeContext);

    const irisTexture = useLoader(THREE.TextureLoader, './eye.jpg');

    

/*
    useEffect(() => {
   
        if (model.scene) {
         
          model.scene.traverse((child) => {
            if (child.isMesh) {
               

                if(child.name === "Object_9" ) {
                    // face
                  
                }
                if(child.name === "Object_10" ) {
                    // waist
                    
                }
                if(child.name === "Object_12" ) {
                    // arms
                    
                }
                if(child.name === "Object_13" ) {
                    // legs
                 
                }
                if(child.name === "Object_31" ) {
                    // shirt
                 child.material.color.set(new THREE.Color("green"));
                }
                if(child.name === "Object_41" ) {
                    // panty
                 child.material.color.set(new THREE.Color("blue"));
                }

                if(child.name === "Object_28" ) {
                    // panty
                 child.material.color.set(new THREE.Color("red"));
                }

                if(child.name === "Object_15" ) {
                    // panty
                 child.material.color.set(new THREE.Color("orange"));
                }

                if(child.name === "Object_35" ) {
                    // hair
                 child.material.color.set(new THREE.Color("black"));
                }

                
                if(child.name === "Object_33" ) {
                    // hair inner
                 child.material.color.set(new THREE.Color("purple"));
                }
                if(child.name === "Object_39" && child.material) {
                    // skirt inner
                    child.material.map = null; 
                    child.material.color.set('red'); 
                    child.material.needsUpdate = true; 
  
                 
                }

                if(child.name === "Object_37" ) {
                    // shoes
                    child.material.map = null; 
                    child.material.color.set('red'); 
                    child.material.needsUpdate = true; 
                }





                
            
           
            }
          })
        }
      }, [model]);

      */

      useEffect(() => {
   
        if (model.scene) {
         
          model.scene.traverse((child) => {
            if (child.isMesh && bodyColor  ) {
                if(child.name === "Object_9" ) {
                    child.material.color.set(bodyColor);
                    
                } 
                if(child.name === "Object_10" ) {
                    // waist
                    child.material.color.set(bodyColor);
                    
                }
                if(child.name === "Object_12" ) {
                    // arms
                    child.material.color.set(bodyColor);
                    
                }

                if(child.name === "Object_13" ) {
                    // legs
                    child.material.color.set(bodyColor);
                   
                    console.log(child)
                }

               

               
            }

            if(child.isMesh && hair) {
                if(child.name === "Object_35"   ) {
                    // hair
                    child.material.map = null; 
                    child.material.color.set(hair); 
                    child.material.needsUpdate = true; 
                }

                if(child.name === "Object_33"   ) {
                    // hair
                    child.material.map = null; 
                    child.material.color.set(hair); 
                    child.material.needsUpdate = true; 
                }

                
            }

            if(child.isMesh && eye) {
                if (child.isMesh && ["Std_Eye_L", "Std_Eye_R"].includes(child.material.name)) {
                    child.material.map = irisTexture;
                    child.material.needsUpdate = true;
                  }
            }
        })
    }

    }, [model, bodyColor, hair, eye, irisTexture]);

  return (

  <>
    <group position={[0, -4, 0]}>
      <primitive object={model.scene} scale = {3} position={[0, 0, 0]}  />
    </group>

 
  </>
  )
}

export default Experience
