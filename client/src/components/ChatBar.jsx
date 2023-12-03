import { useState, useEffect } from "react";
export default function ChatBar({ socket }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="h-full gap-2 flex flex-col pl-5 pt-5">
      <span className="font-bold text-xl"> Chat Application </span>
      <div>
        <span className="font-bold">Online Users</span>
        <div className="flex flex-col w-full gap-2 pt-5">
          {users.map((user) => (
            <button
              key={user.socketID}
              className="btn btn-ghost w-full no-animation"
            >
              {user.username}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
