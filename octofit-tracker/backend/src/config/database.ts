import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB database: octofit_db');
};
