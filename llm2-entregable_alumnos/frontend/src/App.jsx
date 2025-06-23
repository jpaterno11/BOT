import React, { useState, useEffect } from 'react';
import Chat from './components/Chat.jsx';
import { sendMessage } from './api';
import './css/App.css'

function App() {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chatHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [tool, setTool] = useState("default");
  const [model, setModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);

  const assistantName = "Asistente GPT";
  const assistantAvatar = "🤖";

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const response = await sendMessage(input, { tool, model, temperature });
      const assistantMessage = {
        sender: 'assistant',
        text: response.response,
        tool,
        model,
        temperature
      };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'assistant', text: 'Error processing your request.' };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <>
    <div className="app-container">
      <h1 className="app-title">Chat con 🤖 Asistente GPT</h1>

      <div className="controls">
        <div>
          <label>Tool:</label>
          <select value={tool} onChange={(e) => setTool(e.target.value)} className="select-style">
            <option value="default">Default</option>
            <option value="alumnos">Alumnos Tool</option>
          </select>
        </div>

        <div>
          <label>Modelo:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="select-style">
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>

        <div>
          <label>Temperatura:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
          <span style={{ marginLeft: "0.5rem" }}>{temperature}</span>
        </div>
      </div>

      <Chat messages={messages} assistantName={assistantName} assistantAvatar={assistantAvatar} />

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí una pregunta..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Pensando...' : 'Enviar'}
        </button>
      </div>
    </div>
    </>
  );
}


export default App;
