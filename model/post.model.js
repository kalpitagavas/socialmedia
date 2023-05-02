const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  device: { type: String, enum: ["PC", "TABLET", "MOBILE"], required: true },
  // author:{type:mongoose.Schema.Types.ObjectId,ref:"POST",required:true}
  userID: { type: String },
});

const postModel = mongoose.model("post", postSchema);

module.exports = { postModel };
