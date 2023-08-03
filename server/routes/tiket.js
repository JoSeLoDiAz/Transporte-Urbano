import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
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

router.post('/', [
  check("numero_autobus", "El número de autobús es un campo requerido").not().isEmpty(),
  check("ccCliente", "La cédula del cliente es un campo requerido").not().isEmpty(),
  check("origen", "El origen es un campo requerido").not().isEmpty(),
  check("destino", "El destino es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto debe ser un número").isNumeric(),
  check("valor_puesto", "El valor del puesto es un campo requerido").not().isEmpty(),
  check("valor_puesto", "El valor del puesto debe ser un número").isNumeric(), validarResultados
], crearTicket);

router.put('/:id', [
  check("numero_autobus", "El número de autobús es un campo requerido").not().isEmpty(),
  check("ccCliente", "La cédula del cliente es un campo requerido").not().isEmpty(),
  check("origen", "El origen es un campo requerido").not().isEmpty(),
  check("destino", "El destino es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto debe ser un número").isNumeric(),
  check("valor_puesto", "El valor del puesto es un campo requerido").not().isEmpty(),
  check("valor_puesto", "El valor del puesto debe ser un número").isNumeric(), validarResultados
], actualizarTicket);

router.delete('/:id', eliminarTicket);

export default router;
