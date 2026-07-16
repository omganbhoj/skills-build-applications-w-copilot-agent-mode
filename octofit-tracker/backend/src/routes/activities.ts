import { Router } from 'express';
import { Activity } from '../models/activity';
import { getApiMetadata } from './utils';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({
    message: 'Activities route',
    ...getApiMetadata(),
    endpoint: '/api/activities/',
    activities
  });
});

export default router;
