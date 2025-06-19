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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LeftBar = ({ handleSetCurrentItem, currentItem, product }) => {
  const router = useRouter();

  const handleLinkClick = (h) => {
    router.push(`#${h}`);
    handleSetCurrentItem(h);
  }

  return (
    <div className='flex sm:flex-col sm:gap-[24px] gap-5 max-sm:pb-5 max-sm:flex-wrap sm:border-r sm:border-r-[#D5D5D5] sm:pr-20 sm:pt-10 sm:h-[386px]'>
      {product?.headings?.map((h) => 
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

const MiddleBar = ({ product }) => {
  return (
    <div className='flex flex-col gap-5 max-w-[572px] sm:px-10'>
      {product?.headings?.map(h =>
        <section key={h?.name} id={h?.name} className='flex flex-col gap-5'>
          <h1 className='font-[700] text-[32px]'>{h?.name}</h1>
          <div className='prose flex flex-col gap-5'>
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>
                     {h?.paragraphs}
                     </ReactMarkdown>
                   </div>
        </section>
      )}
      <section className='flex flex-col gap-2'>
        <h2 className='text-[24px] font-[600]'>Keywords</h2>
        <div className='flex items-center gap-5 flex-wrap'>
          {product?.keywords?.map((k) => 
            <Link key={k} href={`#`} className='underline text-[16px] font-[400]'>{k}</Link>
          )}
        </div>
      </section>
      <div className='gap-5 flex items-center mt-2'>
          <select className='bg-[#F3F2F2] font-[500] text-[16px] flex items-center justify-center text-[black] rounded-[24px] max-w-[133px] w-full h-[39px] px-2 outline-none'>
            <option value="Sources">Sources</option>
            {product?.sources?.map((s) => 
              <option key={s}>{s}</option>
            )}
          </select>

          <select className='bg-[#E3E3E3] font-[500] text-[16px] flex items-center justify-center text-[black] rounded-[24px] max-w-[185px] w-full h-[39px] px-2 outline-none'>
            <option value="Updated History">Updated History</option>
            {product?.updateHistory?.map((u) => 
              <option key={u}>{u}</option>
            )}
          </select>

      </div>
      <div className='font-[400] text-[16px] flex flex-col gap-2 mt-2'>
        <p>Published on {moment(product?.created_at).fromNow()}</p>
        <p>Updated on {moment(product?.published_on).fromNow()}</p>
      </div>
    </div>
  );
}

const RightBar = ({ product }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await axios.get('https://learnhealth-api.vercel.app/api/blogs');
        const related = response.data.filter(b => b?.group === product?.group && b?.id !== product?.id && b?.category === 'products');
        setRelatedPosts(related);
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };
    if (product?.group) {
      fetchRelatedPosts();
    }
  }, [product]);

  return (
    <div className='flex flex-col gap-5 sm:mt-20 sm:ml-30 max-w-[219px]'>
      <h3 className='text-[#979797] text-[16px] font-[400]'>Related Products</h3>
      {relatedPosts.map((r) => 
        <Link href={`/product-review/${r.id}`} key={r.id} className='underline font-[400] text-[20px]'>{r.name}</Link>
      )}
    </div>
  );
}

export default function ProductPage() {   
  const params = useParams();
  const { id } = params;
  const [selectedAlphabet, setSelectedAlphabet] = useState('A');
  const [product, setProduct] = useState(null);
  const [currentItem, setCurrentItem] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://learnhealth-api.vercel.app/api/blogs/${id}`);
        const selectedProduct = response.data;
        if (!selectedProduct || selectedProduct.category !== 'products') {
          throw new Error('Product not found');
        }
        setProduct(selectedProduct);
        setSelectedAlphabet(selectedProduct?.name?.[0]?.toUpperCase() || 'A');
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSetCurrentItem = (item) => {
    setCurrentItem(item);
  }

  if (loading) {
    return (
      <div className="flex w-full flex-col">
        <Navbar page={'product review'} />
        <div className="text-center text-gray-500 px-30 max-sm:px-5 py-20">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex w-full flex-col">
        <Navbar page={'product review'} />
        <div className="text-center text-red-500 px-30 max-sm:px-5 py-20">{error || 'Product not found'}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <Navbar page={'product review'} />
      <div className='sm:px-30 pt-20 sm:pb-15 max-sm:py-10'>
        <div className="w-full h-[360px] bg-[#F9E9DA] flex justify-center items-center">
          {product?.media && product?.media_type === 'image' && (
            <Image 
              src={product?.media} 
              width={2000} 
              height={2000} 
              alt='image banner' 
              className='w-full h-full object-contain'
            />
          )}
          {product?.media && product?.mediaType === 'video' && (
            <video src={product?.media} autoPlay controls className='w-full h-full object-contain' />
          )}
          {product?.media && product?.mediaType === 'audio' && (
            <audio controls className='w-full h-full accent-[#F9E9DA] bg-transparent text-[#F9E9DA]'>
              <source src={product?.media} />
              Your browser does not support this audio
            </audio>
          )}
        </div>
      </div>
      <section className="flex flex-col px-30 pb-20 max-sm:p-5 gap-10">
        <div className="flex items-center gap-2 text-[16px] text-[#979797] flex-wrap">
          <span>Home</span><RiArrowRightSLine /><span>Product</span><RiArrowRightSLine /><span className='capitalize'>{selectedAlphabet}</span><RiArrowRightSLine /><span>{product.name}</span>
        </div>
        <div className='flex justify-between gap-5 max-sm:flex-col'>
          <div className='flex flex-col gap-3'>
            <h1 className='font-[700] text-[48px] max-sm:text-[32px]'>{product?.name}</h1>
            <p className='font-[400] text-[16px] max-w-[455px] w-full'>{product?.desc}</p>
          </div>
          <div className='flex gap-3'>
            <div className='w-[46px] h-[46px] rounded-full bg-[#D9D9D9] flex justify-center items-center'></div>
            <div className='flex flex-col gap-0 font-[400] text-[16px] text-[#979797]'>
              <p>Written by <b className='text-black'>{product?.author}</b></p>
              <p>Posted on {moment(product?.created_at).fromNow()}</p>
            </div>
          </div>
        </div>
        <div className='flex max-sm:flex-col sm:mt-10 max-sm:gap-10'>
          <LeftBar currentItem={currentItem} handleSetCurrentItem={handleSetCurrentItem} product={product} />
          <MiddleBar product={product} />
          <RightBar product={product} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
