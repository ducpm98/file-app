import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useEffect, useState } from "react";

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [selectUser, setSelectUser] = useState({ userID: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("users", (user) => {
      for (let i = 0; i < user.length; i++) {
        user[i].hasNewMessages = false;
      }
      setUsers(user);
    });
    socket.on("user connected", (data) => {
      data.hasNewMessages = false;
      setUsers([...users, data]);
    });
    socket.on("message", (message) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (
          users[i].userID === message.senderID &&
          users[i].userID === selectUser.userID
        ) {
          console.log("here");
          console.log(message.text);
          setMessages([
            ...messages,
            { text: message.text, name: users[i].username },
          ]);
        } else {
          user.hasNewMessages = true;
        }
      }
    });
  }, [socket, messages, users, selectUser]);

  return (
    <div className="flex gap-1 h-screen w-screen">
      <ChatBar
        users={users}
        setSelectUser={setSelectUser}
        selectUser={selectUser}
        id={socket.id}
      />
      <div className="flex flex-col h-full w-full p-5 pl-1">
        <ChatBody messages={messages} />
        <ChatFooter
          socket={socket}
          selectUser={selectUser}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

export default Chat;
