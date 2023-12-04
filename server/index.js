const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app); // http server implementation for express
const cors = require("cors"); // import cors

// set up Socket.IO using the http server and cors
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

app.use(cors()); // allow cross-origin requests

// to make sure that the user has a username
socketIO.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username"));
  }
  socket.username = username;
  next();
});

//handle when user connected
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  let users = [];

  // get all users
  for (let [id, socket] of socketIO.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  // send to clients
  socket.emit("users", users);

  // send information of the new user to other users clients
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  // send information of the disconnected user to other users clients
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
    console.log("🔥: A user disconnected");
  });

  // handle send message
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
}); // start the server
