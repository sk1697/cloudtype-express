const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    // origin: '"http://localhost:5173"',
    // origin: "https://sk1697-super-duper-space-winner-w5796jj4r54hvq44-3000.preview.app.github.dev/",
    origin: "*",
    mathods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "socket server running!!",
  });
});

app.get("/home", (req, res) => {
  res.status(200).send({
    success: true,
    message: "welcome to the beginning of greatness",
  });
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    console.log("sender ID : ", socket.id, "location : ", data);
    data = { sender: socket.id, location: data };
    console.log("data : ", data);
    socket.broadcast.emit("receive_message", data);
  });
}); // 연결확인
