import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function DropDownMenu() {
  return (
    <div className='sm:hidden fixed bg-[#F9E9DA] w-full h-[70%] right-0 top-22 p-5 z-10 flex flex-col gap-5 text-[24px] font-[600] shadow-lg'>
       <Link href={'/discover'} className=''>Discover</Link>
       <Link href={'/health-topics'} className=''>Health Topics</Link>
       <Link href={'/about'} className=''>About</Link>
        <Link href={'/services'} className=''>Services</Link>
       <Link href={'/contact-us'} className='w-[132px] h-[37px] rounded-[24px] border border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] text-sm cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out'>Get in Touch!</Link>
    </div>
  )
}
