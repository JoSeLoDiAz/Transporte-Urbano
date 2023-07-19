import express from 'express';
import {
    obtenerAdministrador,
    crearAdministrador,
    eliminarAdministrador
} from '../controllers/administrador.js';

const router = express.Router();

// Ruta para obtener el administrador
router.get('/', obtenerAdministrador);

// Ruta para crear el administrador
router.post('/', crearAdministrador);

// Ruta para eliminar el administrador
router.delete('/', eliminarAdministrador);

export default router;
