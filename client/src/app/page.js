"use client"

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import katafalka from '../assets/katafalka.png'
import Image from "next/image";
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from "react";

export default function Home() {

  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({ x: ["-100%", "100%"], transition: { duration: 10, ease: "easeInOut" } });
         controls.set({ x: "-100%" }); 
        await new Promise(res => setTimeout(res, 1000)); 
      }
    };
    animate();
  }, [controls]);
  return (
    <>
     <section className=" py-12 md:py-24">
       <div className="max-w-4x mx-auto text-center flex flex-col gap-8">
          <h1 className="text-white text-5xl font-semibold">
            მეხსიერება, რომელიც არ ქრება
          </h1>
          <h2 className="text-[#FFB22C] text-3xl">
          პატივი ეცი საყვარელ ადამიანს და გაუზიარე მოგონებები
          </h2>

          <div className="mx-auto max-w-4xl flex items-center justify-center gap-6">
            <Link href = "/memorials">
          <Button variant="outline" className="cursor-pointer hover:border-yellow"><CirclePlus />დაათვალიერე სასაფლაო</Button>
          </Link>

          <Link href = "/memorials/create">
            <Button variant="ghost" className="bg-[#FFB22C] cursor-pointer"><CirclePlus /> შექმენი მემორიალი</Button>
            </Link>
          </div>

          <motion.div animate={controls} className="w-full max-w-[300px] mx-auto">
          <Image src={katafalka} alt="katafalka" />
        </motion.div>

       </div>
     </section>
      
    </>
  );
}
