import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  calories: Number,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Activity = model('Activity', activitySchema);
