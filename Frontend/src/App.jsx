import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './pages/PostList';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
