import Conductor from '../models/conductor.js';
import { check, validationResult } from 'express-validator';

// Obtener todos los conductores
export const obtenerConductores = async (req, res) => {
  try {
    const conductores = await Conductor.find();
    res.status(200).json(conductores);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los conductores.' });
  }
};

// Obtener un conductor por su ID
export const obtenerConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const conductor = await Conductor.findById(id);
    if (conductor) {
      res.status(200).json(conductor);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el conductor.' });
  }
};

// Crear un nuevo conductor
export const crearConductor = async (req, res) => {
  try {
    // Definir las reglas de validación utilizando express-validator
    const validarCrearConductor = [
      check('nombre').notEmpty().withMessage('El nombre del conductor es obligatorio'),
      check('licencia').notEmpty().withMessage('El número de licencia es obligatorio'),
      check('edad').notEmpty().withMessage('La edad del conductor es obligatoria').isInt({ min: 18 }).withMessage('La edad del conductor debe ser mayor o igual a 18'),
      check('experiencia').notEmpty().withMessage('La experiencia del conductor es obligatoria').isInt({ min: 0 }).withMessage('La experiencia del conductor no puede ser negativa'),
    ];

    // Ejecutar las validaciones
    await Promise.all(validarCrearConductor.map(validation => validation.run(req)));

    // Manejar los resultados de las validaciones
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const nuevoConductor = new Conductor(req.body);
    const conductorCreado = await nuevoConductor.save();
    res.status(201).json(conductorCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el conductor.' });
  }
};

// Actualizar un conductor existente
export const actualizarConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const conductorActualizado = await Conductor.findByIdAndUpdate(id, req.body, { new: true });
    if (conductorActualizado) {
      res.status(200).json(conductorActualizado);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el conductor.' });
  }
};

// Eliminar un conductor
export const eliminarConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const conductorEliminado = await Conductor.findByIdAndDelete(id);
    if (conductorEliminado) {
      res.status(200).json(conductorEliminado);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el conductor.' });
  }
};
