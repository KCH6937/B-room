import { Router } from 'express';
import companyChatController from '@controllers/companyChatRoom/companyChatRoom.controller';

const router: Router = Router();

router.post('/', companyChatController.createChatRoom); //TODO: jwt middleware 추가 필요

export default router;
