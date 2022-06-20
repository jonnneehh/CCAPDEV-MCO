import { Router } from "express";
import upload from "../middlewares/upload.js";

import controller from "../controllers/controller.js";
import postController from "../controllers/postController.js";
import settingsController from '../controllers/settingsController.js';
import profileController from "../controllers/profileController.js";

import loginCont from '../controllers/loginController.js'
import registerCont from '../controllers/registerController.js'

const router = Router();

router.get('/favicon.ico', controller.getFavicon);
router.get('/', controller.getIndex);

router.post("/addpost", upload.single("content"), postController.postPost);
router.get("/addpost", postController.getPost);

router.get("/profile", profileController.getProfile);

router.get("/settings", settingsController.getSettings);
router.get("/changeUsername", settingsController.changeUsername);
router.get("/changePassword", settingsController.changePassword);
router.get("/changeEmail", settingsController.changeEmail);
router.get("/changeAbout", settingsController.changeAbout);
router.get("/checkPassword", settingsController.checkPassword);


router.get("/login", loginCont.getLogin);
router.post("/login", loginCont.loginUser);

router.get("/register", registerCont.getRegister);
router.post("/register", registerCont.addUser);
router.get("/findUser", registerCont.findUser);

export default router;
