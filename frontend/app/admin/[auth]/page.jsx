'use client'

import Navbar from '@/components/Navbar';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GoDotFill } from 'react-icons/go';

const LeftBar = memo(({ emails, searchQuery, setSearchQuery }) => {
  const filteredEmails = useMemo(() => {
    return emails.filter(email =>
      email.email.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10);
  }, [emails, searchQuery]);

  return (
    <div className="flex sm:flex-col sm:gap-[24px] px-5 gap-5 max-sm:pb-5 max-sm:flex-wrap sm:border-r sm:border-r-[#D5D5D5]">
      <h1 className="font-semibold text-xl w-full max-sm:text-center">
        Newsletter emails
      </h1>
      <div className="w-full h-[53px] rounded-[32px] font-[400] slim flex items-center py-[18px] px-[24px] mb-4">
        <input
          className="outline-none placeholder:text-[#858585] text-sm flex-[1]"
          placeholder="Search emails"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch />
      </div>
      <div className="flex gap-5 flex-wrap max-sm:justify-center">
        {filteredEmails.length > 0 ? (
          filteredEmails.map((email) => (
            <div key={email.id}>
              <Link href="#" className="text-[10px] p-2 rounded-xl bg-[#f5f5f5]">
                {email.email}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 w-full text-center">
            No emails found
          </p>
        )}
      </div>
    </div>
  );
});

const MiddleBar = memo(({ bookings, searchQuery, setSearchQuery }) => {
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking =>
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.message?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4);
  }, [bookings, searchQuery]);

  return (
    <div className="flex flex-col gap-5 max-w-[572px] flex-[1] sm:p-10 sm:border-r sm:border-r-[#D5D5D5]">
      <h1 className="font-semibold text-xl max-sm:text-center">
        All bookings
      </h1>
      <div className="w-full h-[53px] rounded-[32px] font-[400] slim flex items-center py-[18px] px-[24px]">
        <input
          className="outline-none placeholder:text-[#858585] text-sm flex-[1]"
          placeholder="Search by date, services, user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl slim p-5 flex flex-col w-full gap-5"
            >
              <div className="flex justify-between flex-wrap gap-1 items-center w-full max-sm:flex-col max-sm:justify-center">
                <div className="flex flex-col max-sm:items-center">
                  <div className="flex items-center text-[10px] font-bold">{booking.name}</div>
                  <Link href="#" className="flex items-center text-[10px]">
                    {booking.email}
                  </Link>
                </div>
                <div className="flex items-center text-[10px]">
                  <GoDotFill className="text-[#06d106] text-[16px]" />
                  {booking.service}
                </div>
              </div>
              <div className="text-sm max-sm:text-center">{booking.message}</div>
              <div className="flex items-center text-[10px] w-full text-[gray] max-sm:justify-center">
                {new Date(booking.created_at).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 w-full text-center col-span-2">
            No bookings found
          </p>
        )}
      </div>
    </div>
  );
});

const RightBar = memo(({ blogs, searchQuery, setSearchQuery }) => {
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  }, [blogs, searchQuery]);

  return (
    <div className="flex flex-col gap-5 max-w-[572px] sm:pl-10">
      <h1 className="font-semibold text-xl max-sm:text-center">
        All blogs
      </h1>
      <div className="w-full h-[53px] rounded-[32px] font-[400] slim flex items-center py-[18px] px-[24px]">
        <input
          className="outline-none placeholder:text-[#858585] text-sm flex-[1]"
          placeholder="Search by title, category, group, author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link href={`/blog/qwerty/?id=${blog.id}`} key={blog.id}>
              <div
                className="rounded-xl bg-[#F9E9DA] p-5 flex flex-col w-full gap-5 hover:bg-[#f0d9c5] transition-colors"
              >
                <div className="flex justify-between items-center flex-wrap gap-1 w-full max-sm:flex-col max-sm:justify-center">
                  <div className="flex flex-col max-sm:items-center">
                    <div className="flex items-center text-[10px]">
                      {blog.category}
                    </div>
                  </div>
                  <div className="flex items-center text-[10px]">
                    <GoDotFill className="text-[#06d106] text-[16px]" />
                    {blog.group}
                  </div>
                </div>
                <div className="text-sm max-sm:text-center">{blog.name}</div>
                <div className="flex items-center text-[10px] w-full text-[gray] max-sm:justify-center">
                  {new Date(blog.published_on).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 w-full text-center col-span-2">
            No blogs found
          </p>
        )}
      </div>
    </div>
  );
});

export default function AdminPage() {
  const params = useParams();
  const { auth } = params;
  const router = useRouter();

  const [emails, setEmails] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [emailSearch, setEmailSearch] = useState('');
  const [bookingSearch, setBookingSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleEmailSearch = useCallback((value) => {
    setEmailSearch(value);
  }, []);

  const handleBookingSearch = useCallback((value) => {
    setBookingSearch(value);
  }, []);

  const handleBlogSearch = useCallback((value) => {
    setBlogSearch(value);
  }, []);

  useEffect(() => {
    if (auth !== 'qwerty') {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [emailsResponse, bookingsResponse, blogsResponse] = await Promise.all([
          axios.get('https://learnhealth-api/api/subscriptions'),
          axios.get('https://learnhealth-api/api/bookings'),
          axios.get('https://learnhealth-api/api/blogs')
        ]);

        setEmails(emailsResponse.data);
        setBookings(bookingsResponse.data);
        setBlogs(blogsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth, router]);

  return (
    <div className="flex w-full flex-col">
      <Navbar page={'admin'} />
      <div className="flex flex-col px-30 py-20 max-sm:p-5 gap-10">
        <div className="flex justify-between gap-5 max-sm:flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="font-[700] text-[48px] max-sm:text-[32px] w-full max-sm:text-center">
              Admin Panel
            </h1>
            <p className="font-[400] text-[16px] max-w-[455px] w-full max-sm:text-center">
              Oversee all activities with administrative privileges
            </p>
          </div>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">
            {error}
          </p>
        ) : (
          <div className="flex max-sm:flex-col sm:mt-10 max-sm:gap-10">
            <LeftBar
              emails={emails}
              searchQuery={emailSearch}
              setSearchQuery={handleEmailSearch}
            />
            <MiddleBar
              bookings={bookings}
              searchQuery={bookingSearch}
              setSearchQuery={handleBookingSearch}
            />
            <RightBar
              blogs={blogs}
              searchQuery={blogSearch}
              setSearchQuery={handleBlogSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
}
