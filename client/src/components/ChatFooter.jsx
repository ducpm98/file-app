/* eslint-disable react/prop-types */
import "../assets/css/duotone.min.css";
import { useState } from "react";
export default function ChatFooter({ socket }) {
  const [message, setMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("userName"));
    if (message.trim() && localStorage.getItem("userName")) {
      console.log(socket.id);
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className="card w-full bg-base-300 shadow-xl rounded-t-none">
      <div className="card-body flex flex-row">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          <i className="fa-duotone fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
