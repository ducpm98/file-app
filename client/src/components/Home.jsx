import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { socket } from "../lib/socket";
function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const handleUsernameChange = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", username);
    socket.auth = { username };
    socket.connect();
    // socket.emit("newUser", { username, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body gap-5">
          <h2 className="card-title">Sign in</h2>
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">What is your name?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleUsernameChange}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
