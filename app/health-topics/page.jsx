'use client'

import AlphaSearch from "@/components/AlphaSearch";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

export default function HealthTopicsPage() {   
   const [selectedAlphabet, setSelectedAlphabet] = useState('A');

   const handleSetAlphabet = (alphabet) => {
    setSelectedAlphabet(alphabet);
   }
  
  return (
  <div className="flex w-full flex-col">
   <Navbar page={'health topics'}/>
   <section className="px-30 py-20 max-sm:p-5 flex flex-col gap-5">
    <div className="flex items-center gap-2 text-[16px] text-[#979797]">
        <span>Home</span><RiArrowRightSLine/><span>Health Topics</span><RiArrowRightSLine/><span>{selectedAlphabet}</span>
    </div>
    <div className="font-[700] text-[48px]">Health Topics</div>
    <p className="font-[400] text-[16px] max-w-[455px]">Browse our vast range of health topics and find information
    on treatment, prevention and coping strategies and stories.</p>
   </section>
   <AlphaSearch handleSetAlphabet={handleSetAlphabet}/>
   <div className="p-40"></div>
   <Footer/>
  </div>
  );
}
