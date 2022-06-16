import { Router } from "express";
import startCont from '../controllers/startController.js'
import loginCont from '../controllers/loginController.js'
import registerCont from '../controllers/registerController.js'
import homepageCont from '../controllers/homepageController.js'
import settingsCont from '../controllers/settingsController.js'
import postsCont from '../controllers/postsController.js'


const router = Router();

router.get('/', startCont.getIndex);
router.get('/register', loginCont.getRegister);
router.get('/login', registerCont.getLogin);

router.get('/home', loginCont.getHome);

export default router;