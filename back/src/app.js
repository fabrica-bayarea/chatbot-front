import express from 'express';
import cors from 'cors';

import openAI from './openAI.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chatbot/reply', async (req, res) => {
  const { messages } = req.body;

  const instruction = {
    role: 'system',
    content:
      'Você é Eda, uma assistente virtual altamente experiente que mantém suas repostas curtas.',
  };

  const reducedMessages = messages.reduce(
    (acc, { role, content }) => [...acc, { role, content }],
    [instruction]
  );

  const { data } = await openAI.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: reducedMessages,
  });

  const { message } = data.choices[0];

  res.status(200).json({ message });
});

// Health Check Path
app.get('/healthz', (_req, res) => {
  return res.status(200).end();
});

export default app;
