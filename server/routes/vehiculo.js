import express from 'express';
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
router.post('/', crearVehiculo);
router.put('/:id', actualizarVehiculo);
router.delete('/:id', eliminarVehiculo);

// Ruta para actualizar la fecha de vencimiento del seguro de un vehículo
router.put('/:id/seguro', actualizarVencimientoSeguro);

// Ruta para actualizar el número de licencia de tránsito de un vehículo
router.put('/:id/licencia', actualizarNumeroLicenciaTransito);

export default router;
