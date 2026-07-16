import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
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

    const team = await Team.create({
      name: 'North Stars',
      sport: 'Running',
      members: [users[0]._id, users[1]._id],
      captain: users[0]._id
    });

    await Activity.insertMany([
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

    await Leaderboard.insertMany([
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

    await Workout.insertMany([
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

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
