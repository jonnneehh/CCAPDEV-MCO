import { Router } from "express";
import controller from '../controllers/controller.js'

const router = Router();

router.get('/', controller.getIndex);

export default router;