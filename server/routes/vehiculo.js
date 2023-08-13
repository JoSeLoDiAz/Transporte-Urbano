import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
  obtenerNombreConductorPorCedula,
  obtenerVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  actualizarVehiculo,
  actualizarestado,
  eliminarVehiculo
} from '../controllers/vehiculo.js';

const router = express.Router();

// Rutas para los vehículos
router.get('/', obtenerVehiculos);

router.get('/:id', obtenerVehiculo);

// Ruta para obtener el nombre del conductor por cédula
router.get('/nombre_conductor/:cedula_conductor', [
  check('cedula_conductor', 'La cédula del conductor es requerida').notEmpty(),
  validarResultados
], obtenerNombreConductorPorCedula);

router.post('/', [
  check("matricula_vehiculo", "La matrícula del vehículo es un campo requerido").notEmpty(),
  check("matricula_vehiculo").isLength({ max: 8 }).withMessage("La matricula del vehiculo debe tener máximo 8 caracteres"),
  check("numero_autobus", "El número de autobús es un campo requerido").notEmpty(),
  check("numero_autobus").isLength({ max: 8 }).withMessage("El número de autobús debe tener máximo 8 caracteres"),
  check("numero_puestos", "El número de puestos es un campo requerido").notEmpty(),
  check("numero_puestos", "El número de puestos debe ser un número").isNumeric(),
  check("cedula_conductor", "Debe escojer a un conductor").notEmpty(),
  check("marca", "La marca del vehículo es un campo requerido").notEmpty(),
  check("modelo", "El modelo del vehículo es un campo requerido").notEmpty(),
  check("fecha_vencimiento_seguro", "La fecha de vencimiento del seguro es un campo requerido").notEmpty().isDate(),
  check("numero_licencia_transito", "El número de licencia de tránsito es un campo requerido").notEmpty(),
  validarResultados
], crearVehiculo);

router.put("/estado/:id", actualizarestado);

router.put('/:id', [
  check('id', 'ID de vehículo inválido').isMongoId(),
  check("matricula_vehiculo", "La matrícula del vehículo es un campo requerido").notEmpty(),
  check("matricula_vehiculo").isLength({ max: 8 }).withMessage("La matricula del vehiculo debe tener máximo 8 caracteres"),
  check("numero_autobus", "El número de autobús es un campo requerido").notEmpty(),
  check("numero_autobus").isLength({ max: 8 }).withMessage("El número de autobús debe tener máximo 8 caracteres"),
  check("numero_puestos", "El número de puestos es un campo requerido").notEmpty(),
  check("numero_puestos", "El número de puestos debe ser un número").isNumeric(),
  check("cedula_conductor", "Debe escojer a un conductor").notEmpty(),
  check("marca", "La marca del vehículo es un campo requerido").notEmpty(),
  check("modelo", "El modelo del vehículo es un campo requerido").notEmpty(),
  check("fecha_vencimiento_seguro", "La fecha de vencimiento del seguro es un campo requerido").notEmpty().isDate(),
  check("numero_licencia_transito", "El número de licencia de tránsito es un campo requerido").notEmpty(),
  validarResultados
], actualizarVehiculo);

router.delete('/:id', eliminarVehiculo);



export default router;