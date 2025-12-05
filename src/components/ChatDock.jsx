import React, { useState } from "react";
import {
  MessageBox,
  Button as ChatButton,
  Input as ChatInput
} from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const ChatDock = () => {
  const [messages, setMessages] = useState([
    { position: "left", type: "text", text: "Hi! I’m your IoT assistant." },
    { position: "left", type: "text", text: "Ask me about sensors, weather, or alerts." },
  ]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const mine = { position: "right", type: "text", text };
    setMessages(prev => [...prev, mine]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      // Simple echo/placeholder response. Replace with your backend.
      setMessages(prev => [
        ...prev,
        { position: "left", type: "text", text: `You said: "${text}". Sensor readings look stable.` }
      ]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="bg-white border rounded-lg p-4 flex flex-col h-[620px]">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Assistant Chat</h3>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {messages.map((m, idx) => (
          <MessageBox
            key={idx}
            position={m.position}
            type="text"
            text={m.text}
          />
        ))}
        {typing && (
          <MessageBox position="left" type="text" text="Typing..." />
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <ChatInput
          placeholder="Type a message..."
          value={draft}
          onChange={e => setDraft(e.target.value)}
          multiline={false}
          rightButtons={
            <ChatButton
              text="Send"
              color="white"
              backgroundColor="#2563eb"
              onClick={sendMessage}
            />
          }
        />
      </div>
    </div>
  );
};

export default ChatDock;
