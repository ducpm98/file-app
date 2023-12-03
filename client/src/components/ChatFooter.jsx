/* eslint-disable react/prop-types */
import "../assets/css/duotone.min.css";
import { useState } from "react";
export default function ChatFooter({
  socket,
  selectUser,
  messages,
  setMessages,
}) {
  const [message, setMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        text: message,
        name: socket.auth.username,
        id: `${socket.id}${Math.random()}`,
        receiverID: selectUser.userID,
      });
      setMessages([...messages, { text: message, name: "You" }]);
    }
    setMessage("");
    document.getElementById("input-chat").value = "";
  };

  return (
    <div className="card w-full bg-base-300 shadow-xl rounded-t-none">
      <div className="card-body flex flex-row">
        <div className="flex flex-grow bg-white pl-2  rounded-xl items-center pr-2">
          <input
            id="input-chat"
            type="text"
            placeholder="Type here"
            className="input input-ghost flex-grow h-full focus:outline-none bg-transparent focus:border-none border-none"
            disabled={selectUser.userID === 0}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button className="btn btn-sm btn-ghost bg-transparent ">
            <i className="fa-duotone fa-paperclip "></i>
          </button>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSendMessage}
          disabled={selectUser.userID === 0}
        >
          <i className="fa-duotone fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
