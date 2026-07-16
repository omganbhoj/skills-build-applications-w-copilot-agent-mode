import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';
import { getApiMetadata } from './utils';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).lean();
  res.json({
    message: 'Leaderboard route',
    ...getApiMetadata(),
    endpoint: '/api/leaderboard/',
    leaderboard
  });
});

export default router;
