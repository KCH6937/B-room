import { Router } from 'express';
import companyChatroomController from '@controllers/companyChatRoom/companyChatRoom.controller';

const router: Router = Router();

router.get('/', companyChatroomController.getChatroomsInfo);

export default router;
