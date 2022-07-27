import { Router } from 'express';
import departmentController from '@controllers/department/department.controller';

const router: Router = Router();

router.post('/', departmentController.createDepartment);
router.patch('/:id', departmentController.updateDepartment);

export default router;
