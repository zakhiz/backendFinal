import {Router} from 'express';
import sessionsController from '../controller/sessions.controller.js';
import upload from '../services/upload.js';

const router = Router();

router.get('/logout',sessionsController.logout);

router.post('/login',sessionsController.login);
router.post('/register',upload.single('image'), sessionsController.register);


export default router;
