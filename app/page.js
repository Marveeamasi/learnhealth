'use client'

import AlphaSearch from "@/components/AlphaSearch";
import Footer from "@/components/Footer";
import HeadCard from "@/components/HeadCard";
import Navbar from "@/components/Navbar";
import { aboutList, EXPLORE_BY, FEATURED_STORIES, MORE_ARTICLES, TODAY_TOP_STORIES, TOP_ARTICLES, TOP_HEALTH_TOPICS } from "@/dummyData";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { SlArrowRightCircle } from "react-icons/sl";
import { motion, useInView } from "framer-motion";

export default function HomePage() {
  const [todayTopStories, setTodayTopStories] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [exploreBy, setExploreBy] = useState([]);
  const [topHealthTopics, setTopHealthTopics] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [moreArticles, setMoreArticles] = useState([]);

  useEffect(() => {
    setTodayTopStories(TODAY_TOP_STORIES);
    setTopArticles(TOP_ARTICLES);
    setExploreBy(EXPLORE_BY);
    setTopHealthTopics(TOP_HEALTH_TOPICS);
    setFeaturedStories(FEATURED_STORIES);
    setMoreArticles(MORE_ARTICLES);
  }, []);

  const handleSetAlphabet = (alphabet) => {
    console.log(alphabet);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
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
    <div className="flex w-full flex-col items-center gap-20">
      <Navbar page={'home'} />
      <AnimatedSection variants={fadeIn} className="flex flex-col px-30 max-sm:p-5 max-sm:pt-15 gap-15 max-sm:gap-10 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[48px] font-[700] text-center max-sm:text-[32px]"
          style={{ lineHeight: '100%' }}
        >
          Your guide to Wellness <br />and a Healthy life.
        </motion.h1>
        <div className="flex flex-col w-full gap-2">
          <motion.p
            variants={fadeIn}
            className="text-[#004D43] font-[500]"
          >
            Today’s top story
          </motion.p>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10">
            {todayTopStories.map((story, index) => (
              <motion.div
                key={story.id}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2 }}
              >
                <HeadCard img={story.image} title={story.title} />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="w-full">
        <AlphaSearch handleSetAlphabet={handleSetAlphabet} />
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
        <motion.h4 variants={slideIn} className="font-[600] text-[24px] text-[#004D43]">
          Top Articles
        </motion.h4>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
          {topArticles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <HeadCard
                img={article.image}
                title={article.title}
                h={'h-[300px]'}
                text={'text-[24px]'}
                textsm={'text-[18px]'}
              />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
        <div className="flex justify-between items-center">
          <motion.h4 variants={slideIn} className="font-[600] text-[24px] text-[#004D43]">
            Explore By
          </motion.h4>
          <motion.div variants={slideIn} className="flex gap-2 items-center text-[24px] font-[700] cursor-pointer max-sm:text-[18px]">
            View All <SlArrowRightCircle />
          </motion.div>
        </div>
        <div className="grid grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-5">
          {exploreBy.map((by, index) => (
            <motion.div
              key={by.name}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="w-full h-[278px] bg-[#F9E9DA] cursor-pointer rounded-[8px] max-sm:h-[179px] overflow-hidden flex items-center justify-center relative"
            >
              <Image src={by.img} alt={by.name} width={2000} height={2000} className="w-full h-full object-cover grayscale-75 hover:scale-105 hover:grayscale-0 transition-all duration-300 ease-in-out"/>
              <div className="absolute sm:bottom-5 max-sm:top-3 sm:left-5 max-sm:left-3 font-[600] text-[18px] bg-[#0000002c] rounded-xl p-0 px-2 text-white">{by.name}</div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
        <div className="flex justify-between items-center">
          <motion.h4 variants={slideIn} className="font-[600] text-[24px] text-[#004D43] max-sm:hidden">
            Top Health Topics
          </motion.h4>
          <motion.h4 variants={slideIn} className="font-[600] text-[24px] text-[#004D43] sm:hidden">
            Top Topics
          </motion.h4>
          <motion.div variants={slideIn} className="flex gap-2 items-center text-[24px] font-[700] cursor-pointer max-sm:text-[18px]">
            View All <SlArrowRightCircle />
          </motion.div>
        </div>
        <div className="flex items-center flex-wrap gap-5 max-sm:justify-center max-w-[1121px]">
          {topHealthTopics.map((topic, index) => (
            <motion.div
              key={topic}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="py-[10px] px-[24px] rounded-[24px] bg-[#F3F2F2] cursor-pointer"
            >
              {topic}
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
        <motion.h4 variants={slideIn} className="font-[600] text-[24px] text-[#004D43]">
          Featured Stories
        </motion.h4>
        <div className="grid grid-cols-3 gap-5 max-sm:flex max-sm:items-center max-sm:overflow-x-scroll overflow-y-hidden max-sm:pb-10">
          {featuredStories.map((fStory, index) => (
            <motion.div
              key={fStory.id}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <HeadCard
                topic={fStory.topic}
                img={fStory.image}
                title={fStory.title}
                h={'h-[300px]'}
                text={'text-[24px]'}
                isFeature={true}
                textsm={'text-[18px]'}
              />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
        <motion.h6 variants={slideIn} className="font-[400] text-[18px] text-[#004D43]">
          About LearnHealth Hub
        </motion.h6>
        <div className="flex gap-40 max-sm:flex-col max-sm:gap-10">
          <div className="flex flex-col gap-5 max-w-[512px]">
            <motion.h1
              variants={fadeIn}
              className="font-[700] text-[32px] leading-[100%]"
            >
              Bridging the gap between medical knowledge and everyday life.
            </motion.h1>
            <motion.p variants={fadeIn} className="font-[400] text-[16px]">
              We believe that everyone deserves access to high-quality health information, regardless of their background or experience. Our goal is to provide clear, accurate, and actionable content that helps you take control of your health.
            </motion.p>
            <motion.p variants={fadeIn} className="font-[400] text-[16px]">
              Illuminating health through credible information. LearnHealth Hub aims to provide reliable and up-to-date health knowledge, empowering global health awareness and understanding.
            </motion.p>
          </div>
          <motion.div
            variants={scaleIn}
            className="bg-[#F5F5F5] border border-[#E8E8E8] max-sm:border-[#000000] max-sm:bg-transparent rounded-[8px] p-5 flex flex-col gap-5 max-w-[433px] w-full h-fit"
          >
            {aboutList.map((list) => (
              <div key={list.id} className="flex items-center gap-3 min-h-[90px]">
                <div className="w-[36px] h-[36px]">
                  <img src={list.img} className="text-[#004D43] text-[36px]" />
                </div>
                <div className="h-[90px] border-l-1 border-l-[#A5A5A5]"></div>
                <div className="font-[700] text-[24px] w-[227px]">
                  {list.text}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex flex-col w-full px-30 max-sm:px-5 gap-5">
        <div className="flex justify-between items-center">
          <motion.h4 variants={slideIn} className="font-[600] text-[24px] text-[#004D43]">
            More Articles
          </motion.h4>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
          {moreArticles.map((articles, index) => (
            <motion.div
              key={articles.id}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              className="w-full h-[344px] bg-[#F9E9DA] cursor-pointer rounded-[8px] max-sm:h-[179px] flex items-center justify-center relative"
            >
              <Image
                src={articles.image}
                width={2000}
                height={2000}
                alt="bg image"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-5 left-5 gap-2 flex flex-col">
                <div className="font-[600] text-[24px] text-[#fff]">
                  {articles.title}
                </div>
                <div className="font-[400] text-[16px] text-[#fff] max-w-[462px]">
                  {articles.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex w-full max-sm:flex-col px-30 max-sm:px-5 gap-20 max-sm:gap-10 justify-center items-center">
        <motion.div variants={scaleIn}>
          <Image
            src={'/medteam.png'}
            width={2000}
            height={2000}
            alt="image"
            className="max-w-[500px] w-full"
          />
        </motion.div>
        <div className="flex flex-col max-sm:items-center gap-5 max-w-[440px]">
          <motion.h1
            variants={fadeIn}
            className="font-[700] text-[32px] leading-[100%] max-sm:text-center max-sm:text-[24px]"
          >
            We are open to provide services to Healthcare experts.
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="font-[400] text-[16px] leading-[100%] max-sm:text-center max-sm:text-[14px]"
          >
            From Content creation for Health Organizations to Blogs and Ghostwriting as well as Medical Writing (clinical trial reports, research papers) to Ebooks and Whitepapers,
          </motion.p>
          <motion.div
            variants={slideIn}
            className="flex gap-2 items-center text-[16px] max-sm:text-center font-[600] text-[#004D43] cursor-pointer"
          >
            Get in touch <SlArrowRightCircle />
          </motion.div>
        </div>
      </AnimatedSection>
      <AnimatedSection variants={fadeIn} className="flex w-full flex-col px-30 max-sm:px-5 gap-10 max-sm:gap-5 justify-center items-center">
        <div className="flex flex-col items-center gap-5 max-w-[440px]">
          <motion.h1
            variants={fadeIn}
            className="font-[700] text-[32px] leading-[100%] text-center max-sm:text-[24px]"
          >
            You can be confident that experts are providing you with the information.
          </motion.h1>
          <motion.div
            variants={slideIn}
            className="flex gap-2 items-center text-[16px] max-sm:text-center font-[600] text-[#004D43] cursor-pointer"
          >
            See how we maintain our content integrity <SlArrowRightCircle />
          </motion.div>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  );
}