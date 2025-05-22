'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { memo } from "react";

const AnimatedSection = ({ children, variants, className }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
const MemoizedAnimatedSection = memo(AnimatedSection);

export default function BlogWritingPage() {
  const params = useParams();
  const { auth } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const [formData, setFormData] = useState({
    name: "",
    media: null,
    mediaType: "image",
    desc: "",
    headings: [{ name: "", paragraphs: [{ heading: "", text: "" }] }],
    keywords: [],
    sources: [],
    author: "",
    category: "articles",
    group: "public health",
    publishedOn: new Date().toISOString().split("T")[0],
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [sourceInput, setSourceInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, action: "", message: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (auth !== 'qwerty') {
      router.push('/');
      return;
    }

    if (blogId) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`https://learnhealth-api.vercel.app/api/blogs/${blogId}`);
          const blog = response.data;
          setFormData({
            name: blog.name,
            media: blog.media,
            mediaType: blog.media_type,
            desc: blog.description || "",
            headings: blog.headings,
            keywords: blog.keywords,
            sources: blog.sources,
            author: blog.author,
            category: blog.category,
            group: blog.group,
            publishedOn: blog.published_on,
          });
        } catch (error) {
          console.error("Error fetching blog:", error);
          setSubmitStatus({ type: "error", message: "Failed to load blog data." });
        }
      };
      fetchBlog();
    }
  }, [auth, blogId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, media: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addHeading = () => {
    setFormData({
      ...formData,
      headings: [
        ...formData.headings,
        { name: "", paragraphs: [{ heading: "", text: "" }] },
      ],
    });
  };

  const removeHeading = (index) => {
    setFormData({
      ...formData,
      headings: formData.headings.filter((_, i) => i !== index),
    });
  };

  const addParagraph = (headingIndex) => {
    const newHeadings = [...formData.headings];
    newHeadings[headingIndex].paragraphs.push({ heading: "", text: "" });
    setFormData({ ...formData, headings: newHeadings });
  };

  const removeParagraph = (headingIndex, paragraphIndex) => {
    const newHeadings = [...formData.headings];
    newHeadings[headingIndex].paragraphs = newHeadings[headingIndex].paragraphs.filter(
      (_, i) => i !== paragraphIndex
    );
    setFormData({ ...formData, headings: newHeadings });
  };

  const handleHeadingChange = (index, field, value) => {
    const newHeadings = [...formData.headings];
    newHeadings[index][field] = value;
    setFormData({ ...formData, headings: newHeadings });
  };

  const handleParagraphChange = (headingIndex, paragraphIndex, field, value) => {
    const newHeadings = [...formData.headings];
    newHeadings[headingIndex].paragraphs[paragraphIndex][field] = value;
    setFormData({ ...formData, headings: newHeadings });
  };

  const handleKeywordAdd = (e) => {
    e.preventDefault();
    if (keywordInput.trim()) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()],
      });
      setKeywordInput("");
    }
  };

  const handleSourceAdd = (e) => {
    e.preventDefault();
    if (sourceInput.trim()) {
      setFormData({
        ...formData,
        sources: [...formData.sources, sourceInput.trim()],
      });
      setSourceInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("mediaType", formData.mediaType);
    formDataToSend.append("desc", formData.desc);
    formDataToSend.append("headings", JSON.stringify(formData.headings));
    formDataToSend.append("keywords", JSON.stringify(formData.keywords));
    formDataToSend.append("sources", JSON.stringify(formData.sources));
    formDataToSend.append("author", formData.author);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("group", formData.group);
    formDataToSend.append("publishedOn", formData.publishedOn);
    if (selectedFile) {
      formDataToSend.append("media", selectedFile);
    }

    try {
      const response = await axios.post("https://learnhealth-api.vercel.app/api/blogs", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitStatus({ type: "success", message: "Blog published successfully!" });
      setFormData({
        name: "",
        media: null,
        mediaType: "image",
        desc: "",
        headings: [{ name: "", paragraphs: [{ heading: "", text: "" }] }],
        keywords: [],
        sources: [],
        author: "",
        category: "articles",
        group: "public health",
        publishedOn: new Date().toISOString().split("T")[0],
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error saving blog:", error);
      setSubmitStatus({ type: "error", message: "Failed to publish blog. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    setModal({ isOpen: true, action: "update", message: "Are you sure you want to update this blog?" });
  };

  const handleDelete = () => {
    setModal({ isOpen: true, action: "delete", message: "Are you sure you want to delete this blog? This action cannot be undone." });
  };

  const confirmAction = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (modal.action === "update") {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("mediaType", formData.mediaType);
      formDataToSend.append("desc", formData.desc);
      formDataToSend.append("headings", JSON.stringify(formData.headings));
      formDataToSend.append("keywords", JSON.stringify(formData.keywords));
      formDataToSend.append("sources", JSON.stringify(formData.sources));
      formDataToSend.append("author", formData.author);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("group", formData.group);
      formDataToSend.append("publishedOn", formData.publishedOn);
      if (selectedFile) {
        formDataToSend.append("media", selectedFile);
      } else {
        formDataToSend.append("media", formData.media);
      }

      try {
        const response = await axios.put(`https://learnhealth-api.vercel.app/api/blogs/${blogId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSubmitStatus({ type: "success", message: "Blog updated successfully!" });
      } catch (error) {
        console.error("Error updating blog:", error);
        setSubmitStatus({ type: "error", message: "Failed to update blog. Please try again." });
      }
    } else if (modal.action === "delete") {
      try {
        await axios.delete(`https://learnhealth-api/api/blogs/${blogId}`);
        setSubmitStatus({ type: "success", message: "Blog deleted successfully!" });
        router.push("/blog/qwerty");
      } catch (error) {
        console.error("Error deleting blog:", error);
        setSubmitStatus({ type: "error", message: "Failed to delete blog. Please try again." });
      }
    }

    setModal({ isOpen: false, action: "", message: "" });
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setModal({ isOpen: false, action: "", message: "" });
  };

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

  return (
    <div className="flex w-full flex-col leading-5">
      <Navbar page="blog-writing" />
      <MemoizedAnimatedSection
        variants={fadeIn}
        className="px-30 py-20 max-sm:p-5 max-sm:py-15 flex flex-col gap-10"
      >
        <div className="flex flex-col gap-5">
          <motion.h1
            variants={slideIn}
            className="font-[700] text-[48px] max-sm:text-[32px]"
          >
            {blogId ? "Edit Blog" : "Write a Blog"}
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="font-[400] text-[16px] max-w-[455px]"
          >
            {blogId
              ? "Edit the existing blog post below."
              : "Create a new blog post for articles or products. Fill out the form below to add content, media, and metadata."}
          </motion.p>
        </div>
        <form onSubmit={blogId ? (e) => e.preventDefault() : handleSubmit} className="flex flex-col gap-20">
          <MemoizedAnimatedSection
            variants={fadeIn}
            className="flex gap-10 max-sm:gap-5 max-sm:flex-col-reverse"
          >
            <motion.div
              variants={scaleIn}
              className="bg-[#F9E9DA] rounded-[8px] p-10 max-sm:p-5 flex flex-col flex-[1] gap-5"
            >
              <motion.h2
                variants={slideIn}
                className="font-[700] text-[24px]"
              >
                Basic Information
              </motion.h2>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-[600] text-[16px]"
                >
                  Blog Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                />
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="desc"
                  className="font-[600] text-[16px]"
                >
                  Description (for products)
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Enter description (optional)"
                  className="h-[120px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px] resize-none"
                />
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="media"
                  className="font-[600] text-[16px]"
                >
                  Media
                </label>
                {formData.media && (
                  <div className="mb-2">
                    <img src={formData.media} alt="Preview" className="w-full object-cover h-[300px] rounded-[8px]" />
                  </div>
                )}
                <input
                  type="file"
                  id="media"
                  accept="image/*,video/*,audio/*"
                  onChange={handleMediaChange}
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                />
                <select
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleInputChange}
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="author"
                  className="font-[600] text-[16px]"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter author name"
                  required
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                />
              </motion.div>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="max-w-[500px] w-full flex items-center justify-center"
            >
              <Image
                width={2000}
                height={2000}
                alt="basic-info"
                src={`/basic-info.PNG`}
                className="w-full h-full object-contain bg-[#80808071]"
              />
            </motion.div>
          </MemoizedAnimatedSection>
          <MemoizedAnimatedSection
            variants={fadeIn}
            className="flex gap-10 max-sm:gap-5 max-sm:flex-col"
          >
            <motion.div
              variants={scaleIn}
              className="max-w-[500px] w-full flex items-center justify-center"
            >
              <Image
                width={2000}
                height={2000}
                alt="content-section"
                src={`/content-section.PNG`}
                className="w-full h-full object-contain bg-[#80808071]"
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="bg-[#F9E9DA] rounded-[8px] p-10 max-sm:p-5 flex flex-col gap-5 flex-[1]"
            >
              <div className="flex justify-between items-center">
                <motion.h2
                  variants={slideIn}
                  className="font-[700] text-[24px]"
                >
                  Content Sections
                </motion.h2>
                <motion.button
                  variants={scaleIn}
                  type="button"
                  onClick={addHeading}
                  className="flex items-center gap-2 font-[600] text-[16px] text-[#FCF6F0] bg-[#979797] rounded-[24px] px-4 py-2"
                >
                  <FaPlus /> Add Section
                </motion.button>
              </div>
              {formData.headings.map((heading, hIndex) => (
                <motion.div
                  key={hIndex}
                  variants={fadeIn}
                  className="flex flex-col gap-5 border-t pt-5"
                >
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={heading.name}
                      onChange={(e) =>
                        handleHeadingChange(hIndex, "name", e.target.value)
                      }
                      placeholder="Section Name"
                      required
                      className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                    />
                    <motion.button
                      variants={scaleIn}
                      type="button"
                      onClick={() => removeHeading(hIndex)}
                      className="font-[600] text-[16px] ml-2 p-2 border rounded-xl"
                    >
                      Remove
                    </motion.button>
                  </div>
                  {heading.paragraphs.map((paragraph, pIndex) => (
                    <motion.div
                      key={pIndex}
                      variants={fadeIn}
                      className="flex flex-col gap-2"
                    >
                      <input
                        type="text"
                        value={paragraph.heading}
                        onChange={(e) =>
                          handleParagraphChange(hIndex, pIndex, "heading", e.target.value)
                        }
                        placeholder="Paragraph Heading (optional)"
                        className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                      />
                      <textarea
                        value={paragraph.text}
                        onChange={(e) =>
                          handleParagraphChange(hIndex, pIndex, "text", e.target.value)
                        }
                        placeholder="Paragraph Text"
                        required
                        className="h-[120px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px] resize-none"
                      />
                      <motion.button
                        variants={scaleIn}
                        type="button"
                        onClick={() => removeParagraph(hIndex, pIndex)}
                        className="font-[600] text-[16px] self-end p-2 border rounded-xl"
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  ))}
                  <motion.button
                    variants={scaleIn}
                    type="button"
                    onClick={() => addParagraph(hIndex)}
                    className="flex items-center gap-2 font-[600] text-[16px] text-[#FCF6F0] bg-[#979797] rounded-[24px] px-4 py-2 self-start"
                  >
                    <FaPlus /> Add Paragraph
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </MemoizedAnimatedSection>
          <MemoizedAnimatedSection
            variants={fadeIn}
            className="flex gap-10 max-sm:gap-5 max-sm:flex-col-reverse"
          >
            <motion.div
              variants={scaleIn}
              className="bg-[#F9E9DA] rounded-[8px] p-10 max-sm:p-5 flex flex-col flex-[1] gap-5"
            >
              <motion.h2
                variants={slideIn}
                className="font-[700] text-[24px]"
              >
                Metadata
              </motion.h2>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="keywords"
                  className="font-[600] text-[16px]"
                >
                  Keywords
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Enter keyword"
                    className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                  />
                  <motion.button
                    variants={scaleIn}
                    type="button"
                    onClick={handleKeywordAdd}
                    className="h-[48px] p-2 border rounded-xl font-[600] text-[16px]"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => (
                    <motion.span
                      key={index}
                      variants={scaleIn}
                      className="bg-[#FCF6F0] rounded-[16px] px-3 py-1 font-[400] text-[14px]"
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="sources"
                  className="font-[600] text-[16px]"
                >
                  Sources
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sourceInput}
                    onChange={(e) => setSourceInput(e.target.value)}
                    placeholder="Enter source"
                    className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                  />
                  <motion.button
                    variants={scaleIn}
                    type="button"
                    onClick={handleSourceAdd}
                    className="h-[48px] p-2 border rounded-xl font-[600] text-[16px]"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sources.map((source, index) => (
                    <motion.span
                      key={index}
                      variants={scaleIn}
                      className="bg-[#FCF6F0] rounded-[16px] px-3 py-1 font-[400] text-[14px]"
                    >
                      {source}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="font-[600] text-[16px]"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                >
                  <option value="articles">Articles</option>
                  <option value="products">Products</option>
                </select>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="group"
                  className="font-[600] text-[16px]"
                >
                  Group
                </label>
                <select
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                >
                  {formData.category === "articles" ? (
                    <>
                    <option value="">Select group</option>
                      <option value="public health">Public Health</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="women's health">Women's Health</option>
                      <option value="mental health">Mental Health</option>
                      <option value="fitness">Fitness</option>
                    </>
                  ) : (
                    <>
                    <option value="">Select group</option>
                      <option value="medicine">Medicine</option>
                      <option value="e-book">E-book</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </>
                  )}
                </select>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <label
                  htmlFor="publishedOn"
                  className="font-[600] text-[16px]"
                >
                  Published On
                </label>
                <input
                  type="date"
                  id="publishedOn"
                  name="publishedOn"
                  value={formData.publishedOn}
                  onChange={handleInputChange}
                  required
                  className="h-[48px] w-full bg-transparent border-[1px] border-[#00000050] rounded-[8px] p-3 outline-none font-[400] text-[16px]"
                />
              </motion.div>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="max-w-[500px] w-full flex items-center justify-center"
            >
              <Image
                width={2000}
                height={2000}
                alt="meta-data"
                src={`/meta-data.PNG`}
                className="w-full h-full object-contain bg-[#80808071]"
              />
            </motion.div>
          </MemoizedAnimatedSection>
          <div className="flex gap-4">
            {blogId ? (
              <>
                <motion.button
                  variants={scaleIn}
                  type="button"
                  onClick={handleUpdate}
                 disabled={isSubmitting}
                  className={`h-[48px] w-full max-w-[200px] max-sm:max-w-full rounded-[24px] border border-[#000000] hover:bg-[black] hover:text-[white] font-[600] text-[16px] cursor-pointer ${
                    isSubmitting ? "opacity-50" : "opacity-[1]"
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Blog"}
                </motion.button>
                <motion.button
                  variants={scaleIn}
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className={`h-[48px] w-full max-w-[200px] max-sm:max-w-full rounded-[24px] border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-[600] text-[16px] cursor-pointer ${
                    isSubmitting ? "opacity-50" : "opacity-[1]"
                  }`}
                >
                  {isSubmitting ? "Deleting..." : "Delete Blog"}
                </motion.button>
              </>
            ) : (
              <motion.button
                variants={scaleIn}
                type="submit"
                disabled={isSubmitting}
                className={`h-[48px] w-full max-w-[200px] max-sm:max-w-full rounded-[24px] border border-[#000000] hover:bg-[black] hover:text-[white] font-[600] text-[16px] cursor-pointer ${
                  isSubmitting ? "opacity-50" : "opacity-[1]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Publish Blog"}
              </motion.button>
            )}
          </div>
          {submitStatus && (
            <motion.div
              variants={fadeIn}
              className={`flex items-center gap-2 font-[500] text-[16px] ${
                submitStatus.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {submitStatus.type === "success" && <FaCheckCircle />}
              {submitStatus.message}
            </motion.div>
          )}
        </form>
      </MemoizedAnimatedSection>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[8px] p-6 max-w-md w-full mx-4"
          >
            <h2 className="font-[700] text-[24px] mb-4">
              {modal.action === "update" ? "Confirm Update" : "Confirm Delete"}
            </h2>
            <p className="font-[400] text-[16px] mb-6">{modal.message}</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={closeModal}
                className="h-[48px] px-4 rounded-[24px] border border-[#00000050] font-[600] text-[16px]"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`h-[48px] px-4 rounded-[24px] font-[600] text-[16px] ${
                  modal.action === "update"
                    ? "bg-black text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
