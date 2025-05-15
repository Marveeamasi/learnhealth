'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function BlogWritingPage() {
  const params = useParams();
  const { auth } = params;
  const router = useRouter();
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

  useEffect(() => {
    if (auth !== 'qwerty') {
      router.push('/');
    }
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

    try {
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const newBlog = {
        ...formData,
        id: blogs.length + 1,
        updatedOn: formData.publishedOn,
        updateHistory: [],
      };
      console.log(newBlog);
      setSubmitStatus("success");
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
    } catch (error) {
      console.error("Error saving blog:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
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
      <Navbar page="blog-writing" />
      <AnimatedSection
        variants={fadeIn}
        className="px-30 py-20 max-sm:p-5 max-sm:py-15 flex flex-col gap-10"
      >
        <div className="flex flex-col gap-5">
          <motion.h1
            variants={slideIn}
            className="font-[700] text-[48px] max-sm:text-[32px]"
          >
            Write a Blog
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="font-[400] text-[16px] max-w-[455px]"
          >
            Create a new blog post for articles or products. Fill out the form
            below to add content, media, and metadata.
          </motion.p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-20">
          <AnimatedSection
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
          </AnimatedSection>
          <AnimatedSection
            variants={fadeIn}
            className="flex gap-10 max-sm:gap-5 max-sm:flex-col"
          >
            <motion.div
              variants={scaleIn}
              className="max-w-[500px]  w-full flex items-center justify-center"
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
          </AnimatedSection>
          <AnimatedSection
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
                      <option value="public health">Public Health</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="women's health">Women's Health</option>
                      <option value="mental health">Mental Health</option>
                      <option value="fitness">Fitness</option>
                    </>
                  ) : (
                    <>
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
          </AnimatedSection>
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
          {submitStatus === "success" && (
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-2 text-green-600 font-[500] text-[16px]"
            >
              <FaCheckCircle />
              Blog published successfully!
            </motion.div>
          )}
          {submitStatus === "error" && (
            <motion.div
              variants={fadeIn}
              className="text-red-600 font-[500] text-[16px]"
            >
              Failed to publish blog. Please try again.
            </motion.div>
          )}
        </form>
      </AnimatedSection>
      <Footer />
    </div>
  );
}
