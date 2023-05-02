const { postModel } = require("../model/post.model");
const jwt = require("jsonwebtoken");
const getAllPost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "socialm");
  try {
    if (decoded) {
      const { device } = req.body;
      let query = {};
      if (device) {
        query.device = device;
      }
      const post = await postModel.find({ userID: decoded.userID });
      res.status(200).send(post);
    } else {
      res.status(400).send({ msg: "No post " });
    }
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
};

const createPost = async (req, res) => {
  try {
    const post = new postModel(req.body);
    await post.save();
    res.status(200).send({ msg: "New Post has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
};

const updatePosts = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "socialm");
  const postID = req.params.postID;
  const req_id = decoded.userID;
  // const userID_in_post = post.userID;
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      res.send("post not found");
    }
    if (req_id !== req.postID) {
      res.send("Not Authorized");
    }
    const updatepost = await NoteModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ msg: "post has been Updated" });
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
};

const deletePosts = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "socialm");
  const postID = req.params.postID;
  const req_id = decoded.userID;
  try {
    const post = await postModel.findOne({ _id: postID });
    if (post.userID === req_id) {
      await postModel.findByIdAndDelete({ _id: postID });
      res.status(200).send({ msg: "post has been Deleted" });
    } else {
      res.status(400).send({ msg: "You are not authorized to delete this note" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
};

module.exports = { createPost, getAllPost, updatePosts, deletePosts };
