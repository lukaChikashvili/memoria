"use client"

import { getBody } from "@/actions/memorials";
import BodyModal from "@/components/BodyModal";
import ClothModal from "@/components/ClothModal";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext, useEffect } from "react";
import city from '../assets/city.jpg'
import forest from '../assets/forest.jpg'
import apartment from '../assets/apartment.jpg'
import PresetModalComp from "@/components/PresetModalComp";

export default function Home() {
  const { bodyModal,setBodyColor, setHair, setEye, 
          clothModal, setPresetModal, presetModal, currentPreset
   } = useContext(ThemeContext);

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

  return (
 <section className='r3f-canvas '>
     {bodyModal && <BodyModal />}
     {clothModal&& <ClothModal />}
<div className="w-full absolute z-10 bg-transparent bottom-4 left-350">
     <div>
       <Image onClick={() => setPresetModal(!presetModal)} src = {currentPreset === "city" ? 
          city : currentPreset === "forest" ? forest : currentPreset === "apartment" ? apartment : city} alt = "city" width = {70} height = {80} className="rounded-xl shadow-lg cursor-pointer" />
     </div>
</div>

{presetModal && <PresetModalComp />}
 </section>
  );
}
