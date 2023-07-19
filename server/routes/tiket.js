import express from 'express';
import {
  obtenerTickets,
  obtenerTicket,
  crearTicket,
  actualizarTicket,
  eliminarTicket
} from '../controllers/tiket.js';

const router = express.Router();

// Rutas para los tickets
router.get('/', obtenerTickets);
router.get('/:id', obtenerTicket);
router.post('/', crearTicket);
router.put('/:id', actualizarTicket);
router.delete('/:id', eliminarTicket);

export default router;
