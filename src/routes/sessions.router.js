import {Router} from 'express';
import sessionsController from '../controller/sessions.controller.js';
import upload from '../services/upload.js';

const router = Router();

router.get('/logout',sessionsController.logout); //! Desloguea al usuario
router.get('/:data',sessionsController.DataUser) //! envia un usuario en particular

router.post('/login',sessionsController.login); //! loguea al usuario
router.post('/register',upload.single('image'), sessionsController.register); //! registra al usuario


export default router;
