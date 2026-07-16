import { Router } from 'express';
import { Team } from '../models/team';
import { getBaseUrl } from './utils';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find({}).populate('members').populate('captain').lean();
  res.json({
    message: 'Teams route',
    baseUrl: getBaseUrl(),
    endpoint: '/api/teams/',
    teams
  });
});

export default router;
