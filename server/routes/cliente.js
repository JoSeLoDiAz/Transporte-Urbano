import express from 'express';
import {
  getClientes,
  getCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from '../controllers/cliente.js';

const router = express.Router();

// Rutas para los clientes
router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

export default router;
