require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import your routes
const postsRoutes = require('./routes/posts');
const categoriesRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const commentsRoutes = require('./routes/comments');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({ origin: process.env.Frontend_URL || '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API routes
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
