"use client"

import { addScreenShots, getBody, getCloth } from "@/actions/memorials";
import BodyModal from "@/components/BodyModal";
import ClothModal from "@/components/ClothModal";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import city from '../assets/city.jpg'
import forest from '../assets/forest.jpg'
import apartment from '../assets/apartment.jpg'
import PresetModalComp from "@/components/PresetModalComp";
import { ScreenCapture } from "react-screen-capture";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export default function Home() {
  const { bodyModal,setBodyColor, setHair, setEye, setSkirt, setShirt, setSkirtTexture, setShirtTexture,  
          clothModal, setPresetModal, presetModal, currentPreset, setRemoveHair,
           setRemoveShirt, setRemoveSkirt, imageUrl, screenshotModal, setScreenshotModal 
   } = useContext(ThemeContext);

   // screenshot

   const sectionRef = useRef(null); 

   // get body
  useEffect(() => {
    const fetchBody = async () => {
      try {
        const res = await getBody();
        if (res) {
          setBodyColor(res.bodyColor);
          setHair(res.hair);
          setEye(res.eye);
        }
      } catch (error) {
        console.error("Failed to fetch body data", error);
      }
    };
  
    fetchBody();
  }, []);

  // get cloth
  useEffect(() => {
    const fetchCloth = async () => {
      try {
        const res = await getCloth();
       
        if (res) {
          setSkirt(res.skirt);
          setShirt(res.shirt);
          setShirtTexture(res.shirtTexture);
          setSkirtTexture(res.skirtTexture);
          setRemoveHair(res.removeHair);
          setRemoveShirt(res.removeShirt);
          setRemoveSkirt(res.removeSkirt);

        }
      } catch (error) {
        console.error("Failed to fetch body data", error);
      }
    };
  
    fetchCloth();
  }, [setShirt, setSkirt, setShirtTexture, setSkirtTexture, setRemoveHair, setRemoveShirt, setRemoveSkirt]);


// save screenshot
const saveScreenShot = async () => {
  if (!imageUrl) {
    console.error("No image URL available");
    return;
  }

  try {
    const res = await addScreenShots([imageUrl]); 
    toast.success("სურათი შეინახა წარმატებით");
    setScreenshotModal(false);
    
    
    
  } catch (error) {
    console.error("Error saving screenshot:", error);
  }
};


  return (
 <section className='r3f-canvas px-4 md:px-8 py-8 '  ref={sectionRef}>
     {bodyModal && <BodyModal />}
     {clothModal&& <ClothModal />}
<div className="w-full absolute z-10 bg-transparent hidden md:inline bottom-4">
     <div>
       <Image onClick={() => setPresetModal(!presetModal)} src = {currentPreset === "city" ? 
          city : currentPreset === "forest" ? forest : currentPreset === "apartment" ? apartment : city} alt = "city" width = {70} height = {80} className="rounded-xl shadow-lg cursor-pointer" />
     </div>
</div>

{presetModal && <PresetModalComp />}

<div className=" relative z-10 overflow-y-hidden">
       
        {imageUrl && screenshotModal && (
          <>

          <Image
            src={imageUrl}
            alt="Screenshot"
            width={300}
            height={300}
            className="ml-12 rounded-md shadow-lg mt-36 md:mt-0"
            style={{ objectFit: "contain" }}
          />
          <Button variant="outline" className="ml-12 mt-6 w-[300px] cursor-pointer bg-[#3A59D1] text-white" onClick = {saveScreenShot}>შეინახე</Button>
          </>
        )}
      </div>
        
      

     
 </section>
  );
}
