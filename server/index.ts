import 'dotenv/config';
import express from 'express';
import { analyzeRoute } from './routes/analyze';

const PORT = Number(process.env.PORT) || 3001;

const app = express();

app.use(express.json({ limit: '512kb' }));

app.post('/api/analyze', analyzeRoute);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
