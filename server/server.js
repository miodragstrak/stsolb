import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import solblazeAPI from './routes/solblazeAPI.js';

const app = express();
const PORT = process.env.PORT || 5000;

console.log("Server Port: ", process.env.PORT);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Omogući CORS
app.use(cors()); // Ovo omogućava sve CORS zahteve
app.use(express.json());
app.use('/api', solblazeAPI);  // Sve rute iz solblazeAPI.js će biti dostupne pod /api

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
