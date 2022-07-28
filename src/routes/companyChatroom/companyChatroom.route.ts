import { Router } from 'express';
import companyChatroomController from '@controllers/companyChatroom/companyChatroom.controller';

const router: Router = Router();

router.get('/', companyChatroomController.getChatroomsInfo);

export default router;
