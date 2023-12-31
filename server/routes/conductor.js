import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
  obtenerConductores,
  obtenerConductor,
  crearConductor,
  actualizarConductor,
  actualizarestado,
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
  check("telefono").isLength({ min: 8 }).withMessage("El número de telefono debe tener al menos 8 dígitos"),
  check("telefono").isLength({ max: 15 }).withMessage("El número de teléfono debe tener máximo 15 caracteres"),
  check("direccion", "La dirección es un campo requerido").not().isEmpty(),
  check("direccion").isLength({ max: 255 }).withMessage("La dirección debe tener máximo 255 caracteres"),
  check("numero_licencia", "El numero de licencia es un campo requerido").not().isEmpty(),
  check("numero_licencia").isLength({ max: 25 }).withMessage("El numero de licencia debe tener máximo 25 caracteres"),
  check("clase_pase", "La clase de pase es un campo requerido").not().isEmpty(),
  check("clase_pase")
    .isIn(["B2", "C1"])
    .withMessage("El pase debe ser para operar servicio público y estar en las categorías B2 o C1"),
  check("vigencia_pase", "La vigencia de pase es un campo requerido").not().isEmpty(),
  check("vigencia_pase").isDate().withMessage("La vigencia de pase debe ser una fecha válida"), validarResultados
], crearConductor);

router.put("/estado/:id", actualizarestado);
router.put('/:id', [
  check("nombre", "El nombre es un campo requerido").not().isEmpty(),
  check("cedula", "El número de cédula es un campo requerido").not().isEmpty(),
  check("cedula").isLength({ min: 8 }).withMessage("El número de cédula debe tener al menos 8 dígitos"),
  check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
  check("telefono").isLength({ min: 8 }).withMessage("El número de telefono debe tener al menos 8 dígitos"),
  check("telefono").isLength({ max: 15 }).withMessage("El número de teléfono debe tener máximo 15 caracteres"),
  check("direccion", "La dirección es un campo requerido").not().isEmpty(),
  check("direccion").isLength({ max: 255 }).withMessage("La dirección debe tener máximo 255 caracteres"),
  check("numero_licencia", "El numero de licencia es un campo requerido").not().isEmpty(),
  check("numero_licencia").isLength({ max: 255 }).withMessage("El numero de licencia debe tener máximo 25 caracteres"),
  check("clase_pase", "La clase de pase es un campo requerido").not().isEmpty(),

  check("clase_pase")
    .isIn(["B2", "C1"])
    .withMessage("El pase debe ser para operar servicio público y estar en las categorías B2 o C1"),
  check("vigencia_pase", "La vigencia de pase es un campo requerido").not().isEmpty(),
  check("vigencia_pase").isDate().withMessage("La vigencia de pase debe ser una fecha válida"), validarResultados
], actualizarConductor);

router.delete('/:id', eliminarConductor);

export default router;