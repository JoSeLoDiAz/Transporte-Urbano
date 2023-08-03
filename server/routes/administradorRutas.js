import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
    obtenerAdministradorRutas,
    crearAdministradorRutas,
    editarAdministradorRutas,
    eliminarAdministradorRutas
} from '../controllers/administradorRutas.js';


const router = express.Router();

// Ruta para obtener el administrador de rutas
router.get('/', obtenerAdministradorRutas);

// Ruta para crear el administrador de rutas
router.post('/', [
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty().isEmail(),
    check("email").isLength({ max: 100 }).withMessage("El email debe tener máximo 100 caracteres"),
    check("password", "La contraseña es un campo requerido").not().isEmpty(),
    check("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage("La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número"), validarResultados
], crearAdministradorRutas);

// Ruta para editar el administrador de rutas
router.put('/:id', [
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty().isEmail(),
    check("email").isLength({ max: 100 }).withMessage("El email debe tener máximo 100 caracteres"),
    check("password", "La contraseña es un campo requerido").not().isEmpty(),
    check("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage("La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número"), validarResultados
], editarAdministradorRutas);

// Ruta para eliminar el administrador de rutas
router.delete('/:id', eliminarAdministradorRutas);

export default router;
