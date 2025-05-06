'use client'

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams, useRouter } from 'next/navigation'
import { PRODUCTS } from '@/dummyData';
import Link from 'next/link';

const items = ['overview', 'usage', 'ingredients', 'pricing']

const LeftBar = ({handleSetCurrentItem, currentItem}) => {
   const router = useRouter();

   const handleLinkClick = (i) => {
     router.push(`#${i}`);
     handleSetCurrentItem(i);
   }

   return(
       <div className='flex sm:flex-col sm:gap-[24px] gap-5 max-sm:pb-5 max-sm:flex-wrap sm:border-r sm:border-r-[#D5D5D5] sm:pr-20 sm:pt-10 sm:h-[386px]'>
         {items.map((i)=> 
           <div onClick={()=>handleLinkClick(i)} key={i} className={`capitalize font-[500] text-[16px] text-[#979797] cursor-pointer`} style={{color: currentItem===i ? `black` : `#979797`}}>{i}</div>
         )}
       </div>
   );
}

const MiddleBar = ({product}) => {
   return(
       <div className='flex flex-col gap-5 max-w-[572px] sm:px-10'>
         <section id='overview' className='flex flex-col gap-5'>
              <h1 className='font-[700] text-[32px]'>Overview</h1>
              <div className='flex flex-col gap-5'>
              {product?.overview?.map((o)=> 
                 <p key={o} className='font-[400] text-[16px]'>{o}</p>
            )}
            </div>
         </section>
         <section id='usage' className='flex flex-col gap-5'>
              <h1 className='font-[700] text-[32px]'>Usage</h1>
              <div className='flex flex-col gap-5'>
              {product?.usage?.map((u)=> 
                 <p key={u} className='font-[400] text-[16px]'>{u}</p>
            )}
            </div>
         </section>
         <section id='ingredients' className='flex flex-col gap-5'>
              <h1 className='font-[700] text-[32px]'>Ingredients</h1>
              <div className='flex flex-col gap-5'>
              {product?.ingredients?.map((i)=> 
                 <p key={i} className='font-[400] text-[16px]'>{i}</p>
            )}
            </div>
         </section>
         <section id='pricing' className='flex flex-col gap-5'>
              <h1 className='font-[700] text-[32px]'>Pricing</h1>
              <div className='flex flex-col gap-5'>
              {product?.pricing?.map((p)=> 
                 <p key={p} className='font-[400] text-[16px]'>{p}</p>
            )}
            </div>
         </section>
         <section className='flex flex-col gap-2'>
           <h2 className='text-[24px] font-[600]'>Keywords</h2>
           <div className='flex items-center gap-5 flex-wrap'>
           {product?.keywords?.map((k)=> 
           <Link key={k} href={`#`} className='underline text-[16px] font-[400] '>{k}</Link>
         )}
         </div>
         </section>
         <div className='gap-5 flex items-center mt-2'>
            <div className='bg-[#F3F2F2] text-center font-[500] text-[16px] flex items-center justify-center text-[black] rounded-[24px] max-w-[133px] w-full h-[39px] pr-2'>
            <select className='bg-transparent outline-none'>
              <option value="Sources">Sources</option>
               {product?.sources?.map((s)=> 
                <option key={s}>{s}</option>
               )}
            </select>
            </div>
            <div className='bg-[#E5E3E3] text-center font-[500] text-[16px] flex items-center justify-center text-[black] rounded-[24px] max-w-[185px] w-full h-[39px] pr-2'>
            <select className='bg-transparent outline-none'>
              <option value="Updated History">Updated History</option>
               {product?.updateHistory?.map((u)=> 
                <option key={u}>{u}</option>
               )}
            </select>
            </div>
         </div>
         <div className='font-[400] text-[16px] flex flex-col gap-2 mt-2'>
               <p>Published on {product?.publishedOn}</p>
               <p>Updated on {product?.updatedOn}</p>
            </div>
       </div>
   );
}

const RightBar = ({product}) => {
   const [relatedPosts, setRelatedPosts] = useState([]);

   useEffect(()=> {
      setRelatedPosts(PRODUCTS.filter(p=> p?.author.author === product?.author))
   }, [])

   return(
       <div className='flex flex-col gap-5 sm:mt-20 sm:ml-30 max-w-[219px]'>
         <h3 className='text-[#979797] text-[16px] font-[400]'>Related Products</h3>
         {relatedPosts.map((r)=> 
           <Link href={`#`} key={r.name} className='underline font-[400] text-[20px]'>{r.name}</Link>
         )}
       </div>
   );
} 


export default function ProductPage() {   
   const params = useParams();
   const {id} = params
   const validId = id.replace(/-/g, ' ');
   const [selectedAlphabet, setSelectedAlphabet] = useState('A');
   const [product, setProduct] = useState({});
   const [currentItem, setCurrentItem] = useState('overview');
  
     const handleSetAlphabet = (alphabet) => {
      setSelectedAlphabet(alphabet);
     }

     useEffect(()=> {
      handleSetAlphabet(validId.slice(0,1))
      const selectedProduct = PRODUCTS.find(p=> p.name.toLowerCase() === validId);
      setProduct(selectedProduct);
     },[])

     const handleSetCurrentItem = (item) => {
      setCurrentItem(item)
     }
     
  
  return (
  <div className="flex w-full flex-col">
   <Navbar page={'product review'}/>
   <div className='sm:px-30 pt-20 sm:pb-15 max-sm:py-10'>
   <div className="w-full h-[360px] bg-[#F9E9DA] flex justify-center items-center"></div>
   </div>
  <section className="flex flex-col px-30 pb-20 max-sm:p-5 gap-10">
      <div className="flex items-center gap-2 text-[16px] text-[#979797]">
             <span>Home</span><RiArrowRightSLine/><span>Product</span><RiArrowRightSLine/><span className='capitalize'>{selectedAlphabet}</span><RiArrowRightSLine/><span className='capitalize'>{validId}</span>
     </div>
     <div className='flex justify-between gap-5 max-sm:flex-col'>
      <div className='flex flex-col gap-3'>
         <h1 className='font-[700] text-[48px] max-sm:text-[32px]'>{product?.name}</h1>
         <p className='font-[400] text-[16px] max-w-[455px] w-full'>{product?.desc}</p>
      </div>
      <div className='flex gap-3'>
         <div className='w-[46px] h-[46px] rounded-full bg-[#D9D9D9] flex justify-center items-center'></div>
         <div className='flex flex-col gap-0 font-[400] text-[16px] text-[#979797]'>
            <p>Written by <b className='text-black'>{product?.author}</b></p>
            <p>Posted on {product?.publishedOn}</p>
         </div>
      </div>
     </div>
     <div className='flex max-sm:flex-col sm:mt-10 max-sm:gap-10'>
      <LeftBar currentItem={currentItem} handleSetCurrentItem={handleSetCurrentItem}/>
      <MiddleBar product={product}/>
      <RightBar product={product}/>
     </div>
  </section>
   <Footer/>
  </div>
  );
}
