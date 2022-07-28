import { Router } from 'express';
import userController from '@controllers/user/user.controller';

const router: Router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/', userController.editUser);
router.patch('/', userController.deleteUser);

export default router;
