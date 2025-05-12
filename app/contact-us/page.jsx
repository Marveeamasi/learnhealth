'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react"; 
import { FaCheckCircle } from "react-icons/fa";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
    }, 3000);

    // try {
    //   // Replace with your EmailJS service ID, template ID, and public key
    //   await emailjs.send(
    //     "YOUR_SERVICE_ID",
    //     "YOUR_TEMPLATE_ID",
    //     {
    //       from_name: formData.name,
    //       from_email: formData.email,
    //       service: formData.service,
    //       message: formData.message,
    //     },
    //     "YOUR_PUBLIC_KEY"
    //   );
    //   setSubmitStatus("success");
    //   setFormData({ name: "", email: "", service: "", message: "" });
    // } catch (error) {
    //   console.error("EmailJS error:", error);
    //   setSubmitStatus("error");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="flex w-full flex-col leading-5">
      <Navbar page="contact" />
      <section className="px-30 py-20 max-sm:p-5 max-sm:pt-15 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-[700] text-[48px] max-sm:text-[32px]">
            Contact Us
          </h1>
          <p className="font-[400] text-[16px] max-w-[455px]">
            Reach out to book a service or inquire about our offerings. Fill out
            the form below, and we’ll get back to you promptly.
          </p>
        </div>
        <div className="flex max-lg:flex-col-reverse gap-20">
          <div className="flex-1 bg-[#F9E9DA] rounded-[24px] p-10 max-sm:p-5 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-[600] text-[16px]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#0000005d] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-[600] text-[16px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#0000005d] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="service"
                  className="font-[600] text-[16px]"
                >
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#0000005d] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="Content Creation">Content Creation</option>
                  <option value="Blogs and Ghostwriting">
                    Blogs and Ghostwriting
                  </option>
                  <option value="Medical Writing">Medical Writing</option>
                  <option value="Ebooks and Whitepapers">
                    Ebooks and Whitepapers
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-[600] text-[16px]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your needs"
                  required
                  className="h-[120px] w-full bg-transparent border-[1px] border-[#0000005d] rounded-[8px] p-3 outline-none font-[400] text-[16px] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-[48px] w-full rounded-[24px] bg-transparent border-[1px] border-[black] hover:bg-[black] hover:text-white transition-colors duration-300 ease-in-out font-[600] text-[16px] cursor-pointer ${
                  isSubmitting ? "opacity-[.75]" : "hover:opacity-[1]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 font-[500] text-[16px] justify-center text-center">
                  <FaCheckCircle />
                  Message sent successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-red-600 font-[500] text-[16px] text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <Image
              src="/img15.png"
              width={600}
              height={400}
              alt="Contact Us"
              className="w-full h-[300px] object-cover rounded-[8px]"
            />
            <div className="flex flex-col gap-3">
              <h2 className="font-[700] text-[24px]">
                Why Reach Out?
              </h2>
              <p className="font-[400] text-[16px]">
                Whether you need content creation, medical writing, or custom
                solutions, our team is here to help. Let’s discuss your project
                and bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}