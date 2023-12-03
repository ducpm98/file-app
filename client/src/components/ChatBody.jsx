/* eslint-disable react/jsx-key */
export default function ChatBody({ messages }) {
  return (
    <div className="card w-full bg-base-300 shadow-xl flex-grow rounded-b-none overflow-y-scroll">
      <div className="card-body">
        {messages.map((message) => (
          <>
            <div
              className={
                "chat" +
                (localStorage.getItem("userName") == message.name
                  ? " chat-end"
                  : "chat-start")
              }
            >
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-header">{message.name}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
