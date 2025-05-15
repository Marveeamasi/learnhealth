'use client'

import AlphaSearch from "@/components/AlphaSearch";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { EXPLORE_BY, FEATURED_STORIES } from "@/dummyData";
import HeadCard from "@/components/HeadCard";
import Link from "next/link";

const ExploreBy = ({exploreBy}) => {
  
  return (
    <section  className="flex flex-col w-full gap-5 mt-10">
    <div className="grid grid-cols-5 max-sm:grid-cols-2 gap-5">
      {exploreBy.map(by => 
       <Link href={`/category/${by.replace(/ /g, '-')}`} key={by} className="w-full h-[278px] bg-[#F9E9DA] cursor-pointer rounded-[8px] max-sm:h-[179px] flex items-center justify-center relative p-5">
        <div className="absolute sm:bottom-5 max-sm:top-3 sm:left-5 max-sm:left-3 font-[600] text-[18px]">{by}</div>
       </Link>
      )
      }
     </div>
   </section>
  )
}

const Featured = ({featuredStories}) => {
  return(
     <section className="flex flex-col w-full gap-5 mt-10">
        <h4 className="font-[600] text-[24px]">Featured</h4>
        <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
          {featuredStories.map(fStory => 
           <HeadCard topic={fStory.topic} key={fStory.id} img={fStory.image} title={fStory.title} h={'h-[300px]'} text={'text-[24px]'} textsm={'text-[18px]'}/>
          )
          }
         </div>
       </section>
  )
}

export default function HealthTopicsPage() {   
    const [exploreBy, setExploreBy] = useState([]);
    const [featuredStories, setFeaturedStories] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState('A');
  
     useEffect(()=> {
          setExploreBy(EXPLORE_BY);
          setFeaturedStories(FEATURED_STORIES);
      },[])

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
    <section className="px-30 py-20 max-sm:p-5 flex flex-col gap-5 pb-30">
    <ExploreBy exploreBy={exploreBy}/>
    <Featured featuredStories={featuredStories}/>
    </section>
   <Footer/>
  </div>
  );
}
