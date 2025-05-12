'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import DropDownMenu from './DropDownMenu';

export default function Navbar({page}) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-[#F5F5F5] w-full h-[70px] sticky top-0 z-10 flex justify-between items-center px-30 max-sm:px-5 transition-all duration-300 ease-in-out'>
      <Link href={'/'} className='text-[32px] max-lg:text-[24px] font-[700] cursor-pointer' style={{lineHeight: '30px'}}>Learn<br className='sm:hidden'/>Health</Link>
      <div className='flex justify-between font-[400] gap-10 max-lg:gap-5 items-center max-sm:hidden'>
        <Link href={'/discover'} className='hover:font-semibold' style={{fontWeight: page==='discover' && '600'}}>Discover</Link>
        <Link href={'/health-topics'} className={`hover:font-semibold`} style={{fontWeight: page==='health topics' && '600'}}>Health Topics</Link>
        <Link href={'/about'} className='hover:font-semibold' style={{fontWeight: page==='about' && '600'}}>About</Link>
        <Link href={'/services'} className='hover:font-semibold' style={{fontWeight: page==='services' && '600'}}>Services</Link>
      </div>
      <Link href={'/contact-us'} className='w-[132px] h-[37px] rounded-[24px] border border-[#000000] hover:bg-[#000000] max-sm:hidden hover:text-[#ffffff] text-sm cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out'>Get in Touch!</Link>
     {isOpen? <IoIosArrowUp onClick={()=> setIsOpen(false)} className='sm:hidden text-[32px] cursor-pointer'/> : <HiMenu onClick={()=> setIsOpen(true)} className='sm:hidden text-[32px] cursor-pointer'/>}
     {isOpen && <DropDownMenu/>}
    </div>
  )
}

