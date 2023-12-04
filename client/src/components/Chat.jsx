/* eslint-disable react-hooks/exhaustive-deps */
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useEffect, useState } from "react";

function Chat({ socket }) {
  const [selectUser, setSelectUser] = useState({ userID: 0, message: [] }); // store current selected user object
  const [users, setUsers] = useState([]); // store all users object in chat
  const [message, setMessages] = useState([]); // store message of current room

  // initial user list
  useEffect(() => {
    const handle_users = (user) => {
      for (let i = 0; i < user.length; i++) {
        user[i].hasNewMessages = false;
        user[i].message = [];
      }
      setUsers(user);
    };
    socket.on("users", handle_users);
    () => {
      socket.off("users", handle_users);
    };
  }, [socket, users]);

  useEffect(() => {
    const user = users.find((user) => user.userID === selectUser.userID);
    if (user !== undefined) {
      user.hasNewMessages = false;
      setUsers([...users]);
    }
  }, [selectUser]);

  // new message coming
  useEffect(() => {
    const handle_message = (message) => {
      const newUsers = users.map((user) => {
        if (user.userID === message.senderID) {
          const newUser = {
            ...user,
            message: [
              ...user.message,
              {
                filename: message.filename,
                type: message.type,
                text: message.text,
                mimeType: message.mimeType,
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

  // user disconnected => update users
  useEffect(() => {
    const handle_user_disconnected = (userID) => {
      setUsers(users.filter((user) => user.userID !== userID));
    };
    socket.on("user disconnected", handle_user_disconnected);
    () => {
      socket.off("user disconnected", handle_user_disconnected);
    };
  }, [socket, users]);

  // new user connected => update users
  useEffect(() => {
    const handle_user_connected = (data) => {
      data.hasNewMessages = false;
      data.message = [];
      setUsers([...users, data]);
    };
    socket.on("user connected", handle_user_connected);
  }, [socket, users]);

  // handle crafting message for new selected user
  useEffect(() => {
    const currentUser = users.find((user) => user.userID === socket.id);
    console.log(users);
    if (currentUser !== undefined) {
      const msg_temp = [];
      currentUser.message.forEach((message) => {
        if (message.to === selectUser.userID) {
          msg_temp.push({
            filename: message.filename,
            type: message.type,
            text: message.text,
            mimeType: message.mimeType,
            name: message.name,
            time: message.time,
          });
        }
      });

      selectUser.message.forEach((message) => {
        msg_temp.push({
          filename: message.filename,
          text: message.text,
          mimeType: message.mimeType,
          type: message.type,
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
