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
  check("nombre_compania", "El nombre de la compañía es un campo requerido").not().isEmpty(),
  check("numero_autobus", "El número de autobús es un campo requerido").not().isEmpty(),
  check("cedula_cliente", "La cédula del cliente es un campo requerido").not().isEmpty(),
  check("nombre_completo_cliente", "El nombre completo del cliente es un campo requerido").not().isEmpty(),
  check("nombre_conductor", "El nombre del conductor es un campo requerido").not().isEmpty(),
  check("origen", "El origen es un campo requerido").not().isEmpty(),
  check("destino", "El destino es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto debe ser un número").isNumeric(),
  check("valor_puesto", "El valor del puesto es un campo requerido").not().isEmpty(),
  check("valor_puesto", "El valor del puesto debe ser un número").isNumeric(),
  check("ruta", "La ruta es un campo requerido").not().isEmpty(),
  check("fecha_tiket", "La fecha del ticket es un campo requerido").not().isEmpty().isDate(),
  check("estado", "El estado del ticket es un campo requerido").not().isEmpty().isIn(["activo", "cancelado"]), validarResultados
], crearTicket);

router.put('/:id', [
  check("nombre_compania", "El nombre de la compañía es un campo requerido").not().isEmpty(),
  check("numero_autobus", "El número de autobús es un campo requerido").not().isEmpty(),
  check("cedula_cliente", "La cédula del cliente es un campo requerido").not().isEmpty(),
  check("nombre_completo_cliente", "El nombre completo del cliente es un campo requerido").not().isEmpty(),
  check("nombre_conductor", "El nombre del conductor es un campo requerido").not().isEmpty(),
  check("origen", "El origen es un campo requerido").not().isEmpty(),
  check("destino", "El destino es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto es un campo requerido").not().isEmpty(),
  check("numero_de_puesto", "El número de puesto debe ser un número").isNumeric(),
  check("valor_puesto", "El valor del puesto es un campo requerido").not().isEmpty(),
  check("valor_puesto", "El valor del puesto debe ser un número").isNumeric(),
  check("ruta", "La ruta es un campo requerido").not().isEmpty(),
  check("fecha_tiket", "La fecha del ticket es un campo requerido").not().isEmpty().isDate(),
  check("estado", "El estado del ticket es un campo requerido").not().isEmpty().isIn(["activo", "cancelado"]), validarResultados
], actualizarTicket);

router.delete('/:id', eliminarTicket);

export default router;
