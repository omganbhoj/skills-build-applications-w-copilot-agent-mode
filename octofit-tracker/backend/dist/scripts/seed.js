"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({})
        ]);
        const users = await user_1.User.insertMany([
            {
                username: 'maya',
                email: 'maya@example.com',
                fullName: 'Maya Chen',
                role: 'captain',
                fitnessLevel: 'advanced'
            },
            {
                username: 'liam',
                email: 'liam@example.com',
                fullName: 'Liam Patel',
                role: 'member',
                fitnessLevel: 'intermediate'
            },
            {
                username: 'zoe',
                email: 'zoe@example.com',
                fullName: 'Zoe Alvarez',
                role: 'coach',
                fitnessLevel: 'advanced'
            }
        ]);
        const team = await team_1.Team.create({
            name: 'North Stars',
            sport: 'Running',
            members: [users[0]._id, users[1]._id],
            captain: users[0]._id
        });
        await activity_1.Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 45,
                calories: 540,
                date: new Date('2026-07-15')
            },
            {
                userId: users[1]._id,
                type: 'cycling',
                durationMinutes: 60,
                calories: 700,
                date: new Date('2026-07-14')
            }
        ]);
        await leaderboard_1.Leaderboard.insertMany([
            {
                userId: users[0]._id,
                score: 980,
                rank: 1,
                period: 'weekly'
            },
            {
                userId: users[1]._id,
                score: 875,
                rank: 2,
                period: 'weekly'
            }
        ]);
        await workout_1.Workout.insertMany([
            {
                name: 'Tempo Run',
                category: 'cardio',
                durationMinutes: 35,
                difficulty: 'hard',
                focus: 'endurance'
            },
            {
                name: 'Core Circuit',
                category: 'strength',
                durationMinutes: 25,
                difficulty: 'moderate',
                focus: 'core'
            }
        ]);
        console.log('Database seeding complete');
        console.log(JSON.stringify({
            users: users.length,
            team: team.name,
            activities: 2,
            leaderboardEntries: 2,
            workouts: 2
        }, null, 2));
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
