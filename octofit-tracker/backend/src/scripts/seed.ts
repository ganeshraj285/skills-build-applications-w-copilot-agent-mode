import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data.

const seedData = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
  console.log('Connected to MongoDB');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      age: 36,
      fitnessGoal: 'Marathon training',
      city: 'London',
    },
    {
      name: 'Grace Hopper',
      email: 'grace@example.com',
      age: 41,
      fitnessGoal: 'Strength and mobility',
      city: 'New York',
    },
    {
      name: 'Linus Torvalds',
      email: 'linus@example.com',
      age: 55,
      fitnessGoal: 'Cycling endurance',
      city: 'Helsinki',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Rocket Runners',
      sport: 'Running',
      members: [users[0]._id, users[1]._id],
      description: 'Weekend runners and pace setters',
    },
    {
      name: 'Peak Performers',
      sport: 'CrossFit',
      members: [users[2]._id],
      description: 'Strength and conditioning crew',
    },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'run',
      durationMinutes: 42,
      distanceKm: 8.1,
      calories: 480,
      date: new Date('2026-06-20'),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 50,
      distanceKm: 0,
      calories: 320,
      date: new Date('2026-06-21'),
    },
    {
      user: users[2]._id,
      type: 'cycle',
      durationMinutes: 60,
      distanceKm: 24,
      calories: 610,
      date: new Date('2026-06-22'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { user: users[0]._id, score: 1280, rank: 1, streak: 5 },
    { user: users[1]._id, score: 1160, rank: 2, streak: 3 },
    { user: users[2]._id, score: 1120, rank: 3, streak: 6 },
  ]);

  await Workout.insertMany([
    {
      name: 'Cardio Blast',
      focus: 'endurance',
      durationMinutes: 35,
      difficulty: 'intermediate',
      equipment: ['treadmill', 'mat'],
    },
    {
      name: 'Core Strength',
      focus: 'mobility',
      durationMinutes: 30,
      difficulty: 'beginner',
      equipment: ['mat'],
    },
  ]);

  console.log('Seed completed successfully');
  await mongoose.disconnect();
};

seedData().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
