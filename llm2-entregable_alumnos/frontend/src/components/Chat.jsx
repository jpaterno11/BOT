import React from 'react';
const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '10px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f5f7',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    height: '70vh',
    overflowY: 'auto',
  },
  messageWrapper: {
    marginBottom: '12px',
    display: 'flex',
  },
  userMessage: {
    marginLeft: 'auto',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 14px',
    borderRadius: '18px 18px 0 18px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  assistantMessage: {
    marginRight: 'auto',
    backgroundColor: '#e1e1e8',
    color: '#333',
    padding: '10px 14px',
    borderRadius: '18px 18px 18px 0',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  senderLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    marginBottom: '4px',
    opacity: 0.6,
  },
};
function Chat({ messages }) {
  return (
    <div style={styles.container}>
      {messages.map((msg, i) => {
        const isUser = msg.sender === 'user';
        return (
          <div
            key={i}
            style={{
              ...styles.messageWrapper,
              justifyContent: isUser ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={isUser ? styles.userMessage : styles.assistantMessage}>
              <div style={styles.senderLabel}>{msg.sender}</div>
              <div>{msg.text}</div>
            </div>
          </div>
        );
      })}
    </div>

  );
}


export default Chat;