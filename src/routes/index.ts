import { Router } from 'express';
import departmentRouter from '@routes/department/department.route';
import userRouter from '@routes/user/user.route';
import companyNoticeRouter from '@routes/companyNotice/companyNotice.route';

const router = Router();
router.use('/department', departmentRouter);
router.use('/users', userRouter);
router.use('/notices', companyNoticeRouter);

export default router;
