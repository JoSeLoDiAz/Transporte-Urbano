import Conductor from '../models/conductor.js';

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

//actualizar estado conductor
export const actualizarestado = async (req, res) => {

  const id = req.params.id
  // console.log(`estado actualizado ${id}`);

  const actualizado = {
    estado: req.body.estado
  }

  try {
    const conductorActualizado = await Conductor.findByIdAndUpdate(id, actualizado);

    if (conductorActualizado) {
      console.log(conductorActualizado);
      res.status(200).json(conductorActualizado);
    } else {
      res.status(404).json({ error: 'conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el conductor.', error });
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
