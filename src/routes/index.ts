import { Router } from 'express';
import TestRouter from '@routes/test.route';
import departmentRouter from '@routes/department/department.route';
import userRouter from '@routes/user/user.route';

const router = Router();
router.use('/test', TestRouter);
router.use('/department', departmentRouter);
router.use('/users', userRouter);

export default router;
