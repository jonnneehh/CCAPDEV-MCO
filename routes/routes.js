import { Router } from "express";
import startCont from '../controllers/startController.js'

const router = Router();

router.get('/', startCont.getIndex);

export default router;