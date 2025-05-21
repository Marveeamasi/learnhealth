'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://localhost:5000/api/subscriptions', { email });
      setEmail('');
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="flex flex-col w-full justify-center items-center gap-20 p-30 max-sm:p-5 max-sm:py-20 bg-[#FCF6F0]">
      <div className="flex max-sm:flex-col w-full justify-center gap-30">
        <div className="max-w-[432px] w-full flex flex-col gap-5">
          <h1 className="text-[24px] font-[700]">Sign up for our newsletter</h1>
          <p className="text-[16px] font-[400]">Stay up to date on all things health and wellbeing.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="h-[53px] w-full bg-[white] flex items-center rounded-[32px] p-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-[1] p-2 outline-none font-[400] text-[16px]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-[111px] h-[41px] rounded-[24px] bg-[#FCF6F0] font-[500] text-[14px] cursor-pointer ${
                  isSubmitting ? "opacity-[.75]" : "hover:bg-[#F3D1B6]"
                }`}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 font-[500] text-[14px]">
                <FaCheckCircle />
                Subscribed successfully!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-600 font-[500] text-[14px]">
                Failed to subscribe. Please try again.
              </div>
            )}
          </form>
          <div className="text-[#F3D1B6] gap-2 flex items-center text-[24px]">
            <Link href={'#'}><FaLinkedin /></Link>
            <Link href={'#'}><FaFacebook /></Link>
            <Link href={'#'}><FaYoutube /></Link>
            <Link href={'#'}><FaInstagram /></Link>
          </div>
        </div>
        <div className="flex gap-20">
          <div className="flex gap-20 max-sm:flex-col">
            <div className="flex flex-col gap-5">
              <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">Policy</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Advertising</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Editorial</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Privacy</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Terms of use</Link>
            </div>
            <div className="flex flex-col gap-5">
              <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">About</Link>
              <Link href={'#'} className="font-[400] text-[18px]">News</Link>
              <Link href={'/services'} className="font-[400] text-[18px]">Services</Link>
              <Link href={'#'} className="font-[400] text-[18px]">Sitemap</Link>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">Advertisement</Link>
            <Link href={'#'} className="font-[700] text-[18px] text-[#969696]">Newsletter</Link>
          </div>
        </div>
      </div>
      <hr className="text-[#D4D4D4] w-full h-[1px]" />
    </footer>
  );
}