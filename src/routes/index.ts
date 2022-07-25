import { Router } from 'express';
import TestRouter from '@routes/test.route';

const router = Router();
router.use('/test', TestRouter);

export default router;
