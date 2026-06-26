"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
const getApiBaseUrl = (_req) => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
const buildPayload = (req, data) => ({
    apiUrl: getApiBaseUrl(req),
    data,
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get(['/api/users', '/api/users/'], async (req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json(buildPayload(req, users));
});
app.post(['/api/users', '/api/users/'], (req, res) => {
    res.status(201).json(buildPayload(req, { created: true, user: req.body }));
});
app.get(['/api/teams', '/api/teams/'], async (req, res) => {
    const teams = await team_1.Team.find({}).populate('members').lean();
    res.json(buildPayload(req, teams));
});
app.post(['/api/teams', '/api/teams/'], (req, res) => {
    res.status(201).json(buildPayload(req, { created: true, team: req.body }));
});
app.get(['/api/activities', '/api/activities/'], async (req, res) => {
    const activities = await activity_1.Activity.find({}).populate('user').lean();
    res.json(buildPayload(req, activities));
});
app.post(['/api/activities', '/api/activities/'], (req, res) => {
    res.status(201).json(buildPayload(req, { created: true, activity: req.body }));
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find({}).populate('user').lean();
    res.json(buildPayload(req, leaderboard));
});
app.get(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json(buildPayload(req, workouts));
});
app.post(['/api/workouts', '/api/workouts/'], (req, res) => {
    res.status(201).json(buildPayload(req, { created: true, workout: req.body }));
});
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
