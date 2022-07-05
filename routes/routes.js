import { Router } from "express";
import auth from "../configs/auth.js";
import upload from "../middlewares/upload.js";

import controller from "../controllers/controller.js";
import postController from "../controllers/postController.js";
import settingsController from '../controllers/settingsController.js';
import profileController from "../controllers/profileController.js";
import upvoteController from "../controllers/upvoteController.js";

import loginCont from '../controllers/loginController.js'
import registerCont from '../controllers/registerController.js'
import searchController from "../controllers/searchController.js";

const router = Router();

router.get('/favicon.ico', controller.getFavicon);
router.get('/', controller.getIndex);

router.post("/addpost", upload.single("content"), postController.postPost);
router.get("/addpost", auth.ensureAuthenticated , postController.getPost);
router.get("/addComment", postController.addComment);

router.get("/addUpvote", upvoteController.addUpvote);
router.get("/removeUpvote", upvoteController.removeUpvote);
router.get("/addDownvote", upvoteController.addDownvote);
router.get("/removeDownvote", upvoteController.removeDownvote);

router.get("/profile/:username", auth.ensureAuthenticated, profileController.getUserProfile);

router.get("/settings", auth.ensureAuthenticated, settingsController.getSettings);
router.post("/username", auth.ensureAuthenticated, settingsController.changeUsername);
router.post("/password", auth.ensureAuthenticated, settingsController.changePassword);
router.get("/changeEmail", auth.ensureAuthenticated, settingsController.changeEmail);
router.get("/changeAbout", auth.ensureAuthenticated, settingsController.changeAbout);
router.post("/photo", upload.single("profilephoto"), settingsController.changePhoto);

router.get("/login", loginCont.getLogin);
router.post("/login", loginCont.loginUser);
router.get("/logout", auth.ensureAuthenticated, loginCont.logoutUser);

router.get("/register", registerCont.getRegister);
router.post("/register", registerCont.addUser);
router.get("/findUser", registerCont.findUser);

router.get("/searchUser", searchController.searchUser);
export default router;
