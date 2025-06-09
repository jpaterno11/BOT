import React from 'react';

function Chat({ messages }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
          <p><strong>{msg.sender}:</strong> {msg.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Chat;