'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import { SlArrowRightCircle } from 'react-icons/sl'
import { BLOGS } from "@/dummyData";

const SearchTerm = ({products}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSearchResults, setFilteredSearchResults] = useState([])
  const [showAllSearchResults, setShowAllSearchResults] = useState(false)

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setFilteredSearchResults([])
      return
    }
    const lowerTerm = term.toLowerCase()
    const filtered = products
    .filter(item =>
      item?.keywords?.some(keyword =>
        keyword?.toLowerCase()?.includes(lowerTerm)
      )
    )
      .sort()
    setFilteredSearchResults(filtered)
  }

  const shouldShowSearchResults = searchTerm.trim() !== ''

  return (
    <section className="flex flex-col w-full gap-10 relative">

      {shouldShowSearchResults && (
        <div className={`bg-[#F9E9DA] px-30 py-10 max-sm:px-5 w-screen absolute top-[-300px] max-sm:top-[-300px] left-[-9%] shadow-lg flex flex-col justify-between gap-5 z-30`}>
          <div className={`grid grid-cols-3 gap-5 justify-between items-center max-w-[897px] w-full ${showAllSearchResults && 'max-h-[192px] overflow-y-scroll'}`}>
           {filteredSearchResults?.length === 0?
        <>
        Result for "{searchTerm}" not found
        </>
        :
        <> 
        {(showAllSearchResults ? filteredSearchResults : filteredSearchResults.slice(0, 12)).map(topic =>
              <Link href={'/topic/'+topic.name.replace(/ /g,'-')} key={topic.name} className='text-[20px] max-sm:text-[12px] font-[400]'>{topic.name}</Link>
            )}
            </>
            }
          </div>
        {filteredSearchResults?.length > 12 && (
        <div
            className="flex gap-2 items-center text-[20px] max-sm:text-center font-[700] cursor-pointer"
            onClick={() => setShowAllSearchResults(prev => !prev)}
        >
            {showAllSearchResults ? 'View Less' : 'View All'} <SlArrowRightCircle className={showAllSearchResults ? `rotate-270 ` : `rotate-90`}/>
        </div>
        )}
        </div>
      )}

      <div className='flex flex-col w-full gap-10'>
        <div className="max-w-[466px] w-full h-[53px] rounded-[32px] font-[400] bg-[#F3F2F2] flex items-center py-[18px] px-[24px]">
          <input
            className="outline-none placeholder:text-[#858585] text-sm flex-[1]"
            placeholder="Search by keyword, products, ebooks"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <CiSearch />
        </div>
      </div>
    </section>
  )
}

const ProductLists = ({products}) => {
  
  return (
    <section className="flex flex-col w-full gap-5 mt-10">
    <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-5">
      {products.map(p => 
       <Link href={`/product-review/${p.name.replace(/ /g, '-')}`} key={p.name} className="w-full h-[278px] bg-[#F9E9DA] cursor-pointer rounded-[8px] max-sm:h-[179px] flex items-center justify-center relative p-5">
        <div className="absolute sm:bottom-5 max-sm:top-3 sm:left-5 max-sm:left-3 font-[600] text-[18px]">{p.name}</div>
       </Link>
      )
      }
     </div>
   </section>
  )
}


 
export default function DiscoverPage() {   
   const [products, setProducts] = useState([]);
       useEffect(()=> {
             setProducts(BLOGS.filter(b=> b?.category === 'products'));
         },[])
  
  return (
  <div className="flex w-full flex-col">
   <Navbar page={'discover'}/>
   <section className="px-30 py-20 max-sm:p-5 flex flex-col gap-5">
    <div className="font-[700] text-[48px]">Discover</div>
    <p className="font-[400] text-[16px] max-w-[455px]">Discover our valuable products, ebooks, audio, notes and more to keep you up to date and at the top on a healthy journey.</p>
    <SearchTerm products={products}/>
   <ProductLists products={products}/>
   </section>
   <div className="p-40"></div>
   <Footer/>
  </div>
  );
}
