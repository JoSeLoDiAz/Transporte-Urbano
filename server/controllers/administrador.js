import Administrador from '../models/administrador.js';

export const obtenerAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.findOne();
    if (administrador) {
      res.status(200).json(administrador);
    } else {
      res.status(404).json({ error: 'Administrador no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el administrador.' });
  }
};

export const crearAdministrador = async (req, res) => {
  try {
    const administradorExistente = await Administrador.findOne();
    if (administradorExistente) {
      res.status(400).json({ error: 'Ya existe un administrador registrado.' });
    } else {
      const nuevoAdministrador = new Administrador(req.body);
      const administradorCreado = await nuevoAdministrador.save();
      res.status(201).json(administradorCreado);
    }
  } catch (error) {
    if (error.code === 11000) {
      // Manejar el error de duplicados
      res.status(400).json({ error: 'Ya existe un administrador registrado con el mismo email.' });
    } else {
      // Manejar otros errores
      res.status(500).json({ error: 'No se pudo crear el administrador.' });
    }
  }
};

export const editarAdministrador = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const administradorExistente = await Administrador.findOne();
    if (!administradorExistente) {
      return res.status(404).json({ error: 'Administrador no encontrado.' });
    }
    
    administradorExistente.nombre = nombre;
    administradorExistente.email = email;
    administradorExistente.password = password;
    
    const administradorActualizado = await administradorExistente.save();
    res.status(200).json(administradorActualizado);
  } catch (error) {
    if (error.code === 11000) {
      // Manejar el error de duplicados
      res.status(400).json({ error: 'Ya existe un administrador registrado con el mismo email.' });
    } else {
      // Manejar otros errores
      res.status(500).json({ error: 'No se pudo actualizar el administrador.' });
    }
  }
};

export const eliminarAdministrador = async (req, res) => {
  try {
    const administradorEliminado = await Administrador.findOneAndDelete();
    if (administradorEliminado) {
      res.status(200).json(administradorEliminado);
    } else {
      res.status(404).json({ error: 'Administrador no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el administrador.' });
  }
};
