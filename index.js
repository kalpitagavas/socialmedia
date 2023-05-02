const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const { postsRouter } = require("./routes/post.routes");
const { auth } = require("./middleware/auth.middleware");
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postsRouter);
// app.get("/", (req, res) => {
//   res.send("Home");
// });

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`server is running at ${process.env.port}`);
});
