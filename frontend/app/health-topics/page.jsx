'use client'

import AlphaSearch from "@/components/AlphaSearch";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { EXPLORE_BY } from "@/dummyData";
import HeadCard from "@/components/HeadCard";
import Link from "next/link";
import Image from "next/image";

const ExploreBy = ({exploreBy}) => {
  
  return ( 
    <section  className="flex flex-col w-full gap-5 mt-10">
    <div className="grid grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-5">
      {exploreBy.map(by => 
       <Link href={`/category/${by.name.replace(/ /g, '-')}`} key={by.name} className="w-full h-[278px] bg-[#F9E9DA] overflow-hidden cursor-pointer rounded-[8px] max-sm:h-[179px] flex items-center justify-center relative">
       <Image src={by.img} alt={by.name} width={2000} height={2000} className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"/>
                     <div className="absolute sm:bottom-5 max-sm:top-3 sm:left-5 max-sm:left-3 font-[600] text-[18px] bg-[#0000002c] rounded-xl p-0 px-2 text-white">{by.name}</div>
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
          {featuredStories.map((fStory, index) => (
            <Link
              key={fStory.id}
              href={`/${fStory.category==="articles"? "health-topics" : "product-review"}/${fStory.id}`}
            >
              <HeadCard
                topic={fStory.group}
                media={fStory.media}
                mediaType={fStory.media_type}
                title={fStory.name}
                h={'h-[300px]'}
                text={'text-[24px]'}
                isFeature={true}
                textsm={'text-[18px]'}
              />
            </Link>
          ))}
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
