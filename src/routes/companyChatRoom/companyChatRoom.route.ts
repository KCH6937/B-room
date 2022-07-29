import { Router } from 'express';
import companyChatRoomController from '@controllers/companyChatRoom/companyChatRoom.controller';

const router: Router = Router();

router.get('/', companyChatRoomController.getChatRoomsInfo);
router.post('/', companyChatRoomController.createChatRoom);

export default router;
