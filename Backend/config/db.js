const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("✅ connectDB() function RUNNING...");   // Debug log

  if (!process.env.MONGO_URI) {
    console.log("❌ MONGO_URI is missing!");
    process.exit(1);
  }

  console.log("✅ MONGO_URI found:", process.env.MONGO_URI); // Debug log

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
