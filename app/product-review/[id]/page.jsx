'use client'

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams, useRouter } from 'next/navigation'
import { BLOGS } from '@/dummyData';
import Link from 'next/link';
import Image from 'next/image';


const LeftBar = ({handleSetCurrentItem, currentItem, product}) => {
   const router = useRouter();

   const handleLinkClick = (h) => {
     router.push(`#${h.replace(/ /g, '-').toLowerCase()}`);
     handleSetCurrentItem(h);
   }

   return(
       <div className='flex sm:flex-col sm:gap-[24px] gap-5 max-sm:pb-5 max-sm:flex-wrap sm:border-r sm:border-r-[#D5D5D5] sm:pr-20 sm:pt-10 sm:h-[386px]'>
         {product?.headings?.map((h)=> 
           <div onClick={()=>handleLinkClick(h?.name)} key={h?.name} className={`capitalize font-[500] text-[16px] text-[#979797] cursor-pointer`} style={{color: currentItem===h?.name ? `black` : `#979797`}}>{`${h?.name.slice(0,16)}${h?.name.length>16 ? '..' : ''}`}</div>
         )}
       </div>
   );
}

const MiddleBar = ({product}) => {
   return(
       <div className='flex flex-col gap-5 max-w-[572px] sm:px-10'>
         {product?.headings?.map(h=>
             <section key={h?.name} id={h?.name?.replace(/ /g, '-').toLowerCase()} className='flex flex-col gap-5'>
             <h1 className='font-[700] text-[32px]'>{h?.name}</h1>
             <div className='flex flex-col gap-5'>
             {h?.paragraphs?.map((p)=> 
                <span key={p?.text} className='font-[400] text-[16px]'>
                  {p?.heading && <span className='font-[600] text-[18px]' style={{display: p?.heading?.includes(':')?'initial' : 'block'}}>{p?.heading}</span>}
                  {p?.text}
                </span>
           )}
           </div>
        </section>
         )}
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
      setRelatedPosts(BLOGS.filter(b=> b?.group === product?.group))
   }, [product])

   return(
       <div className='flex flex-col gap-5 sm:mt-20 sm:ml-30 max-w-[219px]'>
         <h3 className='text-[#979797] text-[16px] font-[400]'>Related BLOGS</h3>
         {relatedPosts.map((r)=> 
           <Link href={`/product-review/${r.name.replace(/ /g, '-').toLowerCase()}`} key={r.name} className='underline font-[400] text-[20px]'>{r.name}</Link>
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
      const selectedProduct = BLOGS.find(b=> b?.category === 'products' && b?.name.toLowerCase() === validId.toLowerCase());
      setProduct(selectedProduct);
     },[])

     const handleSetCurrentItem = (item) => {
      setCurrentItem(item)
     }
     
  
  return (
  <div className="flex w-full flex-col">
   <Navbar page={'product review'}/>
   <div className='sm:px-30 pt-20 sm:pb-15 max-sm:py-10'>
   <div className="w-full h-[360px] bg-[#F9E9DA] flex justify-center items-center">
      {product?.media && product?.mediaType === 'image' && <Image src={product?.media} width={2000} height={2000} alt='image banner' className='w-full h-full object-contain'/>}
      {product?.media && product?.mediaType === 'video' && <video src={product?.media} autoPlay controls className='w-full h-full object-contain'/>}
      {product?.media && product?.mediaType === 'audio' && <audio controls className='w-full h-full accent-[#F9E9DA] bg-transparent text-[#F9E9DA]'>
          <source src={product?.media}/>
          Your browser does not support this audio
         </audio>}
   </div>
   </div>
  <section className="flex flex-col px-30 pb-20 max-sm:p-5 gap-10">
      <div className="flex items-center gap-2 text-[16px] text-[#979797] flex-wrap">c
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
      <LeftBar currentItem={currentItem} handleSetCurrentItem={handleSetCurrentItem} product={product}/>
      <MiddleBar product={product}/>
      <RightBar product={product}/>
     </div>
  </section>
   <Footer/>
  </div>
  );
}
