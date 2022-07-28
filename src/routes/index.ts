import { Router } from 'express';
import departmentRouter from '@routes/department/department.route';
import userRouter from '@routes/user/user.route';
import companyNoticeRouter from '@routes/companyNotice/companyNotice.route';
import companyChatroomRouter from '@routes/companyChatRoom/companyChatRoom.route';

const router = Router();
router.use('/department', departmentRouter);
router.use('/users', userRouter);
router.use('/notices', companyNoticeRouter);
router.use('/chats', companyChatroomRouter);

export default router;
