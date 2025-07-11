import axios from 'axios';
import { get } from 'http';
// Authentication utilities
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  // author: User;
}

export const getToken = (): string | null => {
  return localStorage.getItem('jwt');
};

export const setToken = (token: string): void => {
  localStorage.setItem('jwt', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('jwt');
};

// const API_BASE = import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";
const API_BASE = "http://localhost:8000";

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return token !== null && token !== '';
};

// Mock API functions (replace with real API calls)
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      console.log("API Base URL:", API_BASE)
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      console.log("Login response:", res.data);

      const token = res.data.token;

      if (!token) {
        throw new Error("Token not received from server.");
      }

      return res.data
    } catch (err: any) {
      if (err.response) {
        // Server responded with a non-2xx code
        throw new Error(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        throw new Error("No response from server. Please try again later.");
      } else 
        throw new Error("Login failed. Please try again.");
      }
    },

  register: async (name: string, email: string, password: string) => {
    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      const response = await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });

    } catch (err: any) {
      if (err.response && err.response.data?.message) {
        // Backend sent a specific message
        throw new Error(err.response.data.message);
      } else if (err.request) {
        // Network or server unreachable
        throw new Error("No response from server. Please try again.");
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    }
  },

  getPosts: async (): Promise<any[]> => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      const res = await axios.get(`${API_BASE}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // This should be an array of posts
    } catch (err: any) {
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error("No response from server. Please try again.");
      } else {
        throw new Error("Failed to fetch posts.");
      }
    }
  },

  createPost: async (postData: { title: string; content: string; tags: string[] }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      const res = await axios.post(`${API_BASE}/api/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err: any) {
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error("No response from server. Please try again.");
      } else {
        throw new Error("Failed to create post.");
      }
    }
  },

  getPost: async (id: string): Promise<{
    _id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }> => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      const res = await axios.get(`${API_BASE}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post response:", res.data);
      return res.data;
    } catch (err: any) {
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error("No response from server. Please try again.");
      } else {
        throw new Error("Failed to fetch post.");
      }
    }
  },

  updatePost: async (
    id: string,
    postData: { title: string; content: string; tags: string[] }
  ): Promise<{ success: boolean }> => {
    try {
      console.log("postData:", postData);
      const token = getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      await axios.patch(`${API_BASE}/api/posts/${id}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { success: true };
    } catch (err: any) {
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error("No response from server. Please try again.");
      } else {
        throw new Error("Failed to update post.");
      }
    }
  },

  deletePost: async (id: string): Promise<{ success: boolean }> => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      const res = await axios.delete(`${API_BASE}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { success: true };
    } catch (err: any) {
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error("No response from server. Please try again.");
      } else {
        throw new Error("Failed to delete post.");
      }
    }
  },
};
