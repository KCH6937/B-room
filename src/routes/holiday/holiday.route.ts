import { Router } from 'express';
import holidayController from '@controllers/holiday/holiday.controller';

const router: Router = Router();

router.get('/', holidayController.getAllHoliday);
router.post('/', holidayController.createHoliday);
router.patch('/:id', holidayController.updateHoliday);
router.delete('/:id', holidayController.deleteHoliday);

export default router;
