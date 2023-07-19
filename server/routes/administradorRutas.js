import express from 'express';
import {
    obtenerAdministradorRutas,
    crearAdministradorRutas,
    eliminarAdministradorRutas
} from '../controllers/administradorRutas.js';

const router = express.Router();

// Ruta para obtener el administrador de rutas
router.get('/', obtenerAdministradorRutas);

// Ruta para crear el administrador de rutas
router.post('/', crearAdministradorRutas);

// Ruta para eliminar el administrador de rutas
router.delete('/', eliminarAdministradorRutas);

export default router;
