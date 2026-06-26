import express, { type Request, type Response } from 'express';
import { connectDatabase } from './config/database';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const port = 8000;

app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;

const getApiBaseUrl = (req: Request) => {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return `${req.protocol}://${req.get('host') || 'localhost:8000'}`;
};

const buildPayload = (req: Request, data: unknown) => ({
  apiUrl: getApiBaseUrl(req),
  data,
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get(['/api/users', '/api/users/'], async (req: Request, res: Response) => {
  const users = await User.find({}).lean();
  res.json(buildPayload(req, users));
});

app.post(['/api/users', '/api/users/'], (req: Request, res: Response) => {
  res.status(201).json(buildPayload(req, { created: true, user: req.body }));
});

app.get(['/api/teams', '/api/teams/'], async (req: Request, res: Response) => {
  const teams = await Team.find({}).populate('members').lean();
  res.json(buildPayload(req, teams));
});

app.post(['/api/teams', '/api/teams/'], (req: Request, res: Response) => {
  res.status(201).json(buildPayload(req, { created: true, team: req.body }));
});

app.get(['/api/activities', '/api/activities/'], async (req: Request, res: Response) => {
  const activities = await Activity.find({}).populate('user').lean();
  res.json(buildPayload(req, activities));
});

app.post(['/api/activities', '/api/activities/'], (req: Request, res: Response) => {
  res.status(201).json(buildPayload(req, { created: true, activity: req.body }));
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('user').lean();
  res.json(buildPayload(req, leaderboard));
});

app.get(['/api/workouts', '/api/workouts/'], async (req: Request, res: Response) => {
  const workouts = await Workout.find({}).lean();
  res.json(buildPayload(req, workouts));
});

app.post(['/api/workouts', '/api/workouts/'], (req: Request, res: Response) => {
  res.status(201).json(buildPayload(req, { created: true, workout: req.body }));
});

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
