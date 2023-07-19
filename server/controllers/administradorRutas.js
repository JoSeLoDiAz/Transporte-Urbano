import AdministradorRutas from '../models/administradorRutas.js';

// Obtener el administrador de rutas
export const obtenerAdministradorRutas = async (req, res) => {
  try {
    const administradorRutas = await AdministradorRutas.findOne();
    if (administradorRutas) {
      res.status(200).json(administradorRutas);
    } else {
      res.status(404).json({ error: 'Administrador de Rutas no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el administrador de rutas.' });
  }
};

// Crear el administrador de rutas
export const crearAdministradorRutas = async (req, res) => {
  try {
    const administradorRutasExistente = await AdministradorRutas.findOne();
    if (administradorRutasExistente) {
      res.status(400).json({ error: 'Ya existe un administrador de rutas registrado.' });
    } else {
      const nuevoAdministradorRutas = new AdministradorRutas(req.body);
      const administradorRutasCreado = await nuevoAdministradorRutas.save();
      res.status(201).json(administradorRutasCreado);
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el administrador de rutas.' });
  }
};

// Eliminar el administrador de rutas
export const eliminarAdministradorRutas = async (req, res) => {
  try {
    const administradorRutasEliminado = await AdministradorRutas.findOneAndDelete();
    if (administradorRutasEliminado) {
      res.status(200).json(administradorRutasEliminado);
    } else {
      res.status(404).json({ error: 'Administrador de Rutas no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el administrador de rutas.' });
  }
};
