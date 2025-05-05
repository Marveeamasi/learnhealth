'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {   
   
  return (
  <div className="flex w-full flex-col leading-5">
   <Navbar page={'about'}/>
   <section className="px-30 py-20 max-sm:p-5 max-sm:pb-10 flex flex-col gap-10">
   <h1 className="text-[32px] font-[700]">Our Founder</h1>
   <div className="flex max-sm:flex-col gap-20 max-sm:gap-10 items-center">
    <div className="max-w-[484px] w-full h-[490px] max-sm:h-[480px] bg-[#D9D9D9] flex items-center justify-center">
         
    </div>
    <div className="flex flex-col gap-5 font-[400] text-[16px] flex-[1] max-w-[451px] w-full">
      <p>We believe that everyone deserves access to 
high-quality health information, regardless of their background 
or experience. Our goal is to provide clear, accurate, and 
actionable content that helps you take control of your health.
</p>
<p>We believe that everyone deserves access to 
high-quality health information, regardless of their background 
or experience. Our goal is to provide clear, accurate, and 
actionable content that helps you take control of your health.
</p>
<p>We believe that everyone deserves access to 
high-quality health information, regardless of their background 
or experience. Our goal is to provide clear, accurate, and 
actionable content that helps you take control of your health.
</p>
<p></p>
    </div>
   </div>
   </section> 
   <Footer/>
  </div>
  );
}
