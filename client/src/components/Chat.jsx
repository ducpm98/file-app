/* eslint-disable react-hooks/exhaustive-deps */
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useEffect, useState } from "react";

function Chat({ socket }) {
  const [selectUser, setSelectUser] = useState({ userID: 0, message: [] });
  const [users, setUsers] = useState([]);
  const [message, setMessages] = useState([]);

  useEffect(() => {
    const handle_users = (user) => {
      for (let i = 0; i < user.length; i++) {
        user[i].hasNewMessages = false;
        user[i].message = [];
      }
      console.log(user);
      setUsers(user);
    };
    socket.on("users", handle_users);
    () => {
      socket.off("users", handle_users);
    };
  }, [socket, users]);

  useEffect(() => {
    const handle_message = (message) => {
      const newUsers = users.map((user) => {
        if (user.userID === message.senderID) {
          const newUser = {
            ...user,
            message: [
              ...user.message,
              {
                text: message.text,
                name: user.username,
                time: message.time,
              },
            ],
            hasNewMessages: user.userID !== selectUser.userID,
          };
          if (user.userID === selectUser.userID) {
            setSelectUser(newUser);
          }
          return newUser;
        } else {
          return user;
        }
      });
      setUsers(newUsers);
    };
    socket.on("message", handle_message);
    () => {
      socket.off("message", handle_message);
    };
  }, [socket, users]);

  useEffect(() => {
    const handle_user_connected = (data) => {
      data.hasNewMessages = false;
      data.message = [];
      setUsers([...users, data]);
    };
    socket.on("user connected", handle_user_connected);
  }, [socket, users]);

  useEffect(() => {
    const currentUser = users.find((user) => user.userID === socket.id);
    console.log(users);
    if (currentUser !== undefined) {
      const msg_temp = [];
      currentUser.message.forEach((message) => {
        if (message.to === selectUser.userID) {
          msg_temp.push({
            text: message.text,
            name: message.name,
            time: message.time,
          });
        }
      });

      selectUser.message.forEach((message) => {
        msg_temp.push({
          text: message.text,
          name: message.name,
          time: message.time,
        });
      });

      msg_temp.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });
      setMessages(msg_temp);
    }
    () => {
      setMessages([]);
    };
  }, [selectUser, users]);
  return (
    <div className="flex gap-1 h-screen w-screen">
      <ChatBar
        users={users}
        setSelectUser={setSelectUser}
        selectUser={selectUser}
        id={socket.id}
      />
      <div className="flex flex-col h-full w-full p-5 pl-1">
        <ChatBody messages={message} />
        <ChatFooter
          socket={socket}
          selectUser={selectUser}
          users={users}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
}

export default Chat;
