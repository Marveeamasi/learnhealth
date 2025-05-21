'use client'

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import moment from 'moment';

const LeftBar = ({ handleSetCurrentItem, currentItem, article }) => {
  const router = useRouter();

  const handleLinkClick = (h) => {
    router.push(`#${h}`);
    handleSetCurrentItem(h);
  }

  return (
    <div className='flex sm:flex-col sm:gap-[24px] gap-5 max-sm:pb-5 max-sm:flex-wrap sm:border-r sm:border-r-[#D5D5D5] sm:pr-20 sm:pt-10 sm:h-[386px]'>
      {article?.headings?.map((h) => 
        <div 
          onClick={() => handleLinkClick(h?.name)} 
          key={h?.name} 
          className={`capitalize font-[500] text-[16px] text-[#979797] cursor-pointer`} 
          style={{ color: currentItem === h?.name ? `black` : `#979797` }}
        >
          {`${h?.name.slice(0, 16)}${h?.name.length > 16 ? '..' : ''}`}
        </div>
      )}
    </div>
  );
}

const MiddleBar = ({ article }) => {
  return (
    <div className='flex flex-col gap-5 max-w-[572px] sm:px-10'>
      {article?.headings?.map(h =>
        <section key={h?.name} id={h?.name} className='flex flex-col gap-5'>
          <h1 className='font-[700] text-[32px]'>{h?.name}</h1>
          <div className='flex flex-col gap-5'>
            {h?.paragraphs?.map((p) => 
              <span key={p?.text} className='font-[400] text-[16px]'>
                {p?.heading && (
                  <span 
                    className='font-[600] text-[18px]' 
                    style={{ 
                      display: p?.heading?.includes(':') ? 'initial' : 'block', 
                      marginRight: p?.heading?.includes(':') ? '5px' : '0px' 
                    }}
                  >
                    {p?.heading}
                  </span>
                )}
                {p?.text}
              </span>
            )}
          </div>
        </section>
      )}
      <section className='flex flex-col gap-2'>
        <h2 className='text-[24px] font-[600]'>Keywords</h2>
        <div className='flex items-center gap-5 flex-wrap'>
          {article?.keywords?.map((k) => 
            <Link key={k} href={`#`} className='underline text-[16px] font-[400]'>{k}</Link>
          )}
        </div>
      </section>
      <div className='gap-5 flex items-center mt-2'>

          <select className='outline-none bg-[#F3F2F2] font-[500] text-[16px] flex items-center justify-center px-2 text-[black] rounded-[24px] max-w-[133px] w-full h-[39px] '>
            <option value="Sources">Sources</option>
            {article?.sources?.map((s) => 
              <option key={s}>{s}</option>
            )}
          </select>
        
          <select className='outline-none bg-[#E5E3E3] font-[500] text-[16px] flex items-center justify-center px-2 text-[black] rounded-[24px] max-w-[185px] w-full h-[39px] '>
            <option value="Updated History">Updated History</option>
            {article?.updateHistory?.map((u) => 
              <option key={u}>{u}</option>
            )}
          </select>
      </div>
      <div className='font-[400] text-[16px] flex flex-col gap-2 mt-2'>
        <p>Published on {moment(article?.published_on).fromNow()}</p>
        <p>Updated on {moment(article?.created_at).fromNow()}</p>
      </div>
    </div>
  );
}

const RightBar = ({ article }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        const related = response.data.filter(b => b?.group === article?.group && b?.id !== article?.id);
        setRelatedPosts(related);
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };
    if (article?.group) {
      fetchRelatedPosts();
    }
  }, [article]);

  return (
    <div className='flex flex-col gap-5 sm:mt-20 sm:ml-30 max-w-[219px]'>
      <h3 className='text-[#979797] text-[16px] font-[400]'>Related Blogs</h3>
      {relatedPosts.map((r) => 
        <Link href={`/health-topics/${r.id}`} key={r.id} className='underline font-[400] text-[20px]'>{r.name}</Link>
      )}
    </div>
  );
}

