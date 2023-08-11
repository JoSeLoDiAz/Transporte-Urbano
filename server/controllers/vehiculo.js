import Vehiculo from '../models/vehiculo.js';
import Conductor from '../models/conductor.js';

export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate('cedula_conductor', 'nombre');
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los vehículos.' });
  }
};

export const obtenerVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id).populate('cedula_conductor', 'nombre');
    if (vehiculo) {
      res.status(200).json(vehiculo);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el vehículo.' });
  }
};

export const crearVehiculo = async (req, res) => {
  try {
    const { numero_autobus, numero_licencia_transito, ...otrosDatos } = req.body;

    // Verificar si ya existe un vehículo con el mismo número de autobús
    const vehiculoExistente = await Vehiculo.findOne({ numero_autobus });
    if (vehiculoExistente) {
      return res.status(400).json({ error: 'Ya existe un vehículo con este número de autobús.' });
    }
    // Verificar si ya existe un vehículo con el mismo número de licencia de tránsito
    if (numero_licencia_transito) {
      const vehiculoExistenteNumeroLicenciaTransito = await Vehiculo.findOne({ numero_licencia_transito });
      if (vehiculoExistenteNumeroLicenciaTransito) {
        return res.status(400).json({ error: 'Ya existe un vehículo con este número de licencia de tránsito.' });
      }
    }
    // Verificar si ya existe un vehículo con la misma cédula de conductor
    if (cedula_conductor) {
      const vehiculoConductorExistente = await Vehiculo.findOne({ cedula_conductor });
      if (vehiculoConductorExistente) {
        return res.status(400).json({ error: 'Ya existe un vehículo con esta cédula de conductor.' });
      }
    }

    // Verificar otras validaciones para los demás datos, por ejemplo:
    // - Verificar duplicados de otro campo si es necesario

    const nuevoVehiculo = new Vehiculo({ numero_autobus, cedula_conductor, ...otrosDatos });
    const vehiculoCreado = await nuevoVehiculo.save();

    res.status(201).json(vehiculoCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el vehículo.' });
  }
};

export const actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_autobus, cedula_conductor, ...datosVehiculo } = req.body;

    if (numero_autobus) {
      const vehiculoExistente = await Vehiculo.findOne({ numero_autobus, _id: { $ne: id } });
      if (vehiculoExistente) {
        return res.status(400).json({ error: 'Ya existe un vehículo con este número de autobús.' });
      }
    }

    if (cedula_conductor) {
      const vehiculoExistente = await Vehiculo.findOne({ cedula_conductor, _id: { $ne: id } });
      if (vehiculoExistente) {
        return res.status(400).json({ error: 'Ya existe un vehículo con esta cédula de conductor.' });
      }

      const conductor = await Conductor.findOne({ cedula: cedula_conductor });
      if (conductor) {
        datosVehiculo.cedula_conductor = conductor._id;
      }
    }

    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, datosVehiculo, { new: true });
    if (vehiculoActualizado) {
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el vehículo.' });
  }
};

//actualizar estado vehiculo
export const actualizarestado = async (req, res) => {

  const id = req.params.id
  // console.log(`estado actualizado ${id}`);

  const actualizado = {
    estado: req.body.estado
  }

  try {
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, actualizado);

    if (vehiculoActualizado) {
      console.log(vehiculoActualizado);
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'vehiculo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el vehiculo.', error });
  }
};

export const eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(id);
    if (vehiculoEliminado) {
      res.status(200).json(vehiculoEliminado);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el vehículo.' });
  }
};

export const actualizarVencimientoSeguro = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_vencimiento_seguro } = req.body;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      id,
      { fecha_vencimiento_seguro },
      { new: true }
    );
    if (vehiculoActualizado) {
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la fecha de vencimiento del seguro.' });
  }
};
export const actualizarNumeroLicenciaTransito = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_licencia_transito } = req.body;

    // Verificar si el número de licencia de tránsito ya está en uso por otro vehículo
    const vehiculoExistente = await Vehiculo.findOne({ numero_licencia_transito, _id: { $ne: id } });
    if (vehiculoExistente) {
      return res.status(400).json({ error: 'Este número de licencia de tránsito ya está en uso por otro vehículo.' });
    }

    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      id,
      { numero_licencia_transito },
      { new: true }
    );

    if (vehiculoActualizado) {
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el número de licencia de tránsito.' });
  }
};