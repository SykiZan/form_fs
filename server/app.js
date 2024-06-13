// const express = require("express");

// const usersRouter = require("./routes/userRoutes");

// const app = express();

// app.use(express.json());

// app.use("/", (req, res, next) => {
//   console.log("welcome to the app");
//   next();

//   res.status(200).json({
//     status: "success",
//     data: {
//       response: "some data",
//     },
//   });
// });

// app.use("/users", usersRouter);

// module.exports = app;

const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream("./data/txt");
  readStream.pipe(res);
});

server.listen(3000, () => {
  console.log("server is listening");
});
