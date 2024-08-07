// reducers/blogReducer.js
const initialState = {
    blogs: [],
    loading: false,
    error: null
  };
  
  const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_BLOGS_REQUEST':
      case 'ADD_BLOG_REQUEST':
      case 'EDIT_BLOG_REQUEST':
      case 'DELETE_BLOG_REQUEST':
      case 'ADD_COMMENT_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'FETCH_BLOGS_SUCCESS':
        return {
          ...state,
          blogs: action.payload,
          loading: false,
          error: null
        };
      case 'ADD_BLOG_SUCCESS':
        return {
          ...state,
          blogs: [action.payload, ...state.blogs],
          loading: false,
          error: null
        };
      case 'EDIT_BLOG_SUCCESS':
        return {
          ...state,
          blogs: state.blogs.map(blog =>
            blog._id === action.payload._id ? action.payload : blog
          ),
          loading: false,
          error: null
        };
      case 'DELETE_BLOG_SUCCESS':
        return {
          ...state,
          blogs: state.blogs.filter(blog => blog._id !== action.payload),
          loading: false,
          error: null
        };
      case 'ADD_COMMENT_SUCCESS':
        return {
          ...state,
          blogs: state.blogs.map(blog =>
            blog._id === action.payload.blogId
              ? { ...blog, comments: [...blog.comments, action.payload] }
              : blog
          ),
          loading: false,
          error: null
        };
      case 'FETCH_BLOGS_FAILURE':
      case 'ADD_BLOG_FAILURE':
      case 'EDIT_BLOG_FAILURE':
      case 'DELETE_BLOG_FAILURE':
      case 'ADD_COMMENT_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default blogReducer;
  