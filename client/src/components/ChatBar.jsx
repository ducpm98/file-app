export default function ChatBar({ selectUser, setSelectUser, users, id }) {
  return (
    <div className="h-full gap-2 flex flex-col pl-5 pt-5">
      <span className="font-bold text-2xl"> Chat Application </span>
      <div>
        <span className="font-bold">Users</span>
        <div className="flex flex-col w-full gap-2 pt-2">
          {users.map(
            (user) =>
              user.userID !== id && (
                <div className="indicator w-full" key={user.userID}>
                  <span
                    className={
                      "indicator-item badge " +
                      (user.hasNewMessages ? "bg-primary" : "bg-green-400")
                    }
                  ></span>
                  <button
                    className={
                      "flex flex-grow h-10 bg-base-300 place-items-center justify-center rounded-xl btn-ghost" +
                      (user.userID === selectUser.userID
                        ? " btn-active no-animation"
                        : "")
                    }
                    onClick={() => {
                      setSelectUser(user);
                    }}
                  >
                    <span className="font-bold">{user.username}</span>
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
