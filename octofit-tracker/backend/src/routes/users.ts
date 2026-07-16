import { Router } from 'express';
import { User } from '../models/user';
import { getBaseUrl } from './utils';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({
    message: 'Users route',
    baseUrl: getBaseUrl(),
    endpoint: '/api/users/',
    users
  });
});

export default router;
