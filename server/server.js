import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import solanaRoutes from './routes/solanaRoutes.js';
import solblazeAPI from './routes/solblazeAPI.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/solana', solanaRoutes);
app.use('/api/solblaze', solblazeAPI);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
