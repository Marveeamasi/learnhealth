'use client'

import AlphaSearch from "@/components/AlphaSearch";
import Footer from "@/components/Footer";
import HeadCard from "@/components/HeadCard";
import Navbar from "@/components/Navbar";
import { aboutList, EXPLORE_BY, FEATURED_STORIES, MORE_ARTICLES, TODAY_TOP_STORIES, TOP_ARTICLES, TOP_HEALTH_TOPICS } from "@/dummyData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SlArrowRightCircle } from "react-icons/sl";

export default function HomePage() {
  const [todayTopStories, setTodayTopStories] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [exploreBy, setExploreBy] = useState([]);
  const [topHealthTopics, setTopHealthTopics] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [moreArticles, setMoreArticles] = useState([]);
 
  useEffect(()=> {
      setTodayTopStories(TODAY_TOP_STORIES);
      setTopArticles(TOP_ARTICLES);
      setExploreBy(EXPLORE_BY);
      setTopHealthTopics(TOP_HEALTH_TOPICS);
      setFeaturedStories(FEATURED_STORIES);
      setMoreArticles(MORE_ARTICLES);
  },[])

  const handleSetAlphabet = (alphabet) => {
    console.log(alphabet)
  }
  
  return (
  <div className="flex w-full flex-col items-center gap-20">
   <Navbar page={'home'}/>
   <header className="flex flex-col px-30 max-sm:p-5 max-sm:pt-15 gap-15 max-sm:gap-10 w-full">
    <h1 className="text-[48px] font-[700] text-center max-sm:text-[32px]" style={{lineHeight: '100%'}}>Your guide to Wellness <br/>and a Healthy life.</h1>
     <div className="flex flex-col w-full gap-2">
     <p className="text-[#004D43] font-[500]">Today’s top story</p>
     <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10">
      {todayTopStories.map(story => 
       <HeadCard key={story.id} img={story.image} title={story.title}/>
      )
      }
     </div>
     </div>
   </header>
   <div className="w-full">
  <AlphaSearch handleSetAlphabet={handleSetAlphabet}/>
  </div>
   <section className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
    <h4 className="font-[600] text-[24px] text-[#004D43]">Top Articles</h4>
    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
      {topArticles.map(article => 
       <HeadCard key={article.id} img={article.image} title={article.title} h={'h-[300px]'} text={'text-[24px]'} textsm={'text-[18px]'}/>
      )
      }
     </div>
   </section>
   <section  className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
    <div className="flex justify-between items-center">
   <h4 className="font-[600] text-[24px] text-[#004D43]">Explore By</h4>
    <div className="flex gap-2 items-center text-[24px] font-[700] cursor-pointer max-sm:text-[18px]">View All <SlArrowRightCircle/></div>
   </div>
    <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-5">
      {exploreBy.map(by => 
       <div key={by} className="w-full h-[278px] bg-[#F9E9DA] cursor-pointer rounded-[8px] max-sm:h-[179px] flex items-center justify-center relative p-5">
        <div className="absolute sm:bottom-5 max-sm:top-3 sm:left-5 max-sm:left-3 font-[600] text-[18px]">{by}</div>
       </div>
      )
      }
     </div>
   </section>
   <section  className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
    <div className="flex justify-between items-center">
   <h4 className="font-[600] text-[24px] text-[#004D43] max-sm:hidden">Top Health Topics</h4>
   <h4 className="font-[600] text-[24px] text-[#004D43] sm:hidden">Top Topics</h4>
    <div className="flex gap-2 items-center text-[24px] font-[700] cursor-pointer max-sm:text-[18px]">View All <SlArrowRightCircle/></div>
   </div>
    <div className="flex items-center flex-wrap gap-5 max-sm:justify-center max-w-[1121px]">
      {topHealthTopics.map(topic => 
       <div key={topic} className="py-[10px] px-[24px] rounded-[24px] bg-[#F3F2F2] cursor-pointer">
       {topic}
       </div>
      )
      }
     </div>
   </section>
   <section className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
    <h4 className="font-[600] text-[24px] text-[#004D43]">Featured Stories</h4>
    <div className="grid grid-cols-3 gap-5 max-sm:flex max-sm:items-center max-sm:overflow-x-scroll overflow-y-hidden max-sm:pb-10">
      {featuredStories.map(fStory => 
       <HeadCard topic={fStory.topic} key={fStory.id} img={fStory.image} title={fStory.title} h={'h-[300px]'} text={'text-[24px]'} isFeature={true} textsm={'text-[18px]'}/>
      )
      }
     </div>
   </section>
   <section className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
    <h6 className="font-[400] text-[18px] text-[#004D43]">About LearnHealth Hub</h6>
     <div className="flex gap-40 max-sm:flex-col max-sm:gap-10">
      <div className="flex flex-col gap-5 max-w-[512px]">
        <h1 className="font-[700] text-[32px] leading-[100%]">Bridging the gap between medical 
        knowledge and everyday life.
        </h1>
        <p className="font-[400] text-[16px]">We believe that everyone deserves access to 
high-quality health information, regardless of their background 
or experience. Our goal is to provide clear, accurate, and 
actionable content that helps you take control of your health.</p>
<p className="font-[400] text-[16px]">Illuminating health through credible information. 
  LearnHealth Hub aims to provide reliable and up-to-date health knowledge,
   empowering global health awareness and understanding.</p>
      </div>
      <div className="bg-[#F5F5F5] border border-[#E8E8E8] max-sm:border-[#000000] max-sm:bg-transparent rounded-[8px] p-5 flex flex-col gap-5 max-w-[433px] w-full h-fit">
        {aboutList.map(list=> 
            <div key={list.id} className="flex items-center gap-3 min-h-[90px]">
            <div className="w-[36px] h-[36px]">
              <img src={list.img} className="text-[#004D43] text-[36px]"/>
            </div>
            <div className="h-[90px] border-l-1 border-l-[#A5A5A5]"></div>
               <div className="font-[700] text-[24px] w-[227px]">
                {list.text} 
               </div>
           </div>
        )}
      </div>
     </div>
   </section>
   <section  className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
    <div className="flex justify-between items-center">
   <h4 className="font-[600] text-[24px] text-[#004D43]">More Articles</h4>
   </div>
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
      {moreArticles.map(articles => 
       <div key={articles.id} className="w-full h-[344px] bg-[#F9E9DA] cursor-pointer rounded-[8px] max-sm:h-[179px] flex items-center justify-center relative">
       <Image src={articles.image} width={2000} height={2000} alt='bg image' className="w-full h-full object-cover object-top"/>
        <div className="absolute bottom-5 left-5 gap-2 flex flex-col">
           <div className="font-[600] text-[24px] text-[#fff]">
               {articles.title}
           </div>
           <div className="font-[400] text-[16px] text-[#fff] max-w-[462px]">
               {articles.desc}
           </div>
        </div>
       </div>
      )
      }
     </div>
   </section>
   <section  className="flex w-full max-sm:flex-col px-30 max-sm:px-5 gap-20 max-sm:gap-10 justify-center items-center">
      <Image src={'/img11.png'} width={2000} height={2000} alt="image" className="w-[398px] h-[398px] max-sm:w-[191px] max-sm:h-[191px]" />
      <div className="flex flex-col max-sm:items-center gap-5 max-w-[440px]">
        <h1 className="font-[700] text-[32px] leading-[100%] max-sm:text-center max-sm:text-[24px]">We are open to provide services to Healthcare experts.</h1>
        <p className="font-[400] text-[16px] leading-[100%] max-sm:text-center max-sm:text-[14px]">From Content creation for Health Organizations to Blogs and Ghostwriting as well as Medical Writing (clinical trial reports, research papers) to Ebooks and Whitepapers,</p>
        <div className="flex gap-2 items-center text-[16px] max-sm:text-center font-[600] text-[#004D43] cursor-pointer">Get in touch <SlArrowRightCircle/></div>
      </div>
   </section>
   <section  className="flex w-full flex-col px-30 max-sm:px-5 gap-10 max-sm:gap-5 justify-center items-center">
      <div className="flex flex-col items-center gap-5 max-w-[440px]">
        <h1 className="font-[700] text-[32px] leading-[100%] text-center max-sm:text-[24px]">You can be confident that experts are providing you with the information.</h1>
        <div className="flex gap-2 items-center text-[16px] max-sm:text-center font-[600] text-[#004D43] cursor-pointer">See how we maintain our content integrity <SlArrowRightCircle/></div>
      </div>
   </section>
   <Footer/>
  </div>
  );
}
