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
  check("cc", "La cedula es un campo requerido").not().isEmpty(),
  check("cc").isLength({ min: 6 }).withMessage("La cedula debe tener al menos 6 dígitos"),
  check("cc").isLength({ max: 15 }).withMessage("La cedula debe tener máximo 15 dígitos"),
  check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
  check("telefono").matches(/^\d{8,15}$/).withMessage("El teléfono debe tener entre 8 y 15 dígitos numéricos"),validarResultados

], crearCliente);
router.put("/estado/:id", actualizarestado);
router.put('/:id', [
  check("nombre", "El nombre es un campo requerido").not().isEmpty(),
  check("nombre").matches(/^[a-zA-Z\s]*$/).withMessage("El nombre solo debe contener letras y espacios"),
  check("apellido", "El apellido es un campo requerido").not().isEmpty(),
  check("apellido").matches(/^[a-zA-Z\s]*$/).withMessage("El apellido solo debe contener letras y espacios"),
  check("cc", "La cedula es un campo requerido").not().isEmpty(),
  check("cc").isLength({ min: 6 }).withMessage("La cedula debe tener al menos 6 dígitos"),
  check("cc").isLength({ max: 15 }).withMessage("La cedula debe tener máximo 15 dígitos"),
  check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
  check("telefono").matches(/^\d{8,15}$/).withMessage("El teléfono debe tener entre 8 y 15 dígitos numéricos"),validarResultados

], actualizarCliente);
router.delete('/:id', eliminarCliente);

export default router;
