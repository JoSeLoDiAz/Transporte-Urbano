import express from 'express';
import {
    getVendedores,
    getVendedor,
    crearVendedor,
    actualizarVendedor,
    eliminarVendedor
} from '../controllers/vendedor.js';

const router = express.Router();

// Rutas para los vendedores
router.get('/', getVendedores);
router.get('/:id', getVendedor);
router.post('/', crearVendedor);
router.put('/:id', actualizarVendedor);
router.delete('/:id', eliminarVendedor);

export default router;
