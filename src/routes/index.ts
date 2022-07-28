import { Router } from 'express';
import departmentRouter from '@routes/department/department.route';
import companyNoticeRouter from '@routes/companyNotice/companyNotice.route';

const router = Router();
router.use('/department', departmentRouter);
router.use('/notices', companyNoticeRouter);

export default router;
