import { useState } from "react";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    const reply = "This is a basic AI response";
    setChat([...chat, { user: msg, bot: reply }]);
    setMsg("");
  };

  return (
    <div>
      <h2>AI Chatbot</h2>

      <div>
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p><b>Bot:</b> {c.bot}</p>
          </div>
        ))}
      </div>

      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}