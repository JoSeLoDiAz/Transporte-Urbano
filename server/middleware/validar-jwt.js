import jwt from "jsonwebtoken";

const validarJWT = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    // Verificar y decodificar el token utilizando la clave secreta
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Agregar la información del usuario decodificado a la solicitud para que esté disponible en las rutas protegidas
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export { validarJWT };
