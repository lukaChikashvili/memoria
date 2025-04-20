"use client"

import { getBody } from "@/actions/memorials";
import BodyModal from "@/components/BodyModal";
import ClothModal from "@/components/ClothModal";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect } from "react";

export default function Home() {
  const { bodyModal,setBodyColor, setHair, setEye, 
          clothModal
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
 <section className='r3f-canvas'>
     {bodyModal && <BodyModal />}
     {clothModal&& <ClothModal />}
 </section>
  );
}
