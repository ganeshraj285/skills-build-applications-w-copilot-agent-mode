import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const startServer = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
