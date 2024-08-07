import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaComment, FaTrash } from 'react-icons/fa';
import FrButton from '../components/common/FrButton';
import { setErrorPopup } from '../store/actions/common/actions';
import { addPostRequest, loadMorePostsRequest, deletePostRequest } from '../store/actions/farmActions/actions';

const FeedSection = ({ posts }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.farm.loading);
  const error = useSelector((state) => state.farm.error);

  const [newPost, setNewPost] = useState({
    user: '',
    description: '',
    image: '',
    avatar: 'https://via.placeholder.com/50', // Default avatar
  });

  useEffect(() => {
    dispatch(loadMorePostsRequest());
  }, [dispatch]);

  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(loadMorePostsRequest());
      }
    });
    if (node) observer.current.observe(node);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.user || !newPost.description || !newPost.image) {
      dispatch(setErrorPopup('All fields are required'));
      return;
    }
    dispatch(setErrorPopup(''));
    dispatch(addPostRequest(newPost));
    setNewPost({
      user: '',
      description: '',
      image: '',
      avatar: '',
    });
  };

  const handleDelete = (postId) => {
    dispatch(deletePostRequest(postId));
  };

  return (
    <section className="md:col-span-2">
      <h2 className="text-4xl font-bold mb-8 text-center text-frBlack">Feed</h2>
      <p className="text-center mb-8 text-lg">
        Welcome to the Feed section! Here you can share your thoughts, images, and connect with the community. 
        Scroll down to see what others have posted and feel free to add your own post.
      </p>
      <form onSubmit={handleSubmit} className="mb-8 bg-frWhite p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full mr-4 bg-frGray flex items-center justify-center text-frBlack font-bold text-lg">
            {newPost.user.charAt(0).toUpperCase()}
          </div>
          <input
            type="text"
            name="user"
            placeholder="Your Name"
            className="flex-1 p-3 border rounded-lg text-lg"
            value={newPost.user}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="What's on your mind?"
            className="w-full p-3 border rounded-lg text-lg"
            value={newPost.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            id="image-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setNewPost((prev) => ({ ...prev, image: reader.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer p-3 bg-frGreen text-frBlack rounded-lg inline-block text-lg"
          >
            Choose Image
          </label>
          {newPost.image && (
            <p className="mt-2 text-frBlack text-lg">Image selected</p>
          )}
        </div>
        {error && <p className="text-red-500 text-lg">{error}</p>}
        <div className="flex justify-end">
          <FrButton type="submit" text="Post" className="p-3 bg-frGreen text-frBlack rounded-lg text-lg" />
        </div>
      </form>
      <div className="grid grid-cols-1 gap-8">
        {posts?.length > 0 ? (
          posts.map((post, index) => {
            return (
              <div
                ref={posts.length === index + 1 ? lastPostElementRef : null}
                key={post._id}
                className="bg-frWhite shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full mr-4 bg-frGray flex items-center justify-center text-frBlack font-bold text-lg">
                      {post?.user?.charAt(0).toUpperCase() || 'FR'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-frBlack">{post.user}</h3>
                      <p className="text-sm">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {post.isMyPost && (
                    <button onClick={() => handleDelete(post._id)} className="text-red-500">
                    <FaTrash />
                   </button>
                  )}
                  
                </div>
                <img
                  src={post.image}
                  alt={post.description}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-lg">{post.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-frBlack text-lg"><strong>No posts available</strong></p>
        )}
        {loading && <p className="text-center text-lg">Loading more posts...</p>}
      </div>
    </section>
  );
};

export default FeedSection;