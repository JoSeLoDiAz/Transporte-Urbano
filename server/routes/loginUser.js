import express from 'express';
import { iniciarSesion } from '../controllers/loginUser.js';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/', [
    check("email", "El email no debe ir vacio").not().isEmpty(),
    check("email", "El email debe ser valido").isEmail(),
    check("password", "La contraseña es un campo requerido").not().isEmpty(), validarResultados
], iniciarSesion);

export default router;