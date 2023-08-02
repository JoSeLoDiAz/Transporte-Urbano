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

router.use('/rutas', rutaRouter);
router.use('/clientes', clienteRouter);
router.use('/tikets', tiketRouter);
router.use('/vehiculos', vehiculoRouter);
router.use('/admin', adminRouter);
router.use('/adminRutas', adminrutasRouter);
router.use('/conductores', conductorRouter);
router.use('/vendedores', vendedorRouter);

router.use('/loginUser',  loginUserRouter);

export default router;
