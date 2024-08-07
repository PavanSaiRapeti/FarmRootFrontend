import { api } from ".";
import { getUserId } from "../api/authApi";

export const addPost = async (post) => {
    try {
        const response = await api.post('/posts', post);
        if (response.status !== 201) {
            throw new Error('Failed to add post');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await api.delete(`/posts/${postId}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete post');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loadMorePosts = async (requestId) => {
    try {
        const response = await api.get('/posts', {
            headers: {
                'Request-Id': getUserId()
            }
        });
        if (response.status !== 200) {
            throw new Error('Failed to load more posts');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await api.post('/products', product,{
            headers: {
                'Request-Id': getUserId()
            }
        });
        if (response.status !== 201) {
            throw new Error('Failed to add product');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loadProducts = async () => {
    try {
        const response = await api.get('/products', {
            headers: {
                'Request-Id': getUserId()
            }
        });
        if (response.status !== 200) {
            throw new Error('Failed to load products');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchBlogs = async () => {
    try {
        const response = await api.get('/blogs', {
            headers: {
                'Request-Id': getUserId()
            }
        });
        if (response.status !== 200) {
            throw new Error('Failed to fetch blogs');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addBlog = async (blog) => {
    try {
        const response = await api.post('/blogs', blog, {
            headers: {
                'Request-Id': getUserId()
            }
        });
        if (response.status !== 201) {
            throw new Error('Failed to add blog');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const editBlog = async (blogId, updatedContent) => {
    try {
        const response = await api.put(`/blogs/${blogId}`, updatedContent);
        if (response.status !== 200) {
            throw new Error('Failed to edit blog');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const response = await api.delete(`/blogs/${blogId}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete blog');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addComment = async (blogId, comment) => {
    try {
        const response = await api.post(`/blogs/${blogId}/comments`, comment);
        if (response.status !== 201) {
            throw new Error('Failed to add comment');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};
