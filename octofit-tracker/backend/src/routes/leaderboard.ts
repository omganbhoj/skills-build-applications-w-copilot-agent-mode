import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';
import { getBaseUrl } from './utils';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).lean();
  res.json({
    message: 'Leaderboard route',
    baseUrl: getBaseUrl(),
    endpoint: '/api/leaderboard/',
    leaderboard
  });
});

export default router;
