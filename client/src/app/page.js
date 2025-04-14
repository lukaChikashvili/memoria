import { Button } from "@/components/ui/button";
import { CirclePlus, Plus } from "lucide-react";

export default function Home() {
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
          <Button variant="outline" className="cursor-pointer hover:border-yellow"><CirclePlus />დაათვალიერე სასაფლაო</Button>
            <Button variant="ghost" className="bg-[#FFB22C] cursor-pointer"><CirclePlus /> შექმენი მემორიალი</Button>
           
          </div>


       </div>
     </section>
      
    </>
  );
}
