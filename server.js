const express = require("express");

const app = express();
const PORT = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory database
let blogPosts = [];

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Data Hub API is running" });
});

// GET all posts
app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

// GET a single post
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// CREATE a new post
app.post("/posts", (req, res) => {
  const newPost = {
    id: blogPosts.length + 1,
    ...req.body,
  };

  blogPosts.push(newPost);

  res.status(201).json(newPost);
});

// UPDATE a post
app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const postIndex = blogPosts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  blogPosts[postIndex] = {
    id,
    ...req.body,
  };

  res.json(blogPosts[postIndex]);
});

// DELETE a post
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const postExists = blogPosts.some((post) => post.id === id);

  if (!postExists) {
    return res.status(404).json({ message: "Post not found" });
  }

  blogPosts = blogPosts.filter((post) => post.id !== id);

  res.json({ message: "Post deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Data Hub server running on http://localhost:${PORT}`);
});