export default function ArticlePage() {   
  const params = useParams();
  const { id } = params;
  const [selectedAlphabet, setSelectedAlphabet] = useState('A');
  const [article, setArticle] = useState(null);
  const [currentItem, setCurrentItem] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        const selectedArticle = response.data;
        if (!selectedArticle || selectedArticle.category !== 'articles') {
          throw new Error('Article not found');
        }
        setArticle(selectedArticle);
        setSelectedAlphabet(selectedArticle?.name?.[0]?.toUpperCase() || 'A');
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleSetCurrentItem = (item) => {
    setCurrentItem(item);
  }

  if (loading) {
    return <div className="text-center text-gray-500 px-30 max-sm:px-5 py-20">Loading...</div>;
  }

  if (error || !article) {
    return <div className="text-center text-red-500 px-30 max-sm:px-5 py-20">{error || 'Article not found'}</div>;
  }

  return (
    <div className="flex w-full flex-col">
      <Navbar page={'health topics'} />
      <div className='w-full relative h-[402px] max-sm:h-[250px] bg-[gray] flex justify-center items-center'>
        {article?.media_type === 'image' && (
          <Image 
            width={2000} 
            height={2000} 
            alt='topic banner' 
            src={article.media} 
            className='absolute w-full h-full object-cover object-center'
          />
        )}
        <div className='absolute max-sm:hidden left-0 flex flex-col gap-5 w-[90%] h-full px-30 max-sm:px-5 py-20 max-sm:py-5' style={{ background: `linear-gradient(90deg, #343434 35.76%, rgba(102, 101, 101, 0) 65.49%)` }}>
          <div className="flex items-center gap-2 text-[16px] text-[#979797]">
            <span>Home</span><RiArrowRightSLine /><span>Health Topics</span><RiArrowRightSLine /><span className='capitalize'>{selectedAlphabet}</span><RiArrowRightSLine /><span>{article.name}</span>
          </div> 
          <h1 className='font-[700] max-w-[625px] text-[40px] max-sm:text-[28px] text-[#FBFBFB]'>{article?.name}</h1>
          <div className='flex gap-3'>
            <div className='w-[46px] h-[46px] rounded-full bg-[#D9D9D9] flex justify-center items-center'></div>
            <div className='flex flex-col gap-0 font-[400] text-[16px] text-[#979797]'>
              <p>Written by <b className='text-white'>{article?.author}</b></p>
              <p>Posted on {article?.publishedOn}</p>
            </div>
          </div>
        </div>
      </div>
      <section className="flex flex-col px-30 py-20 max-sm:p-5 gap-10">
        <div className="flex sm:hidden items-center gap-2 text-[16px] text-[#979797] flex-wrap">
          <span>Home</span><RiArrowRightSLine /><span>Health Topics</span><RiArrowRightSLine /><span className='capitalize'>{selectedAlphabet}</span><RiArrowRightSLine /><span>{article.name}</span>
        </div>
        <div className='flex justify-between gap-5 sm:hidden max-sm:flex-col'>
          <div className='flex flex-col gap-3'>
            <h1 className='font-[700] text-[48px] max-sm:text-[32px]'>{article?.name}</h1>
            <p className='font-[400] text-[16px] max-w-[455px] w-full'>{article?.desc}</p>
          </div>
          <div className='flex gap-3'>
            <div className='w-[46px] h-[46px] rounded-full bg-[#D9D9D9] flex justify-center items-center'></div>
            <div className='flex flex-col gap-0 font-[400] text-[16px] text-[#979797]'>
              <p>Written by <b className='text-black'>{article?.author}</b></p>
              <p>Posted on {article?.publishedOn}</p>
            </div>
          </div>
        </div>
        <div className='flex max-sm:flex-col sm:mt-10 max-sm:gap-10'>
          <LeftBar currentItem={currentItem} handleSetCurrentItem={handleSetCurrentItem} article={article} />
          <MiddleBar article={article} />
          <RightBar article={article} />
        </div>
      </section>
      <Footer />
    </div>
  );
}