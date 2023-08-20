import Ruta from '../models/ruta.js';
import { check, validationResult } from 'express-validator';

// Obtener todas las rutas
export const obtenerRutas = async (req, res) => {
  try {
    const rutas = await Ruta.find();
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las rutas.' });
  }
};

// Obtener una ruta por su ID
export const obtenerRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const ruta = await Ruta.findById(id);
    if (ruta) {
      res.status(200).json(ruta);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la ruta.' });
  }
};

// Crear una nueva ruta
export const crearRuta = async (req, res) => {
  try {
    const nuevaRuta = new Ruta(req.body);
    const rutaCreada = await nuevaRuta.save();
    res.status(201).json(rutaCreada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la ruta.' });
  }
};

// Actualizar una ruta existente
export const actualizarRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const rutaActualizada = await Ruta.findByIdAndUpdate(id, req.body, { new: true });
    if (rutaActualizada) {
      res.status(200).json(rutaActualizada);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la ruta.' });
  }
};

//actualizar estado ruta
export const actualizarestado = async (req, res) => {

  const id = req.params.id

  const actualizado = {
    estado: req.body.estado
  }

  try {
    const rutaActualizado = await Ruta.findByIdAndUpdate(id, actualizado);

    if (rutaActualizado) {
      res.status(200).json(rutaActualizado);
    } else {
      res.status(404).json({ error: 'ruta no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el ruta.', error });
  }
};

// Eliminar una ruta
export const eliminarRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const rutaEliminada = await Ruta.findByIdAndDelete(id);
    if (rutaEliminada) {
      res.status(200).json(rutaEliminada);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la ruta.' });
  }
};
// Controlador para obtener los horarios de una ruta
export const obtenerHorarios = async (req, res) => {
  try {
    const { id } = req.params;
    const ruta = await Ruta.findById(id);
    if (ruta) {
      const horarios = ruta.horarios;
      res.status(200).json(horarios);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener los horarios.' });
  }
};

// Controlador para agregar un horario a una ruta
export const agregarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { horario } = req.body;
    const ruta = await Ruta.findById(id);
    if (ruta) {
      ruta.horarios.push(horario);
      const rutaActualizada = await ruta.save();
      res.status(200).json(rutaActualizada);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo agregar el horario.' });
  }
};

// Controlador para actualizar un horario de una ruta
export const actualizarHorario = async (req, res) => {
  try {
    const { id, horarioId } = req.params;
    const { nuevoHorario } = req.body;
    const ruta = await Ruta.findById(id);
    if (ruta) {
      const horarioIndex = ruta.horarios.findIndex((horario) => horario._id.toString() === horarioId);
      if (horarioIndex !== -1) {
        ruta.horarios[horarioIndex] = nuevoHorario;
        const rutaActualizada = await ruta.save();
        res.status(200).json(rutaActualizada);
      } else {
        res.status(404).json({ error: 'Horario no encontrado.' });
      }
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el horario.' });
  }
};

// Controlador para eliminar un horario de una ruta
export const eliminarHorario = async (req, res) => {
  try {
    const { id, horarioId } = req.params;
    const ruta = await Ruta.findById(id);
    if (ruta) {
      ruta.horarios = ruta.horarios.filter((horario) => horario._id.toString() !== horarioId);
      const rutaActualizada = await ruta.save();
      res.status(200).json(rutaActualizada);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el horario.' });
  }
};

// Controlador para obtener el tiempo estimado de viaje de una ruta
export const obtenerTiempoEstimadoViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const ruta = await Ruta.findById(id);
    if (ruta) {
      const tiempoEstimadoViaje = ruta.tiempo_estimado_viaje;
      res.status(200).json({ tiempoEstimadoViaje });
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el tiempo estimado de viaje.' });
  }
};

// Controlador para actualizar el tiempo estimado de viaje de una ruta
export const actualizarTiempoEstimadoViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevoTiempoEstimado } = req.body;
    const ruta = await Ruta.findById(id);
    if (ruta) {
      ruta.tiempo_estimado_viaje = nuevoTiempoEstimado;
      const rutaActualizada = await ruta.save();
      res.status(200).json(rutaActualizada);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el tiempo estimado de viaje.' });
  }
};