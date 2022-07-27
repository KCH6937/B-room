import { Router } from 'express';
import departmentController from '@controllers/department/department.controller';

const router: Router = Router();

router.get('/', departmentController.getAllDepartment);
router.get('/:id', departmentController.getDepartment);
router.post('/', departmentController.createDepartment);
router.patch('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

export default router;
