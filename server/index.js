const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

app.use(cors());
socketIO.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username"));
  }
  socket.username = username;
  next();
});
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  let users = [];

  for (let [id, socket] of socketIO.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
    console.log("🔥: A user disconnected");
  });

  socket.on("message", (message) => {
    socket.to(message.receiverID).emit("message", {
      filename: message.filename != undefined ? message.filename : null,
      type: message.type,
      mimeType: message.mimeType != undefined ? message.mimeType : null,
      senderID: socket.id,
      time: message.time,
      text: message.text,
    });
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
