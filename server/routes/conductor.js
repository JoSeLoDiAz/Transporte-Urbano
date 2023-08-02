import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
  obtenerConductores,
  obtenerConductor,
  crearConductor,
  actualizarConductor,
  eliminarConductor
} from '../controllers/conductor.js';


const router = express.Router();

// Rutas para los conductores
router.get('/', obtenerConductores);
router.get('/:id', obtenerConductor);

router.post('/', [
  check("nombre", "El nombre es un campo requerido").not().isEmpty(),
  check("cedula", "El número de cédula es un campo requerido").not().isEmpty(),
  check("cedula").isLength({ min: 8 }).withMessage("El número de cédula debe tener al menos 8 dígitos"),
  check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
  check("direccion", "La dirección es un campo requerido").not().isEmpty(),
  check("clase_pase", "La clase de pase es un campo requerido").not().isEmpty(),
  check("vigencia_pase", "La vigencia de pase es un campo requerido").not().isEmpty(), validarResultados
], crearConductor);

router.put('/:id', [
  check("nombre", "El nombre es un campo requerido").not().isEmpty(),
  check("cedula", "El número de cédula es un campo requerido").not().isEmpty(),
  check("cedula").isLength({ min: 8 }).withMessage("El número de cédula debe tener al menos 8 dígitos"),
  check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
  check("direccion", "La dirección es un campo requerido").not().isEmpty(),
  check("clase_pase", "La clase de pase es un campo requerido").not().isEmpty(),
  check("vigencia_pase", "La vigencia de pase es un campo requerido").not().isEmpty(), validarResultados
], actualizarConductor);

router.delete('/:id', eliminarConductor);

export default router;
