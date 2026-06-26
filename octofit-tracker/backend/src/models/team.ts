import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true },
  sport: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  description: String,
}, { timestamps: true });

export const Team = model('Team', teamSchema);
