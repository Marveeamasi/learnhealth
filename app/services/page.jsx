'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SERVICES } from "@/dummyData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlArrowRightCircle } from "react-icons/sl";


const Service = ({service}) => {
  return(
    <div className="flex flex-col rounded-[8px] bg-[#F9E9DA] h-[370px]">
      <Image width={2000} height={2000} alt={'service image'+service?.id} src={service?.img} className="w-full h-[193.14px] object-top object-cover rounded-t-[8px]"/>
      <div className="flex flex-col gap-5 p-5 max-sm:gap-3 max-sm:p-3 h-full">
        <h2 className="font-[700] text-[18px]">{service?.heading}</h2>
        <p className="font-[400] text-[16px]">{service?.paragraph}</p>
        <div className="h-full flex items-end">
        <Link href={`/contact-us/?service=${service?.heading}`} className="flex gap-2 items-center font-[600] cursor-pointer text-[16px]">Book service <SlArrowRightCircle/></Link>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() { 
  const [services, setServices] = useState([]);

  useEffect(()=> {
 setServices(SERVICES);
  },[])

  return (
  <div className="flex w-full flex-col leading-5">
   <Navbar page={'services'}/>
   <section className="px-30 py-20 max-sm:p-5 max-sm:pt-15 flex flex-col gap-5">
   <div className="font-[700] text-[48px] max-sm:text-[32px]">Our Services</div>
    <p className="font-[400] text-[16px] max-w-[455px]">From Content creation for Health Organizations to Blogs and 
Ghostwriting as well as Medical Writing (clinical trial reports, 
research papers) to Ebooks and Whitepapers,</p>
<div className="gap-5 grid grid-cols-4 max-lg:grid-cols-2 mt-10 max-sm:grid-cols-1 max-sm:mt-15">
  {services.map(s=> 
    <Service service={s} key={s.id}/>
  )}
</div>
   </section>
   <div className="p-40"></div>
   <Footer/>
  </div>
  );
}
