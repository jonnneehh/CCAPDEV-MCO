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

router.get('/addUser', registerCont.addUser);
router.get('/findUser', registerCont.findUser);

router.get('/loginUser', loginCont.loginUser);

export default router;