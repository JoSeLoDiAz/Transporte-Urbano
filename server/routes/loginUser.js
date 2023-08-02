import express from 'express';
import { iniciarSesion } from '../controllers/loginUser.js';

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/', iniciarSesion);

export default router;
