import { Router } from 'express';
import companyNoticeController from '@controllers/companyNotice/companyNotice.controller';

const router: Router = Router();

// todo : validation, authority 기능 필요
router.post('/', companyNoticeController.createNotice);
router.patch('/:id', companyNoticeController.updateNotice);

export default router;
