import Vehiculo from '../models/vehiculo.js';
import Conductor from '../models/conductor.js';

export const obtenerNombreConductorPorCedula = async (req, res) => {
  try {
    const { cedula_conductor } = req.params;
    const conductor = await Conductor.findOne({ cedula: cedula_conductor }, 'nombre cedula'); // Incluye 'nombre' y 'cedula'
    if (conductor) {
      res.status(200).json(conductor);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el nombre del conductor.' });
  }
};



export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate('cedula_conductor', 'nombre cedula');
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
    const { numero_autobus, cedula_conductor, matricula_vehiculo, numero_puestos, marca, modelo, fecha_vencimiento_seguro, numero_licencia_transito } = req.body;

    // Verificar si ya existe un vehículo con el mismo número de autobús
    const vehiculoExistenteNumeroAutobus = await Vehiculo.findOne({ numero_autobus });
    if (vehiculoExistenteNumeroAutobus) {
      return res.status(400).json({ error: 'Ya existe un vehículo con este número de autobús.' });
    }

    // Verificar si ya existe un vehículo con el mismo número de licencia de tránsito
    const vehiculoExistenteNumeroLicenciaTransito = await Vehiculo.findOne({ numero_licencia_transito });
    if (vehiculoExistenteNumeroLicenciaTransito) {
      return res.status(400).json({ error: 'Ya existe un vehículo con este número de licencia de tránsito.' });
    }

    // Verificar si ya existe un vehículo con la misma matrícula
    const vehiculoExistenteMatricula = await Vehiculo.findOne({ matricula_vehiculo });
    if (vehiculoExistenteMatricula) {
      return res.status(400).json({ error: 'Ya existe un vehículo con esta matrícula.' });
    }

    // Encontrar el conductor correspondiente a la cédula proporcionada
    const conductor = await Conductor.findOne({ cedula: cedula_conductor });
    if (!conductor) {
      return res.status(400).json({ error: 'No se encontró un conductor con esta cédula.' });
    }

    // Verificar si ya existe un vehículo con la misma cédula de conductor
    const vehiculoExistenteCedula = await Vehiculo.findOne({ cedula_conductor: conductor._id });
    if (vehiculoExistenteCedula) {
      return res.status(400).json({ error: 'Ya existe un vehículo con esta cédula de conductor.' });
    }

    const nuevoVehiculo = new Vehiculo({
      numero_autobus,
      cedula_conductor: conductor._id,
      matricula_vehiculo,
      numero_puestos,
      marca,
      modelo,
      fecha_vencimiento_seguro,
      numero_licencia_transito
    });

    const vehiculoCreado = await nuevoVehiculo.save();

    res.status(201).json(vehiculoCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo crear el vehículo.' });
  }
};


export const actualizarVehiculo = async (req, res) => {
  try {
    const { numero_autobus, cedula_conductor, matricula_vehiculo, numero_puestos, marca, modelo, fecha_vencimiento_seguro, numero_licencia_transito } = req.body;

    // Verificar si el vehículo existe por su ID
    const vehiculoExistente = await Vehiculo.findById(req.params.id);
    if (!vehiculoExistente) {
      return res.status(404).json({ error: 'No se encontró el vehículo.' });
    }

    // Verificar si ya existe un vehículo con el mismo número de autobús
    const vehiculoMismoNumeroAutobus = await Vehiculo.findOne({ numero_autobus, _id: { $ne: req.params.id } });
    if (vehiculoMismoNumeroAutobus) {
      return res.status(400).json({ error: 'Ya existe un vehículo con este número de autobús.' });
    }

    // Verificar si ya existe un vehículo con el mismo número de licencia de tránsito
    const vehiculoMismoNumeroLicenciaTransito = await Vehiculo.findOne({ numero_licencia_transito, _id: { $ne: req.params.id } });
    if (vehiculoMismoNumeroLicenciaTransito) {
      return res.status(400).json({ error: 'Ya existe un vehículo con este número de licencia de tránsito.' });
    }

    // Verificar si ya existe un vehículo con la misma matrícula
    const vehiculoMismaMatricula = await Vehiculo.findOne({ matricula_vehiculo, _id: { $ne: req.params.id } });
    if (vehiculoMismaMatricula) {
      return res.status(400).json({ error: 'Ya existe un vehículo con esta matrícula.' });
    }

    // Encontrar el conductor correspondiente a la cédula proporcionada
    const conductor = await Conductor.findOne({ cedula: cedula_conductor });
    if (!conductor) {
      return res.status(400).json({ error: 'No se encontró un conductor con esta cédula.' });
    }

    // Verificar si ya existe un vehículo con la misma cédula de conductor
    const vehiculoMismaCedula = await Vehiculo.findOne({ cedula_conductor: conductor._id, _id: { $ne: req.params.id } });
    if (vehiculoMismaCedula) {
      return res.status(400).json({ error: 'Ya existe un vehículo con esta cédula de conductor.' });
    }

    // Actualizar los datos del vehículo
    vehiculoExistente.numero_autobus = numero_autobus;
    vehiculoExistente.cedula_conductor = conductor._id;
    vehiculoExistente.matricula_vehiculo = matricula_vehiculo;
    vehiculoExistente.numero_puestos = numero_puestos;
    vehiculoExistente.marca = marca;
    vehiculoExistente.modelo = modelo;
    vehiculoExistente.fecha_vencimiento_seguro = fecha_vencimiento_seguro;
    vehiculoExistente.numero_licencia_transito = numero_licencia_transito;

    const vehiculoActualizado = await vehiculoExistente.save();

    res.status(200).json(vehiculoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo editar el vehículo.' });
  }
};





//actualizar estado vehiculo
export const actualizarestado = async (req, res) => {

  const id = req.params.id
  
  const actualizado = {
    estado: req.body.estado
  }

  try {
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, actualizado);

    if (vehiculoActualizado) {
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