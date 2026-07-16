import { Router } from 'express';
import { User } from '../models/user';
import { getApiMetadata } from './utils';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({
    message: 'Users route',
    ...getApiMetadata(),
    endpoint: '/api/users/',
    users
  });
});

export default router;
