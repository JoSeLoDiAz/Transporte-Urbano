import Vehiculo from '../models/vehiculo.js';
import { check, validationResult } from 'express-validator';


export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los vehículos.' });
  }
};

export const obtenerVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id);
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
    // Validar los resultados de las validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Crear el nuevo vehículo
    const nuevoVehiculo = new Vehiculo(req.body);
    const vehiculoCreado = await nuevoVehiculo.save();

    res.status(201).json(vehiculoCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el vehículo.' });
  }
};

export const actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, req.body, { new: true });
    if (vehiculoActualizado) {
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el vehículo.' });
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
