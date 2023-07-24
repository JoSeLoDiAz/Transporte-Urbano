import loginUser from '../models/loginUser.js';
import { generarJWT } from '../middleware/jwtUtils.js';

const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar las credenciales del usuario en la base de datos
    const user = await loginUser.findOne({ email });

    if (!user || !user.validarContraseña(password)) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Si las credenciales son válidas, generar el token JWT
    const token = await generarJWT(user._id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

export { iniciarSesion };
