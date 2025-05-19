'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutPage() {   
 
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const AnimatedSection = ({ children, variants, className }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="flex w-full flex-col leading-5">
      <Navbar page={'about'} />
      <AnimatedSection
        variants={fadeIn}
        className="px-30 py-20 max-sm:p-5 max-sm:pb-10 flex flex-col gap-10"
      >
        <motion.h1
          variants={slideIn}
          className="text-[48px] font-[700] max-sm:text-[32px]"
        >
          About Us
        </motion.h1>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10">
          <motion.div
            variants={scaleIn}
            className="bg-[#F9E9DA] rounded-[8px] p-10 max-sm:p-5 flex flex-col gap-5 shadow-sm border border-[#E8E8E8]"
          >
            <h2 className="font-[700] text-[24px] text-[#004D43]">Our Mission</h2>
            <p className="font-[400] text-[16px]">
              To empower individuals worldwide with accessible, reliable, and actionable health information, fostering informed decisions and healthier lives.
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            className="bg-[#F9E9DA] rounded-[8px] p-10 max-sm:p-5 flex flex-col gap-5 shadow-sm border border-[#E8E8E8]"
          >
            <h2 className="font-[700] text-[24px] text-[#004D43]">Our Vision</h2>
            <p className="font-[400] text-[16px]">
              To bridge the gap between medical knowledge and everyday life, creating a global community that thrives on trusted health education.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>
      <AnimatedSection
        variants={fadeIn}
        className="px-30 py-20 max-sm:p-5 max-sm:pb-10 flex flex-col gap-10"
      >
        <motion.h1
          variants={slideIn}
          className="text-[32px] font-[700]"
        >
          Our Founder
        </motion.h1>
        <div className="flex max-sm:flex-col gap-20 max-sm:gap-10 items-center">
          <motion.div
            variants={scaleIn}
            className="max-w-[484px] w-full h-[490px] max-sm:h-[480px] bg-[#D9D9D9] flex items-center justify-center"
          >
            {/* Placeholder for founder image */}
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-5 font-[400] text-[16px] flex-[1] max-w-[451px] w-full"
          >
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p></p>
          </motion.div>
        </div>
      </AnimatedSection>
      <AnimatedSection
        variants={fadeIn}
        className="px-30 py-20 max-sm:p-5 max-sm:pb-10 flex flex-col gap-10"
      >
        <motion.h1
          variants={slideIn}
          className="text-[32px] font-[700]"
        >
          Our Co-Founder
        </motion.h1>
        <div className="flex max-sm:flex-col-reverse gap-20 max-sm:gap-10 items-center">
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-5 font-[400] text-[16px] flex-[1] max-w-[451px] w-full"
          >
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p></p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            className="max-w-[484px] w-full h-[490px] max-sm:h-[480px] bg-[#D9D9D9] flex items-center justify-center"
          >
            <Image
              src={'/co-founder1.jpg'}
              alt="co-founder pix"
              width={2000}
              height={2000}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        </div>
      </AnimatedSection>
      <AnimatedSection
        variants={fadeIn}
        className="px-30 py-20 max-sm:p-5 max-sm:pb-10 flex flex-col gap-10"
      >
        <motion.h1
          variants={slideIn}
          className="text-[32px] font-[700]"
        >
          Our Director
        </motion.h1>
        <div className="flex max-sm:flex-col-reverse gap-20 max-sm:gap-10 items-center">
          <motion.div
            variants={scaleIn}
            className="max-w-[484px] w-full h-[490px] max-sm:h-[480px] bg-[#D9D9D9] flex items-center justify-center"
          >
            {/* Placeholder for director image */}
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-5 font-[400] text-[16px] flex-[1] max-w-[451px] w-full"
          >
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p>
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </p>
            <p></p>
          </motion.div>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  );
}