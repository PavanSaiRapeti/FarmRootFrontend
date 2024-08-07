import React, { useState } from 'react';
import FrButton from '../components/common/FrButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = ({ newBlog, handleBlogChange, handleAddBlog }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newBlog.title) newErrors.title = 'Title is required';
    if (!newBlog.author) newErrors.author = 'Author is required';
    if (!newBlog.content) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleAddBlog();
    }
  };

  return (
    <section className="bg-frWhite py-8 mt-8 rounded-lg shadow-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Post a New Blog</h2>
        <p className="mb-4 text-center">
          Share your thoughts and experiences by writing a blog post. Fill in the details below and click "Post Blog" to publish your post.
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              className="p-2 border rounded-lg w-full"
              value={newBlog.title}
              onChange={handleBlogChange}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              name="author"
              placeholder="Author"
              className="p-2 border rounded-lg w-full"
              value={newBlog.author}
              onChange={handleBlogChange}
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <textarea
              name="content"
              placeholder="Blog Content"
              className="p-2 border rounded-lg w-full h-64"
              value={newBlog.content}
              onChange={handleBlogChange}
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <FrButton width={8} text="Post Blog" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default BlogForm;