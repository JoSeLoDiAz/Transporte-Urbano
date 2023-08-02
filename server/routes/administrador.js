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
router.get('/', [
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty().isEmail(),
    check("password", "La contraseña es un campo requerido").not().isEmpty(), validarResultados
], obtenerAdministrador);

// Ruta para crear el administrador
router.post('/', [
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty().isEmail(),
    check("password", "La contraseña es un campo requerido").not().isEmpty(), validarResultados
], crearAdministrador);

// Ruta para editar el administrador
router.put('/', editarAdministrador);

// Ruta para eliminar el administrador
router.delete('/', eliminarAdministrador);

export default router;
