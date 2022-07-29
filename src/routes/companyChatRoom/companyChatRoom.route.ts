import { Router } from 'express';
import companyChatController from '@controllers/companyChatRoom/companyChatRoom.controller';

const router: Router = Router();

router.post('/', companyChatController.createChatRoom);

export default router;
