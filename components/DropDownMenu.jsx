import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function DropDownMenu() {
  return (
    <div className='sm:hidden fixed bg-[#ffffffd8] w-full h-full rounded-t-2xl right-0 top-22 p-5 backdrop-blur-sm flex flex-col items-center gap-5'>
       <div className='flex items-center gap-[8px] cursor-pointer hover:font-semibold'>Discover <IoIosArrowDown /></div>
       <div className='flex items-center gap-[8px] cursor-pointer hover:font-semibold'>Health Conditions <IoIosArrowDown /></div>
       <Link href={'#'} className='flex items-center gap-[8px] cursor-pointer hover:font-semibold'>About</Link>
       <Link href={'#'} className='w-[132px] h-[37px] rounded-[24px] border border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] text-sm cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out'>Get in Touch!</Link>
    </div>
  )
}
