import express from 'express';
import {
  obtenerRutas,
  obtenerRuta,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
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
router.post('/', crearRuta);
router.put('/:id', actualizarRuta);
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
