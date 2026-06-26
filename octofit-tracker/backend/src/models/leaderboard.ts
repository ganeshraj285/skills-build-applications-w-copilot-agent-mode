import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  streak: Number,
}, { timestamps: true });

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
