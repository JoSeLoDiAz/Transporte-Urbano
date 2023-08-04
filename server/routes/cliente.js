import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
  getClientes,
  getCliente,
  crearCliente,
  actualizarCliente,
  actualizarestado,
  eliminarCliente
} from '../controllers/cliente.js';


const router = express.Router();

// Rutas para los clientes
router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', [
  check("nombre", "El nombre es un campo requerido").not().isEmpty(),
  check("nombre").matches(/^[a-zA-Z\s]*$/).withMessage("El nombre solo debe contener letras y espacios"),
  check("apellido", "El apellido es un campo requerido").not().isEmpty(),
  check("apellido").matches(/^[a-zA-Z\s]*$/).withMessage("El apellido solo debe contener letras y espacios"),
  check("cc", "El número de cédula es un campo requerido").not().isEmpty(),
  check("cc").isLength({ min: 8 }).withMessage("El número de cédula debe tener al menos 8 dígitos"),
  check("cc").isLength({ max: 15 }).withMessage("El número de cédula debe tener máximo 15 dígitos"),
  check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
  check("telefono").matches(/^\d{10}$/).withMessage("El teléfono debe tener exactamente 10 dígitos numéricos")
], crearCliente);
router.put("/estado/:id", actualizarestado);
router.put('/:id', [
  check("nombre", "El nombre es un campo requerido").not().isEmpty(),
  check("nombre").matches(/^[a-zA-Z\s]*$/).withMessage("El nombre solo debe contener letras y espacios"),
  check("apellido", "El apellido es un campo requerido").not().isEmpty(),
  check("apellido").matches(/^[a-zA-Z\s]*$/).withMessage("El apellido solo debe contener letras y espacios"),
  check("cc", "El número de cédula es un campo requerido").not().isEmpty(),
  check("cc").isLength({ min: 8 }).withMessage("El número de cédula debe tener al menos 8 dígitos"),
  check("cc").isLength({ max: 15 }).withMessage("El número de cédula debe tener máximo 15 dígitos"),
  check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
  check("telefono").matches(/^\d{10}$/).withMessage("El teléfono debe tener exactamente 10 dígitos numéricos")
], actualizarCliente);
router.delete('/:id', eliminarCliente);

export default router;
