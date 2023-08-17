import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
  obtenerTickets,
  obtenerTicket,
  obtenerAsientosVendidos,
  crearTicket,
  actualizarTicket,
  eliminarTicket
} from '../controllers/tiket.js';

const router = express.Router();

// Rutas para los tickets
router.get('/', obtenerTickets);
router.get('/:id', obtenerTicket);
router.get('/asientos-vendidos/:rutaId/:fechaVenta', obtenerAsientosVendidos);
router.post('/', crearTicket);

router.put('/:id', actualizarTicket);

router.delete('/:id', eliminarTicket);

export default router;
