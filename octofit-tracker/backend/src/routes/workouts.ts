import { Router } from 'express';
import { Workout } from '../models/workout';
import { getApiMetadata } from './utils';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({
    message: 'Workouts route',
    ...getApiMetadata(),
    endpoint: '/api/workouts/',
    workouts
  });
});

export default router;
