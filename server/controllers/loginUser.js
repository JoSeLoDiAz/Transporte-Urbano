import { generarJWT } from '../middleware/jwtUtils.js';
import Administrador from '../models/administrador.js';
import AdministradorRutas from '../models/administradorRutas.js';
import Vendedor from '../models/vendedor.js';

const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;
    let userType = null;

    // Verificar si el usuario es un Administrador
    user = await Administrador.findOne({ correo: email });
    if (user) {
      userType = 'Administrador';
    } else {
      // Verificar si el usuario es un Administrador de Rutas
      user = await AdministradorRutas.findOne({ correo: email });
      if (user) {
        userType = 'AdministradorRutas';
      } else {
        // Verificar si el usuario es un Vendedor
        user = await Vendedor.findOne({ correo: email });
        if (user) {
          userType = 'Vendedor';
        }
      }
    }

    // Si no se encuentra ningún usuario con el correo proporcionado, retornar error
    if (!user) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar las credenciales del usuario en la base de datos
    if (!(await user.validarContraseña(password))) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Si las credenciales son válidas, generar el token JWT
    const token = await generarJWT(user._id, userType);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

export { iniciarSesion };
