import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
    obtenerAdministrador,
    crearAdministrador,
    editarAdministrador,
    eliminarAdministrador
} from '../controllers/administrador.js';

const router = express.Router();

// Ruta para obtener el administrador
router.get('/', obtenerAdministrador);

// Ruta para crear el administrador
router.post('/', [
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty().isEmail(),
    check("email").isLength({ max: 100 }).withMessage("El email debe tener máximo 100 caracteres"),
    check("password", "La contraseña es un campo requerido").not().isEmpty(),
    check("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage("La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número"), validarResultados
], crearAdministrador);

// Ruta para editar el administrador
router.put('/', [
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty().isEmail(),
    check("email").isLength({ max: 100 }).withMessage("El email debe tener máximo 100 caracteres"),
    check("password", "La contraseña es un campo requerido").not().isEmpty(),
    check("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage("La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número"), validarResultados
], editarAdministrador);


// Ruta para eliminar el administrador
router.delete('/', eliminarAdministrador);

export default router;
