import React, { createContext, useState } from 'react';
import api from '../api/apiService';

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });

  const fetchPosts = async (params = {}) => {
    const res = await api.get('/posts', { params });
    setPosts(res.data.data);
    setMeta(res.data.meta);
    return res.data;
  };

  const createPost = async (formData) => {
    const temp = { _id: `temp-${Date.now()}`, title: formData.get('title'), body: formData.get('body'), featuredImage: '' , author: { name: 'you' } };
    setPosts(p => [temp, ...p]);
    try {
      const res = await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      setPosts(p => p.map(x => x._id === temp._id ? res.data : x));
      return res.data;
    } catch (err) {
      setPosts(p => p.filter(x => x._id !== temp._id));
      throw err;
    }
  };

  return (
    <PostsContext.Provider value={{ posts, meta, fetchPosts, createPost, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
