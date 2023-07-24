import jwt from "jsonwebtoken";
import { generarJWT } from "../middleware/jwtUtils.js";

const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Corregir el nombre de la función aquí
        let usuario = await generarJWT(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido" //- usuario no existe en la DB
            });
        }

        if (usuario.estado == 0) {
            return res.status(401).json({
                msg: "Token no válido" //- usuario con estado: false
            });
        }
        req.jwtUtils = usuario;

        next();

    } catch (error) {
        res.status(401).json({
            msg: "Token no válido"
        });
    }
}

export { validarJWT };