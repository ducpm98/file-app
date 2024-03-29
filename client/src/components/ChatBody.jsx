/* eslint-disable no-unused-vars */
import { Image } from "./Image";
export default function ChatBody({ messages }) {
  function downloadFile(url, filename) {
    const element = document.createElement("a");
    element.href = url;
    element.download = filename;
    element.hidden = true;
    document.body.appendChild(element);
    element.click();
  }
  function renderMessage(message, index) {
    if (message.type == "file" && message.mimeType.includes("image")) {
      const blob = new Blob([message.text], { type: message.mimeType });
      console.log(blob);
      return (
        <div
          className={
            "chat" + ("You" == message.name ? " chat-end" : " chat-start")
          }
        >
          <div
            className={
              "chat-bubble " +
              ("You" == message.name
                ? "bg-blue-500 text-white"
                : "bg-white text-black")
            }
          >
            <Image blob={blob} />
          </div>
          <div className="chat-header">{message.name}</div>
        </div>
      );
    } else if (message.type == "file") {
      const blob = new Blob([message.text], { type: message.mimeType });
      const url = URL.createObjectURL(blob);
      return (
        <div
          className={
            "chat" + ("You" == message.name ? " chat-end" : " chat-start")
          }
        >
          <div
            className={
              "chat-bubble " +
              ("You" == message.name
                ? "bg-blue-500 text-white"
                : "bg-white text-black")
            }
          >
            <button
              className="btn bg-gray-200 text-black border-transparent hover:bg-gray-300 hover:border-transparent"
              onClick={(e) => downloadFile(url, message.filename)}
            >
              {message.filename}
            </button>
          </div>
          <div className="chat-header">{message.name}</div>
        </div>
      );
    } else {
      return (
        <div
          className={
            "chat" + ("You" == message.name ? " chat-end" : " chat-start")
          }
        >
          <div
            className={
              "chat-bubble " +
              ("You" == message.name
                ? "bg-blue-500 text-white"
                : "bg-white text-black")
            }
          >
            {message.text}
          </div>
          <div className="chat-header">{message.name}</div>
        </div>
      );
    }
  }
  return (
    <div className="card w-full bg-base-300 shadow-xl flex-grow rounded-b-none overflow-y-scroll scrollbar-hide">
      <div className="card-body">{messages.map(renderMessage)}</div>
    </div>
  );
}
