"use client"

import BodyModal from "@/components/BodyModal";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export default function Home() {
  const { bodyModal } = useContext(ThemeContext);

  return (
 <section className='r3f-canvas'>
     {bodyModal && <BodyModal />}
 </section>
  );
}
