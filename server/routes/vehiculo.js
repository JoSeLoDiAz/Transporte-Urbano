import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
  obtenerVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  actualizarVencimientoSeguro,
  actualizarNumeroLicenciaTransito
} from '../controllers/vehiculo.js';

const router = express.Router();

// Rutas para los vehículos
router.get('/', obtenerVehiculos);
router.get('/:id', obtenerVehiculo);

router.post('/', [
  check("numero_autobus", "El número de autobús es un campo requerido").not().isEmpty(),
  check("numero_autobus").isLength({ max: 6 }).withMessage("El número de autobús debe tener máximo 6 caracteres"),
  check("nombre_conductor", "El nombre del conductor es un campo requerido").not().isEmpty(),
  check("cedula_conductor", "La cédula del conductor es un campo requerido").not().isEmpty(),
  check("matricula_vehiculo", "La matrícula del vehículo es un campo requerido").not().isEmpty(),
  check("numero_puestos", "El número de puestos es un campo requerido").not().isEmpty(),
  check("numero_puestos", "El número de puestos debe ser un número").isNumeric(),
  check("marca", "La marca del vehículo es un campo requerido").not().isEmpty(),
  check("modelo", "El modelo del vehículo es un campo requerido").not().isEmpty(),
  check("fecha_vencimiento_seguro", "La fecha de vencimiento del seguro es un campo requerido").not().isEmpty().isDate(),
  check("numero_licencia_transito", "El número de licencia de tránsito es un campo requerido").not().isEmpty(), validarResultados
], crearVehiculo);

router.put('/:id', [
  check("numero_autobus", "El número de autobús es un campo requerido").not().isEmpty(),
  check("numero_autobus").isLength({ max: 6 }).withMessage("El número de autobús debe tener máximo 6 caracteres"),
  check("nombre_conductor", "El nombre del conductor es un campo requerido").not().isEmpty(),
  check("cedula_conductor", "La cédula del conductor es un campo requerido").not().isEmpty(),
  check("matricula_vehiculo", "La matrícula del vehículo es un campo requerido").not().isEmpty(),
  check("numero_puestos", "El número de puestos es un campo requerido").not().isEmpty(),
  check("numero_puestos", "El número de puestos debe ser un número").isNumeric(),
  check("marca", "La marca del vehículo es un campo requerido").not().isEmpty(),
  check("modelo", "El modelo del vehículo es un campo requerido").not().isEmpty(),
  check("fecha_vencimiento_seguro", "La fecha de vencimiento del seguro es un campo requerido").not().isEmpty().isDate(),
  check("numero_licencia_transito", "El número de licencia de tránsito es un campo requerido").not().isEmpty(), validarResultados
], actualizarVehiculo);

router.delete('/:id', eliminarVehiculo);

// Ruta para actualizar la fecha de vencimiento del seguro de un vehículo
router.put('/:id/seguro', [
  check("fecha_vencimiento_seguro", "La fecha de vencimiento del seguro es un campo requerido").not().isEmpty().isDate(), validarResultados
], actualizarVencimientoSeguro);

// Ruta para actualizar el número de licencia de tránsito de un vehículo
router.put('/:id/licencia', [
  check("numero_licencia_transito", "El número de licencia de tránsito es un campo requerido").not().isEmpty(), validarResultados
], actualizarNumeroLicenciaTransito);

export default router;
