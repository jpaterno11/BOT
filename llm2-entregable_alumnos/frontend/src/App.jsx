import React, { useState, useEffect } from 'react';
import Chat from './components/Chat.jsx';
import { sendMessage } from './api';

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
      <div style={{ padding: "1rem" }}>
        <h1>Chat con {assistantAvatar} {assistantName}</h1>

        {/* Controles */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Tool: </label>
          <select value={tool} onChange={(e) => setTool(e.target.value)}>
            <option value="default">Default</option>
            <option value="math">Math Tool</option>
            <option value="code">Code Tool</option>
          </select>

          <label style={{ marginLeft: "1rem" }}>Modelo: </label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
          </select>

          <label style={{ marginLeft: "1rem" }}>Temperatura: </label>
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

        {/* Chat */}
        <Chat messages={messages} assistantName={assistantName} assistantAvatar={assistantAvatar} />

        {/* Entrada de texto */}
        <div style={{ marginTop: "1rem" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí una pregunta..."
            style={{ width: "80%", padding: "0.5rem" }}
          />
          <button onClick={handleSend} disabled={loading} style={{ marginLeft: "1rem" }}>
            {loading ? 'Pensando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
