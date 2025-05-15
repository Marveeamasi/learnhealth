'use client'

import Navbar from '@/components/Navbar';
import { BOOKING, NEWSLETTER_EMAILS } from '@/dummyData';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GoDotFill } from 'react-icons/go';
import { motion, useInView } from 'framer-motion';

const LeftBar = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="flex sm:flex-col sm:gap-[24px] gap-5 max-sm:pb-5 max-sm:flex-wrap sm:border-r flex-[2] sm:border-r-[#D5D5D5] sm:pr-20 sm:pt-10"
    >
      <motion.h1 variants={fadeIn} className="font-semibold text-xl w-full max-sm:text-center">
        Newsletter emails
      </motion.h1>
      <div className="flex gap-5 flex-wrap max-sm:justify-center">
        {NEWSLETTER_EMAILS.map((e, index) => (
          <motion.div
            key={e}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Link href="#" className="text-[10px] p-2 rounded-xl bg-[#f5f5f5]">
              {e}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const MiddleBar = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="flex flex-col gap-5 max-w-[572px] flex-[3] sm:pl-10"
    >
      <motion.h1 variants={fadeIn} className="font-semibold text-xl max-sm:text-center">
        All bookings
      </motion.h1>
      <motion.div variants={scaleIn} className="w-full h-[53px] rounded-[32px] font-[400] slim flex items-center py-[18px] px-[24px]">
        <input
          className="outline-none placeholder:text-[#858585] text-sm flex-[1]"
          placeholder="Search by date, services, user"
        />
        <CiSearch />
      </motion.div>
      <div className="grid grid-cols-2 gap-5">
        {BOOKING.map((b, index) => (
          <motion.div
            key={b?.message + b?.name}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
            className="rounded-xl slim p-5 flex flex-col w-full gap-5"
          >
            <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:justify-center">
              <div className="flex flex-col max-sm:items-center">
                <div className="flex items-center text-[10px] font-bold">{b.name}</div>
                <Link href="#" className="flex items-center text-[10px]">
                  {b.email}
                </Link>
              </div>
              <div className="flex items-center text-[10px]">
                <GoDotFill className="text-[#06d106] text-[16px]" />
                {b.service}
              </div>
            </div>
            <div className="text-sm max-sm:text-center">{b.message}</div>
            <div className="flex items-center text-[10px] w-full text-[gray] max-sm:justify-center">
              Wed, Feb 2025
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function AdminPage() {
  const params = useParams();
  const { auth } = params;
  const router = useRouter();

  useEffect(() => {
    if (auth !== 'qwerty') {
      router.push('/');
    }
  }, [auth]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const AnimatedSection = ({ children, variants, className }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="flex w-full flex-col">
      <Navbar page={'admin'} />
      <AnimatedSection variants={fadeIn} className="flex flex-col px-30 py-20 max-sm:p-5 gap-10">
        <div className="flex justify-between gap-5 max-sm:flex-col">
          <div className="flex flex-col gap-3">
            <motion.h1
              variants={slideIn}
              className="font-[700] text-[48px] max-sm:text-[32px] w-full max-sm:text-center"
            >
              Admin Panel
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="font-[400] text-[16px] max-w-[455px] w-full max-sm:text-center"
            >
              Oversee all activities with administrative privileges
            </motion.p>
          </div>
        </div>
        <AnimatedSection variants={fadeIn} className="flex max-sm:flex-col sm:mt-10 max-sm:gap-10">
          <LeftBar />
          <MiddleBar />
        </AnimatedSection>
      </AnimatedSection>
    </div>
  );
}