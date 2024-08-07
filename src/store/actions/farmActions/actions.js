import { ADD_POST_REQUEST, ADD_PRODUCT_REQUEST, DELETE_POST_REQUEST, IS_POST_LOADING, LOAD_MORE_POSTS_REQUEST, LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS } from "../../constants";


export const isPostLoading = (loading) => ({
  type: IS_POST_LOADING,
  payload: loading,
});
export const addPostRequest = (post) => ({
  type: ADD_POST_REQUEST,
  payload: post,
});
export const fetchPostRequest = () => ({
  type: LOAD_MORE_POSTS_REQUEST,
});

export const loadMorePostsRequest = () => ({
  type: LOAD_PRODUCTS_REQUEST,
});
export const deletePostRequest = (postId) => ({
  type: DELETE_POST_REQUEST,
  payload: postId,
});

export const fetchProductsRequest = () => ({ type: 'FETCH_PRODUCTS_REQUEST' });
export const fetchProductsSuccess = (products) => ({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
export const fetchProductsFailure = (error) => ({ type: 'FETCH_PRODUCTS_FAILURE', payload: error });

export const addProductRequest = (product) => ({ type: 'ADD_PRODUCT_REQUEST', payload: product });
export const addProductSuccess = (product) => ({ type: 'ADD_PRODUCT_SUCCESS', payload: product });
export const addProductFailure = (error) => ({ type: 'ADD_PRODUCT_FAILURE', payload: error });

export const editProductRequest = (productId, updatedContent) => ({
  type: 'EDIT_PRODUCT_REQUEST',
  payload: { productId, updatedContent }
});
export const editProductSuccess = (product) => ({ type: 'EDIT_PRODUCT_SUCCESS', payload: product });
export const editProductFailure = (error) => ({ type: 'EDIT_PRODUCT_FAILURE', payload: error });

export const deleteProductRequest = (productId) => ({ type: 'DELETE_PRODUCT_REQUEST', payload: productId });
export const deleteProductSuccess = (productId) => ({ type: 'DELETE_PRODUCT_SUCCESS', payload: productId });
export const deleteProductFailure = (error) => ({ type: 'DELETE_PRODUCT_FAILURE', payload: error });

export const addToCart = (product) => ({ type: 'ADD_TO_CART', payload: product });
export const removeFromCart = (productId) => ({ type: 'REMOVE_FROM_CART', payload: productId });

export const fetchBlogsRequest = () => ({ type: 'FETCH_BLOGS_REQUEST' });
export const fetchBlogsSuccess = (blogs) => ({ type: 'FETCH_BLOGS_SUCCESS', payload: blogs });
export const fetchBlogsFailure = (error) => ({ type: 'FETCH_BLOGS_FAILURE', payload: error });

export const addBlogRequest = (blog) => ({ type: 'ADD_BLOG_REQUEST', payload: blog });
export const addBlogSuccess = (blog) => ({ type: 'ADD_BLOG_SUCCESS', payload: blog });
export const addBlogFailure = (error) => ({ type: 'ADD_BLOG_FAILURE', payload: error });

export const editBlogRequest = (blogId, updatedContent) => ({
  type: 'EDIT_BLOG_REQUEST',
  payload: { blogId, updatedContent }
});
export const editBlogSuccess = (blog) => ({ type: 'EDIT_BLOG_SUCCESS', payload: blog });
export const editBlogFailure = (error) => ({ type: 'EDIT_BLOG_FAILURE', payload: error });

export const deleteBlogRequest = (blogId) => ({ type: 'DELETE_BLOG_REQUEST', payload: blogId });
export const deleteBlogSuccess = (blogId) => ({ type: 'DELETE_BLOG_SUCCESS', payload: blogId });
export const deleteBlogFailure = (error) => ({ type: 'DELETE_BLOG_FAILURE', payload: error });

export const addCommentRequest = (blogId, comment) => ({
  type: 'ADD_COMMENT_REQUEST',
  payload: { blogId, comment }
});
export const addCommentSuccess = (comment) => ({ type: 'ADD_COMMENT_SUCCESS', payload: comment });
export const addCommentFailure = (error) => ({ type: 'ADD_COMMENT_FAILURE', payload: error });

export const loadProductsSuccess = (products) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: products
});

