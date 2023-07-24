import express from "express";
import rutaRouter from "./ruta.js";
import clienteRouter from "./cliente.js";
import tiketRouter from "./tiket.js";
import vehiculoRouter from "./vehiculo.js";
import conductorRouter from "./conductor.js";
import adminRouter from "./administrador.js";
import adminrutasRouter from "./administradorRutas.js";
import vendedorRouter from "./vendedor.js";
import loginUser from "./loginUser.js";

import { validarJWT } from '../middleware/validar-jwj.js';

const router = express.Router();

router.use("/rutas", rutaRouter);
router.use("/clientes", clienteRouter);
router.use("/tikets", tiketRouter);
router.use("/vehiculos", vehiculoRouter);
router.use("/admin", validarJWT, adminRouter);
router.use("/adminRutas", validarJWT, adminrutasRouter);
router.use("/conductores", conductorRouter);
router.use("/vendedores", validarJWT, vendedorRouter);

router.use("/loginUser.js", loginUser); // Agrege el router de autenticación

export default router;
