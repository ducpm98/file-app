/* eslint-disable react/prop-types */
import "../assets/css/duotone.min.css";
import { useState } from "react";
export default function ChatFooter({ socket, selectUser, users, setUsers }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const handleSendMessage = (e) => {
    e.preventDefault();
    const currentUser = users.find((user) => user.userID === socket.id);

    if (file != null) {
      const time = new Date().toString();
      socket.emit("message", {
        filename: file.name,
        text: file,
        name: socket.auth.username,
        type: "file",
        mimeType: file.type,
        time: time,
        receiverID: selectUser.userID,
      });
      currentUser.message.push({
        filename: file.name,
        type: "file",
        text: file,
        name: "You",
        time: time,
        mimeType: file.type,
        to: selectUser.userID,
      });
      setFile(null);
    }
    if (message.trim()) {
      const time = new Date().toString();
      socket.emit("message", {
        text: message,
        name: socket.auth.username,
        type: "text",
        time: time,
        receiverID: selectUser.userID,
      });
      currentUser.message.push({
        type: "text",
        text: message,
        name: "You",
        time: time,
        to: selectUser.userID,
      });
    }
    setUsers([...users]);

    setMessage("");
    document.getElementById("input-chat").value = "";
  };

  return (
    <div className="card w-full bg-base-300 shadow-xl rounded-t-none">
      <div className="card-body flex flex-row items-end">
        <div className="flex flex-grow h-full bg-base-100 pl-2 rounded-xl items-end pr-2 pt-2  pb-2">
          <div className="flex flex-col h-full flex-grow gap-4 justify-center">
            {file != null && (
              <div className="flex flex-col gap-1 bg-gray-200 h-fit w-fit p-2  rounded-xl items-center">
                <div className="w-full flex justify-end">
                  <button
                    className="btn btn-xs btn-ghost bg-transparent"
                    onClick={() => {
                      setFile(null);
                    }}
                  >
                    <i className="fa-duotone fa-times text-black"></i>
                  </button>
                </div>

                <span className="font-bold text-sm h-full w-full m-5 text-center text-black">
                  {file.name.split(".")[file.name.split(".").length - 1]}
                </span>
              </div>
            )}
            <input
              id="input-chat"
              type="text"
              placeholder="Type here"
              className="input input-ghost flex-grow h-full focus:outline-none bg-transparent focus:border-none border-none"
              // disabled={selectUser.userID === 0}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>

          <input
            type="file"
            className="hidden"
            id="file-input"
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <button
            className="btn btn-sm btn-ghost bg-transparent "
            disabled={selectUser.userID === 0}
            onClick={() => {
              document.getElementById("file-input").click();
            }}
          >
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
