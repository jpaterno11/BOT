import React, { useState } from 'react';
import Chat from './components/Chat.jsx';
import { sendMessage } from './api';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await sendMessage(input);
      const assistantMessage = { sender: 'assistant', text: response.response };
      setMessages([...messages, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'assistant', text: 'Error processing your request.' };
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div>
      <Chat messages={messages} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
}

export default App;