'use client'

import HeadCard from "@/components/HeadCard";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  
  return (
  <div className="flex w-full flex-col items-center">
   <Navbar/>
   <header className="flex flex-col p-20 max-sm:p-5 max-sm:pt-15 gap-15 max-sm:gap-10 w-full">
    <h1 className="text-[48px] font-[700] text-center max-sm:text-[32px]" style={{lineHeight: '100%'}}>Your guide to Wellness <br/>and a Healthy life.</h1>
     <div className="flex flex-col w-full gap-2">
     <p className="text-[#004D43] font-[500]">Today’s top story</p>
     <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10">
     <HeadCard img={'/img1.jpg'} title={'Exercises for Chronic Pain Management'}/>
     <HeadCard img={'/img2.jpg'} title={'The Link Between Sleep and Mental Health: Rest Well, Feel Well'}/>
     </div>
     </div>
   </header>
  </div>
  );
}
