import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true },
  focus: String,
  durationMinutes: Number,
  difficulty: String,
  equipment: [String],
}, { timestamps: true });

export const Workout = model('Workout', workoutSchema);
