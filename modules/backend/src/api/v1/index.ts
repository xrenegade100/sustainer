import express, { Request, Response } from 'express';

import emojis from './emojis';

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

export default router;
