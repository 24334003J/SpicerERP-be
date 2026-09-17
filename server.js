const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// ==========================
// Middleware
// ==========================

app.use(cors());
app.use(express.json());

// ==========================
// MongoDB Connection
// ==========================

mongoose
  .connect("mongodb://127.0.0.1:27017/bookshop")
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// ==========================
// Test Route
// ==========================

app.get("/", (req, res) => {
  res.send("Welcome to my Server. Server is running!");
});

// ==========================
// Books API
// ==========================

app.get("/api/books", (req, res) => {
  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 499
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 399
    }
  ];

  res.json(books);
});

// ==========================
// User Schema
// ==========================

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  }
});

// ==========================
// User Model
// ==========================

const User = mongoose.model("User", userSchema);

// ==========================
// Register User
// ==========================

app.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = new User({
      name,
      email
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});