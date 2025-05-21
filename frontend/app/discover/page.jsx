'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import Image from 'next/image';

const SearchTerm = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredProducts(products);
      return;
    }
    const lowerTerm = term.toLowerCase();
    const filtered = products.filter(item =>
      item?.keywords?.some(keyword => keyword?.toLowerCase()?.includes(lowerTerm)) ||
      item?.group?.toLowerCase()?.includes(lowerTerm)
    ).sort((a, b) => a.name.localeCompare(b.name));
    setFilteredProducts(filtered);
  };

  return (
    <section className="flex flex-col w-full gap-10 relative">
      <div className='flex flex-col w-full gap-10'>
        <div className="max-w-[466px] w-full h-[53px] rounded-[32px] font-[400] bg-[#F3F2F2] flex items-center py-[18px] px-[24px]">
          <input
            className="outline-none placeholder:text-[#858585] text-sm flex-[1]"
            placeholder="Search by keyword, products, ebooks"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <CiSearch />
        </div>
      </div>
    </section>
  );
};

const ProductLists = ({ products }) => {
  return (
    <section className="flex flex-col w-full gap-5 mt-10">
      {products.length === 0 ? (
        <div className="text-center text-gray-500 font-[500] text-[18px]">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-5">
          {products.map(p => (
            <Link 
              href={`/product-review/${p.id}`} 
              key={p.id} 
              className="w-full h-[278px] bg-[#F9E9DA] cursor-pointer rounded-[8px] max-sm:h-[179px] flex items-center justify-center relative p-5"
            >
              {p?.media_type === 'image' && p?.media && (
                <Image
                  src={p.media}
                  alt={p.name}
                  width={200}
                  height={200}
                  className="absolute w-full h-full object-cover rounded-[8px]"
                />
              )}
              <div className="absolute sm:bottom-5 max-sm:top-3 sm:left-5 max-sm:left-3 font-[600] text-[18px] text-white bg-[#00000050] bg-opacity-50 px-2 py-1 rounded">
                {p.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default function DiscoverPage() {   
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/blogs');
        const productList = response.data.filter(b => b?.category === 'products');
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full flex-col">
        <Navbar page={'discover'} />
        <div className="text-center text-gray-500 px-30 max-sm:px-5 py-20">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col">
        <Navbar page={'discover'} />
        <div className="text-center text-red-500 px-30 max-sm:px-5 py-20">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <Navbar page={'discover'} />
      <section className="px-30 py-20 max-sm:p-5 flex flex-col gap-5">
        <div className="font-[700] text-[48px]">Discover</div>
        <p className="font-[400] text-[16px] max-w-[455px]">
          Discover our valuable products, ebooks, audio, notes and more to keep you up to date and at the top on a healthy journey.
        </p>
        <SearchTerm products={products} setFilteredProducts={setFilteredProducts} />
        <ProductLists products={filteredProducts} />
      </section>
      <div className="p-40"></div>
      <Footer />
    </div>
  );
}