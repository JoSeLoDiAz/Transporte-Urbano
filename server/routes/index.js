import express from 'express';
import rutaRouter from './ruta.js';
import clienteRouter from './cliente.js';
import tiketRouter from './tiket.js';
import vehiculoRouter from './vehiculo.js';
import conductorRouter from './conductor.js';
import adminRouter from './administrador.js';
import adminrutasRouter from './administradorRutas.js';
import vendedorRouter from './vendedor.js';
import loginUserRouter from './loginUser.js';
import { validarJWT } from '../middleware/validar-jwt.js';

const router = express.Router();

router.use('/rutas', validarJWT, rutaRouter);
router.use('/clientes', validarJWT, clienteRouter);
router.use('/tikets', validarJWT, tiketRouter);
router.use('/vehiculos', validarJWT, vehiculoRouter);
router.use('/admin', validarJWT, adminRouter);
router.use('/adminRutas', validarJWT, adminrutasRouter);
router.use('/conductores', validarJWT, conductorRouter);
router.use('/vendedores', validarJWT, vendedorRouter);

router.use('/loginUser',  loginUserRouter);

export default router;
