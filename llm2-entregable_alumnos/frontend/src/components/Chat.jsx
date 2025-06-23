import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../css/Chat.css'; 

function Chat({ messages, assistantName, assistantAvatar }) {
  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.sender === 'user' ? 'chat-user' : 'chat-assistant'}`}
        >
          <div className="chat-sender">
            {msg.sender === 'user' ? '🧑 Usuario' : `${assistantAvatar} ${assistantName}`}
          </div>

          <div className={`chat-bubble ${msg.sender}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
