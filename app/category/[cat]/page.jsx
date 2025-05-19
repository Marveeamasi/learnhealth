'use client'

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams, useRouter } from 'next/navigation'
import { BLOGS, EXPLORE_BY } from '@/dummyData';
import Link from 'next/link';
import Image from 'next/image';
import HeadCard from '@/components/HeadCard';

export default function CategoryPage() {   
   const params = useParams();
   const {cat} = params
   const validId = cat.replace(/-/g, ' ');
   const [articles, setArticles] = useState([]);
   const [banner, setBanner] = useState('');
  

     useEffect(()=> {
      document.title = validId;
      const selectedBanner = EXPLORE_BY.find(e=> e?.name.toLowerCase() === validId.toLowerCase() )?.img;
      setBanner(selectedBanner);
     const selectedArticles = BLOGS.filter(b=> b?.category === 'articles' && b?.group.toLowerCase() === validId.toLowerCase());
      setArticles(selectedArticles);
     },[])
  
  return (
  <div className="flex w-full flex-col">
   <Navbar page={'category'}/>
   <div className='w-full h-[402px] max-sm:h-[250px] bg-[#F9E9DA] flex justify-center items-center'>
    {banner && <Image src={banner} alt='banner' width={2000} height={2000} className='w-full h-full object-cover object-top'/>}
   </div>
  <section className="flex flex-col px-30 py-20 max-sm:p-5 gap-10">
      <div className="flex items-center gap-2 text-[16px] text-[#979797] flex-wrap">c
            <span>Home</span><RiArrowRightSLine/><span>Health Topics</span><RiArrowRightSLine/><span className='capitalize'>{validId}</span>
     </div>
     <div className='flex justify-between gap-5 max-sm:flex-col'>
      <div className='flex flex-col gap-3'>
         <h1 className='font-[700] text-[48px] max-sm:text-[32px]'>{validId}</h1>
         <p className='font-[400] text-[16px] max-w-[455px] w-full'>Browse our vast range of health topics and find information on treatment, prevention and coping strategies and stories from {validId}</p>
      </div>
      </div>
      <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1 max-sm:pb-10">
           {articles.map(t => 
            <HeadCard key={t.id} img={t.media} title={t.name} h={'h-[300px]'} text={'text-[24px]'} textsm={'text-[18px]'}/>
           )
           }
          </div>
  </section>
   <Footer/>
  </div>
  );
}
