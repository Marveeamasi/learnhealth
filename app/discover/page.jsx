'use client'

import AlphaSearch from "@/components/AlphaSearch";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

export default function DiscoverPage() {   
  
  
  return (
  <div className="flex w-full flex-col">
   <Navbar page={'discover'}/>
   <section className="px-30 py-20 max-sm:p-5 flex flex-col gap-5">
    <div className="font-[700] text-[48px]">Discover</div>
    <p className="font-[400] text-[16px] max-w-[455px]">Browse our vast range of health topics and find information
    on treatment, prevention and coping strategies and stories.</p>
   </section>
   <div className="p-40"></div>
   <Footer/>
  </div>
  );
}
