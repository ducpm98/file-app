import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000", {
  autoConnect: false,
});

export { socket };
