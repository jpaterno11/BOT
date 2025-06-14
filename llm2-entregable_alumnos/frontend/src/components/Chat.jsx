import React from 'react';
import ReactMarkdown from 'react-markdown';

function Chat({ messages, assistantName, assistantAvatar }) {
  return (
    <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            marginBottom: "1rem",
            textAlign: msg.sender === 'user' ? 'right' : 'left'
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
            {msg.sender === 'user' ? '🧑 Usuario' : `${assistantAvatar} ${assistantName}`}
          </div>

          <div
            style={{
              display: "inline-block",
              backgroundColor: msg.sender === 'user' ? "#DCF8C6" : "#F1F0F0",
              padding: "0.5rem",
              borderRadius: "8px",
              maxWidth: "80%",
              textAlign: "left"
            }}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
