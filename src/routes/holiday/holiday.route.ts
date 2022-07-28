import { Router } from 'express';
import holidayController from '@controllers/holiday/holiday.controller';

const router: Router = Router();

router.post('/', holidayController.createHoliday);

export default router;
