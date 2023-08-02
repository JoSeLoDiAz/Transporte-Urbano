import express from 'express';
import { check } from 'express-validator';
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
    check("correo", "El correo es un campo requerido").not().isEmpty().isEmail(),
    check("password", "La contraseña es un campo requerido").not().isEmpty(),
], crearAdministradorRutas);

// Ruta para editar el administrador de rutas
router.put('/:id', [
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("correo", "El correo es un campo requerido").not().isEmpty().isEmail(),
    check("password", "La contraseña es un campo requerido").not().isEmpty(),
], editarAdministradorRutas);

// Ruta para eliminar el administrador de rutas
router.delete('/:id', eliminarAdministradorRutas);

export default router;
