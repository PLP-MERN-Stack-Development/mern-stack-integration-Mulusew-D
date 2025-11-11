import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);
