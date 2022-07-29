import { Router } from 'express';
import departmentRouter from '@routes/department/department.route';
import userRouter from '@routes/user/user.route';
import companyNoticeRouter from '@routes/companyNotice/companyNotice.route';
import companyChatroomRouter from '@routes/companyChatRoom/companyChatRoom.route';
import auth from '@middlewares/auth.middlewares';
const router: Router = Router();

router.use('/department', departmentRouter);
router.use('/users', userRouter);
router.use('/chats', companyChatroomRouter);
router.use('/notices', auth.authJWT, companyNoticeRouter);


export default router;
