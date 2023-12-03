import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useEffect, useState } from "react";
function Chat({ socket }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <div className="flex gap-1 h-screen w-screen">
      <ChatBar socket={socket} />
      <div className="flex flex-col h-full w-full p-5 pl-1">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}

export default Chat;
