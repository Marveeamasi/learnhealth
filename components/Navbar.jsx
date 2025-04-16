import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import DropDownMenu from './DropDownMenu';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-[#F0EEFF] w-full h-[100px] sticky top-0 z-10 flex justify-between items-center px-20 max-sm:px-5 transition-all duration-300 ease-in-out'>
      <Link href={'#'} className='text-[32px] max-sm:text-[24px] font-[700] cursor-pointer' style={{lineHeight: '30px'}}>Learn<br className='sm:hidden'/>Health</Link>
      <div className='flex w-[358px] justify-between font-[400] items-center max-sm:hidden'>
        <div className='flex items-center gap-[8px] cursor-pointer hover:font-semibold'>Discover <IoIosArrowDown /></div>
        <div className='flex items-center gap-[8px] cursor-pointer hover:font-semibold'>Health Conditions <IoIosArrowDown /></div>
        <Link href={'#'} className='flex items-center gap-[8px] max-sm:hidden cursor-pointer hover:font-semibold'>About</Link>
      </div>
      <Link href={'#'} className='w-[132px] h-[37px] rounded-[24px] border border-[#000000] hover:bg-[#000000] max-sm:hidden hover:text-[#ffffff] text-sm cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out'>Get in Touch!</Link>
     {isOpen? <IoIosArrowUp onClick={()=> setIsOpen(false)} className='sm:hidden text-[32px] cursor-pointer'/> : <HiMenu onClick={()=> setIsOpen(true)} className='sm:hidden text-[32px] cursor-pointer'/>}
     {isOpen && <DropDownMenu/>}
    </div>
  )
}

