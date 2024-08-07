import { api } from '.';



export const login = async (payload) => {
    try {
        const response = await api.post('/login', payload);

        if (response.status !== 200) {
            throw new Error('Login failed');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (payload) => {
    try {
        const response = await api.post('/register', payload);

        if (response.status !== 200) {
            throw new Error('Registration failed');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Profile = async (payload) => {
    try {
        const response = await api.post('/profile', payload);

        if (![200, 201].includes(response.status)) {
            throw new Error('Registration failed');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};
export const validateToken = async () => {
    try {
        const response = await api.post('/validateToken');
        if (response?.status !== 200) {
            throw new Error('Token validation failed');
        }
        return response.data.valid;
    } catch (error) {
        throw error;
    }
};
export const setToken = (token) => {
    localStorage.setItem('token', token);
};
export const setUserId = (userId) => {
    localStorage.setItem('userId', userId);
};

export const getToken = () => {
    return localStorage.getItem('token');
};
export const getUserId = () => {
    return localStorage.getItem('userId');
};

export const clearUserId = () => {
    localStorage.removeItem('userId');
};

export const clearToken = () => {
    localStorage.removeItem('token');
};
