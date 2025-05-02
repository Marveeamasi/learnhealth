import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function DropDownMenu() {
  return (
    <div className='sm:hidden fixed bg-[#F9E9DA] w-full h-[70%] right-0 top-22 p-5 z-10 flex flex-col gap-5 text-[24px] font-[600] shadow-lg'>
       <Link href={'#'} className='flex items-center gap-[8px] cursor-pointer'>Discover</Link>
       <Link href={'/health-topics'} className='flex items-center gap-[8px] cursor-pointer'>Health Topics</Link>
       <Link href={'#'} className='flex items-center gap-[8px] cursor-pointer'>About</Link>
       <Link href={'#'} className='w-[132px] h-[37px] rounded-[24px] border border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] text-sm cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out'>Get in Touch!</Link>
    </div>
  )
}
