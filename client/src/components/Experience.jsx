import { ThemeContext } from '@/context/ThemeContext';
import { Environment, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import React, { useContext, useEffect, useState } from 'react'
import * as THREE from 'three'

const Experience = () => {

    const model = useGLTF('/face.glb');

    const { bodyColor,skirt,  hair, eye, shirt, shirtTexture, removeSkirt,
        currentPreset, skirtTexture, removeShirt, panty , removePanty, removeHair, presetModal} = useContext(ThemeContext);

    const irisTexture = useLoader(THREE.TextureLoader, './eye.jpg');
   

    const [shirtTextureImg, setShirtTextureImg] = useState(null);
    const [skirtTextureImg, setSkirtTextureImg] = useState(null);

    useEffect(() => {
        if (shirtTexture ) {
          const loader = new THREE.TextureLoader();
          loader.load(
            shirtTexture,
            (texture) => {
              setShirtTextureImg(texture);
            },
            undefined,
            (error) => {
              console.error("Texture loading failed:", error);
            }
          );
        } else {
          console.warn("Invalid shirtTexture:", shirtTexture);
        }


        if (skirtTexture) {
          const loader = new THREE.TextureLoader();
          loader.load(
            skirtTexture,
            (texture) => {
              setSkirtTextureImg(texture);
            },
            undefined,
            (error) => {
              console.error("Texture loading failed:", error);
            }
          );
        } else {
          console.warn("Invalid shirtTexture:", skirtTexture);
        }
      }, [shirtTexture, skirtTexture]);


    

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

            //shirt
            if (child.name === "Object_31" && child.material) {
              if (removeShirt) {
                  child.visible = false;
              } else {
                  child.visible = true;
                  if (shirtTextureImg) {
                      child.material.map = shirtTextureImg;
                      child.material.color.set(shirt || 'white');
                  } else {
                      child.material.map = null;
                      child.material.color.set(shirt);
                  }
                  child.material.needsUpdate = true;
              }
          }

          //skirt
            if (child.name === "Object_39" && child.material) {
              if (removeSkirt) {
                  child.visible = false;
              } else {
                  child.visible = true;
                  if (skirtTextureImg) {
                      child.material.map = skirtTextureImg;
                 
                  } else {
                      child.material.map = null;
                      child.material.color.set(skirt);
                  }
                  child.material.needsUpdate = true;
              }
          }





        if(child.isMesh && removeSkirt) {
          if(child.name === "Object_39" && child.material) {
              
            child.visible = false;

       
      }
        }else {
          if(child.name === "Object_39" && child.material) {
              
            child.visible = true;

       
      }
        }


        if(child.isMesh && removeShirt) {
          if(child.name === "Object_31" && child.material) {
              
            child.visible = false;

       
      }
        }else {
          if(child.name === "Object_31" && child.material) {
              
            child.visible = true;

       
      }
        }



        if(child.isMesh && panty) {
          if(child.name === "Object_41" && child.material) {
              
              child.material.map = null; 
              child.material.color.set(panty); 
              child.material.needsUpdate = true; 

       
      }
        }


        if(child.isMesh && removePanty) {
          if(child.name === "Object_41" && child.material) {
              
             child.visible = false;

       
      }
        }else {
          if(child.name === "Object_41" && child.material) {
              
            child.visible = true;

       
      }
    }


    // remove hair
    if(child.isMesh && removeHair) {
      if(child.name === "Object_35" && child.material) {
          
         child.visible = false;

   
  }
    }else {
      if(child.name === "Object_35" && child.material) {
          
        child.visible = true;

   
  }
}
       
        });

       
      


        
    }

    }, [model, bodyColor, hair, eye, irisTexture, removePanty, removeHair, shirt, shirtTextureImg, panty, removeSkirt, removeShirt, skirt, skirtTextureImg ]);

  return (

  <>
     {currentPreset  && <Environment preset={currentPreset} background />}
    <group position={[0, -4, 0]}>
      <primitive object={model.scene} scale = {3} position={[0, 0, 0]}  />
    </group>

 
  </>
  )
}

export default Experience
