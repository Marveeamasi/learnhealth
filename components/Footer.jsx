import Link from 'next/link';
import React from 'react'
import { FaLinkedin, FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full justify-center items-center gap-20 p-30 max-sm:p-5 max-sm:py-20 bg-[#FCF6F0]">
    <div className="flex max-sm:flex-col w-full justify-center gap-30">
      <div className="max-w-[432px] w-full flex flex-col gap-5">
         <h1 className="text-[24px] font-[700]">Sign up for our newsletter</h1>
         <p className="text-[16px] font-[400]">Stay up to date on all things health and wellbeing.</p>
         <div className="h-[53px] w-full bg-[white] flex items-center rounded-[32px] p-2">
          <input placeholder="Enter your email address" className="flex-[1] p-2 outline-none"/>
          <button className="w-[111px] h-[41px] rounded-[24px] bg-[#FCF6F0] font-[500] text-[14px] cursor-pointer">Subscribe</button>
         </div>
         <div className="text-[#F3D1B6] gap-2 flex items-center text-[24px]">
          <Link href={'#'}><FaLinkedin/></Link>
          <Link href={'#'}><FaFacebook/></Link>
          <Link href={'#'}><FaXTwitter/></Link>
          <Link href={'#'}><FaInstagram/></Link>
         </div>
      </div>
      <div className="flex gap-20">
           <div className="flex gap-20 max-sm:flex-col">
            <div className="flex flex-col gap-5">
              <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">Policy</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Advertising</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Editorial</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Privacy</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Terms of use</Link>
            </div>
            <div className="flex flex-col gap-5">
              <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">About</Link>
              <Link href={'#'} className="font-[400] text-[18px]">News</Link>
              <Link href={'/services'} className="font-[400] text-[18px]">Services</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Sitemap</Link>
            </div>
           </div>
           <div className="flex flex-col gap-5">
           <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">Advertisement</Link>
           <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">Newsletter</Link>
           </div>
      </div>
      </div>
      <hr className="text-[#D4D4D4] w-full h-[1px]"/>
   </footer>
  )
}
