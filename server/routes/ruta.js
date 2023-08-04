import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
  obtenerRutas,
  obtenerRuta,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
  actualizarestado,
  obtenerHorarios,
  agregarHorario,
  actualizarHorario,
  eliminarHorario,
  obtenerTiempoEstimadoViaje,
  actualizarTiempoEstimadoViaje
} from '../controllers/ruta.js';

const router = express.Router();

// Rutas para las rutas
router.get('/', obtenerRutas);
router.get('/:id', obtenerRuta);

router.post('/', [
  check("origen", "El origen es un campo requerido").not().isEmpty(),
  check("destino", "El destino es un campo requerido").not().isEmpty(),
  check("hora_salida", "La hora de salida es un campo requerido").not().isEmpty(),
  check("fecha_salida", "La fecha de salida es un campo requerido").not().isEmpty().isDate(),
  check("tiempo_estimado_viaje", "El tiempo estimado de viaje es un campo requerido").not().isEmpty(),
  check("descripcion", "La descripción es un campo requerido").not().isEmpty(),
  check("descripcion").isLength({ max: 255 }).withMessage("La descripción debe tener máximo 255 caracteres")
], crearRuta);
router.put("/estado/:id", actualizarestado);
router.put('/:id', [
  check("origen", "El origen es un campo requerido").not().isEmpty(),
  check("destino", "El destino es un campo requerido").not().isEmpty(),
  check("hora_salida", "La hora de salida es un campo requerido").not().isEmpty(),
  check("fecha_salida", "La fecha de salida es un campo requerido").not().isEmpty().isDate(),
  check("tiempo_estimado_viaje", "El tiempo estimado de viaje es un campo requerido").not().isEmpty(),
  check("descripcion", "La descripción es un campo requerido").not().isEmpty(),
  check("descripcion").isLength({ max: 255 }).withMessage("La descripción debe tener máximo 255 caracteres")
], actualizarRuta);

router.delete('/:id', eliminarRuta);

// Rutas para los horarios de una ruta específica
router.get('/:id/horarios', obtenerHorarios);
router.post('/:id/horarios', agregarHorario);
router.put('/:id/horarios/:horarioId', actualizarHorario);
router.delete('/:id/horarios/:horarioId', eliminarHorario);

// Rutas para el tiempo estimado de viaje de una ruta específica
router.get('/:id/tiempo-estimado-viaje', obtenerTiempoEstimadoViaje);
router.put('/:id/tiempo-estimado-viaje', actualizarTiempoEstimadoViaje);

export default router;
