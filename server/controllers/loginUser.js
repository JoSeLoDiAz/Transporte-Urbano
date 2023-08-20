import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Administrador from '../models/administrador.js';
import AdministradorRutas from '../models/administradorRutas.js';
import Vendedor from '../models/vendedor.js';

const iniciarSesion = async (req, res) => {

  const { email, password } = req.body;
  try {
    let user = null;
    let userType = null;

    // Verificar si el usuario es un Administrador
    user = await Administrador.findOne({ email });
    if (user) {
      userType = 'Administrador';
    } else {
      // Verificar si el usuario es un Administrador de Rutas
      user = await AdministradorRutas.findOne({ email });
      if (user) {
        userType = 'AdministradorRutas';
      } else {
        // Verificar si el usuario es un Vendedor
        user = await Vendedor.findOne({ email });
        if (user) {
          userType = 'Vendedor';
        }
      }
    }

    // Si no se encuentra ningún usuario con el email proporcionado, retornar error
    if (!user) {
      return res.status(401).json({ msg: 'Credenciales inválidas usuario no encontrado' });
    }

    // Verificar las credenciales del usuario en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Credenciales inválidas revisa la contraseña' });
    }

    // Si las credenciales son válidas, generar el token JWT usando la clave privada del archivo .env
    const token = jwt.sign(
      { userId: user._id, userType: userType },
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: '1h' }
    );
    res.json({ msg: 'Inicio de sesión exitoso.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

export { iniciarSesion };
