const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Post = require("./models/Post");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Custom request logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();

  console.log(`[${req.method}] ${req.originalUrl} - ${timestamp}`);

  next();
});

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Data Hub API is running" });
});

// GET all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET top 3 most recent posts
app.get("/posts/recent", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("authorId");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new user
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a single post
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    res.status(500).json({ message: error.message });
  }
});

// CREATE a new post
app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    const populatedPost = await post.populate("authorId");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a post
app.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("authorId");

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    res.status(400).json({ message: error.message });
  }
});

// DELETE a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    res.status(500).json({ message: error.message });
  }
});

// Mock login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  res.json({
    message: "Login successful",
    token: "mock-jwt-token-12345",
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Data Hub server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });