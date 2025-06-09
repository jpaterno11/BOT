import express from 'express';
import cors from 'cors';
import runAgent from './agent.js';

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await runAgent(message);
    res.json({ response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});