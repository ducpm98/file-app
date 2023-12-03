/* eslint-disable no-unused-vars */
import { Image } from "./Image";
export default function ChatBody({ messages }) {
  function renderMessage(message, index) {
    if (message.type == "file") {
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
            <div className="chat-header">{message.name}</div>
          </div>
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
    <div className="card w-full bg-base-300 shadow-xl flex-grow rounded-b-none overflow-y-scroll">
      <div className="card-body">{messages.map(renderMessage)}</div>
    </div>
  );
}
