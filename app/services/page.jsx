'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SERVICES } from "@/dummyData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { SlArrowRightCircle } from "react-icons/sl";
import { motion, useInView } from "framer-motion";

const Service = ({ service }) => {
  // Animation variants
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Use useInView to trigger animation when the component is in view
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleIn}
      className="flex flex-col rounded-[8px] bg-[#F9E9DA] h-[370px]"
    >
      <Image
        width={2000}
        height={2000}
        alt={'service image' + service?.id}
        src={service?.img}
        className="w-full h-[193.14px] object-top object-cover rounded-t-[8px]"
      />
      <div className="flex flex-col gap-5 p-5 max-sm:gap-3 max-sm:p-3 h-full">
        <motion.h2
          variants={scaleIn}
          className="font-[700] text-[18px]"
        >
          {service?.heading}
        </motion.h2>
        <motion.p
          variants={scaleIn}
          className="font-[400] text-[16px]"
        >
          {service?.paragraph}
        </motion.p>
        <div className="h-full flex items-end">
          <motion.div variants={scaleIn}>
            <Link
              href={`/contact-us/?service=${service?.heading}`}
              className="flex gap-2 items-center font-[600] cursor-pointer text-[16px]"
            >
              Book service <SlArrowRightCircle />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(SERVICES);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Component to handle in-view animations
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
      <Navbar page={'services'} />
      <AnimatedSection
        variants={fadeIn}
        className="px-30 py-20 max-sm:p-5 max-sm:pt-15 flex flex-col gap-5"
      >
        <motion.div
          variants={slideIn}
          className="font-[700] text-[48px] max-sm:text-[32px]"
        >
          Our Services
        </motion.div>
        <motion.p
          variants={fadeIn}
          className="font-[400] text-[16px] max-w-[455px]"
        >
          From Content creation for Health Organizations to Blogs and Ghostwriting as well as Medical Writing (clinical trial reports, research papers) to Ebooks and Whitepapers,
        </motion.p>
        <div className="gap-5 grid grid-cols-4 max-lg:grid-cols-2 mt-10 max-sm:grid-cols-1 max-sm:mt-15">
          {services.map((s, index) => (
            <motion.div
              key={s.id}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <Service service={s} />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      <div className="p-40"></div>
      <Footer />
    </div>
  );
}