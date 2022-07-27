import { Router } from 'express';
import TestRouter from '@routes/test.route';
import departmentRouter from '@routes/department/department.route';

const router = Router();
router.use('/test', TestRouter);
router.use('/department', departmentRouter);

export default router;
