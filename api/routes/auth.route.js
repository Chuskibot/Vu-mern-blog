import express from 'express'
import { singup } from '../controllers/auth.controller.js';
import { singin } from '../controllers/auth.controller.js';
import { google } from '../controllers/auth.controller.js';

const  router = express.Router();

router.post('/signup', singup);
router.post('/signin', singin);
router.post('/google', google);


export default router;