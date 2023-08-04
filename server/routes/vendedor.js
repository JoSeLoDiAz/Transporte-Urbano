import express from 'express';
import { check } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';
import {
    getVendedores,
    getVendedor,
    crearVendedor,
    actualizarVendedor,
    actualizarestado,
    eliminarVendedor
} from '../controllers/vendedor.js';

const router = express.Router();

// Rutas para los vendedores
router.get('/', getVendedores);
router.get('/:id', getVendedor);

router.post('/', [
    check("cc").isLength({ min: 8 }).withMessage("El número de cédula debe tener al menos 8 dígitos"),
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty(),
    check("email", "El email debe ser válido").isEmail(),
    check("password", "La contraseña es un campo requerido").not().isEmpty(), validarResultados
], crearVendedor);
router.put("/estado/:id", actualizarestado);
router.put('/:id', [
    check("cc").isLength({ min: 8 }).withMessage("El número de cédula debe tener al menos 8 dígitos"),
    check("nombre", "El nombre es un campo requerido").not().isEmpty(),
    check("telefono", "El teléfono es un campo requerido").not().isEmpty(),
    check("email", "El email es un campo requerido").not().isEmpty(),
    check("email", "El email debe ser válido").isEmail(),
    check("password", "La contraseña es un campo requerido").not().isEmpty(), validarResultados
], actualizarVendedor);

router.delete('/:id', eliminarVendedor);

export default router;
