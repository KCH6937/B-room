import { Router } from 'express';
import companyNoticeController from '@controllers/companyNotice/companyNotice.controller';
import auth from '@middlewares/auth.middlewares';

const router: Router = Router();

// todo : validation 기능 필요
router.post('/', auth.isAuthority, companyNoticeController.createNotice);
router.patch('/:id', auth.isAuthority, companyNoticeController.updateNotice);
router.delete('/:id', auth.isAuthority, companyNoticeController.deleteNotice);
router.get('/', companyNoticeController.getNotices);
router.get('/:id', companyNoticeController.getNotice);

export default router;
