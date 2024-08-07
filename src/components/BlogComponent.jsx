import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { FaThumbsUp, FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import {
  fetchBlogsRequest,
  addBlogRequest,
  editBlogRequest,
  deleteBlogRequest,
  addCommentRequest
} from '../store/actions/farmActions/actions';
import FrButton from './common/FrButton';

const socket = io('http://localhost:5000', {
    transports: ['websocket'], // Use WebSocket as the primary transport
    upgrade: false, // Disable the upgrade to polling
    reconnectionAttempts: 5, // Number of reconnection attempts before giving up
    reconnectionDelay: 1000, // Delay between reconnection attempts
    timeout: 20000, // Connection timeout
  });// Adjust your backend URL

const BlogComponent = ({ blog }) => {
 const loggedInUser = useSelector(state => state.auth.user.data.first);
  const dispatch = useDispatch();
  const [editingBlog, setEditingBlog] = useState(null);
  const [comment, setComment] = useState('');
  const blogs = useSelector(state => state.blog.blogs);

  useEffect(() => {
    dispatch(fetchBlogsRequest());

    socket.on('newBlog', (blog) => {
      dispatch({ type: 'ADD_BLOG_SUCCESS', payload: blog });
    });

    socket.on('updateBlog', (updatedBlog) => {
      dispatch({ type: 'EDIT_BLOG_SUCCESS', payload: updatedBlog });
    });

    socket.on('deleteBlog', (blogId) => {
      dispatch({ type: 'DELETE_BLOG_SUCCESS', payload: blogId });
    });

    socket.on('newComment', (comment) => {
      dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: comment });
    });

    return () => {
      socket.off('newBlog');
      socket.off('updateBlog');
      socket.off('deleteBlog');
      socket.off('newComment');
    };
  }, [dispatch]);

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdateBlog = () => {
    dispatch(editBlogRequest(editingBlog._id, editingBlog));
    dispatch(fetchBlogsRequest());
    setEditingBlog(null);
  };

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlogRequest(blogId));
    dispatch(fetchBlogsRequest());
  };

  const handleAddComment = (blogId) => {
    dispatch(addCommentRequest(blogId, { user: loggedInUser , text: comment }));
    setComment('');
    dispatch(fetchBlogsRequest());
  };

  return (
    <>
      <div key={blog._id} className="border p-4 mb-4 rounded-lg bg-frLighterGray">
        {editingBlog && editingBlog._id === blog._id ? (
          <>
            <input
              type="text"
              value={editingBlog?.title || ''}
              onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
              className="border p-2 mr-2 rounded-lg w-full mb-2"
            />
            <textarea
              value={editingBlog?.content || ''}
              onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
              className="border p-2 mr-2 rounded-lg w-full mb-2 h-32"
            />
            <FrButton onClick={handleUpdateBlog} text="Update Blog" width={8} />
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-frDarkGreen">{blog.title}</h3>
            <p className="text-frDarkGreen">{blog.content}</p>
            <p className="text-sm text-gray-500">By {blog.author}</p>
            {blog.isMyBlog && (
              <div className="flex space-x-2 mt-2">
                <FaEdit onClick={() => handleEditBlog(blog)} className="cursor-pointer text-frGreen" />
                <FaTrash onClick={() => handleDeleteBlog(blog._id)} className="cursor-pointer text-frRed" />
              </div>
            )}
          </>
        )}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 mr-2 rounded-lg w-full mb-2"
          />
          <FrButton onClick={() => handleAddComment(blog._id)} text="Add Comment" width={8} />
        </div>
        <div className="mt-4">
          {blog.comments.map((comment, index) => (
            <div key={index} className="border p-2 mb-2 rounded-lg bg-frWhite">
              <p className="text-frDarkGreen">{comment.text}</p>
              <p className="text-sm text-gray-500">By {comment.user}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogComponent;