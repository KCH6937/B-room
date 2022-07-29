import { Router } from 'express';
import departmentRouter from '@routes/department/department.route';
import userRouter from '@routes/user/user.route';
import companyNoticeRouter from '@routes/companyNotice/companyNotice.route';
import companyChatRoomRouter from '@routes/companyChatRoom/companyChatRoom.route';
import holidayRouter from '@routes/holiday/holiday.route';
import timelogRouter from '@routes/timelog/timelog.route';
import auth from '@middlewares/auth.middlewares';

const router: Router = Router();

router.use('/department', auth.authJWT, departmentRouter);
router.use('/users', userRouter);
router.use('/notices', auth.authJWT, companyNoticeRouter);
router.use('/chats', auth.authJWT, companyChatRoomRouter);
router.use('/timelog', auth.authJWT, timelogRouter);
router.use('/holiday', auth.authJWT, holidayRouter);

export default router;
