import { Router } from "express";
import startCont from '../controllers/startController.js'
import loginCont from '../controllers/loginController.js'
import registerCont from '../controllers/registerController.js'
import homepageCont from '../controllers/homepageController.js'
import settingsCont from '../controllers/settingsController.js'
import postsCont from '../controllers/postsController.js'


const router = Router();

//Navigation
router.get('/', startCont.getIndex); //This shows login.hbs
router.get('/register', loginCont.getRegister);
router.get('/login', registerCont.getLogin);

//For registering
router.get('/addUser', registerCont.addUser);
router.get('/findUser', registerCont.findUser);

//For login
router.get('/loginUser', loginCont.loginUser);
router.get('/home', loginCont.getHome);

export default router;