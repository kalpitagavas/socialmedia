const express = require("express");
const {
  updatePosts,
  deletePosts,
  getAllPost,
  createPost,
} = require("../controller/posts.controller");
const postsRouter = express.Router();

postsRouter.get("/", getAllPost);
postsRouter.post("/create", createPost);
postsRouter.patch("/update/:postID", updatePosts);

postsRouter.patch("/delete/:postID", deletePosts);

module.exports = { postsRouter };
