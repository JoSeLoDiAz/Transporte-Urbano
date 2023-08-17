import Tiket from '../models/tiket.js';
import Vehiculo from '../models/vehiculo.js';
import Cliente from '../models/cliente.js';
import Ruta from '../models/ruta.js';
import Counter, { getNextSequenceValue } from '../models/counter.js';

export const obtenerTickets = async (req, res) => {
  try {
    const tickets = await Tiket.find()
      .populate("vehiculo")
      .populate("cliente")
      .populate("ruta");

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los tickets.' });
  }
};

export const obtenerTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Tiket.findById(id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el ticket.' });
  }
};

export const obtenerAsientosVendidos = async (req, res) => {
  try {
    const { rutaId, fechaVenta } = req.params;
    console.log('rutaId:', rutaId);
    console.log('fechaVenta:', fechaVenta);
    // Haz una consulta a la base de datos para obtener los asientos vendidos
    const asientosVendidos = await Tiket.find({
      ruta: rutaId,
      fecha_salida: { $gte: new Date(fechaVenta), $lt: new Date(fechaVenta).setDate(new Date(fechaVenta).getDate() + 1) }
    });

    res.status(200).json(asientosVendidos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los asientos vendidos.' });
  }
};

export const crearTicket = async (req, res) => {
  try {
    const { vehiculo, cliente, ruta, numero_de_puesto, valor_puesto, fecha_salida } = req.body;

    const vehiculoG = await Vehiculo.findOne({ _id: vehiculo });
    if (!vehiculoG) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }

    const clienteG = await Cliente.findOne({ _id: cliente });
    if (!clienteG) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }

    const rutaG = await Ruta.findOne({ _id: ruta });
    if (!rutaG) {
      return res.status(404).json({ error: 'Ruta no encontrada.' });
    }

    // Validar que la fecha y hora de salida no sea inferior a la fecha actual
    const fechaSalida = new Date(fecha_salida);
    const fechaActual = new Date();
    // console.log(fechaSalida, fechaActual, fechaSalida >= fechaActual);
    // if (fechaSalida >= fechaActual) {
    //   return res.status(400).json({ error: 'La fecha y hora de salida no puede ser para otro dia a la fecha actual.' });
    // }

    // Obtener el siguiente valor de la secuencia
    const counter = await Counter.findOneAndUpdate(
      { _id: "num_tiket_sequence" },
      { $inc: { sequence_value: 1 } },
      { new: true }
    );
    const numTiket = await getNextSequenceValue("num_tiket_sequence");

    const nuevoTicket = new Tiket({
      nombre_compania: vehiculoG.nombre_compania,
      vehiculo: vehiculoG._id,
      cliente: clienteG._id,
      ruta: rutaG._id,
      numero_de_puesto: numero_de_puesto,
      valor_puesto: valor_puesto,
      fecha_salida: fechaSalida,
      num_tiket: numTiket,
      fecha_tiket: new Date(),
      estado: true
    });

    const ticketCreado = await nuevoTicket.save();

    res.status(201).json(ticketCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el ticket.' });
  }
};

export const actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketActualizado = await Tiket.findByIdAndUpdate(id, req.body, { new: true });
    if (ticketActualizado) {
      res.status(200).json(ticketActualizado);
    } else {
      res.status(404).json({ error: 'Ticket no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el ticket.' });
  }
};

export const eliminarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketEliminado = await Tiket.findByIdAndDelete(id);
    if (ticketEliminado) {
      res.status(200).json(ticketEliminado);
    } else {
      res.status(404).json({ error: 'Ticket no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el ticket.' });
  }
};