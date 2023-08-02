import Tiket from '../models/tiket.js';
import Vehiculo from '../models/vehiculo.js';
import Cliente from '../models/cliente.js';
import { check, validationResult } from 'express-validator';
import { validarResultados } from '../middleware/validaciones.js';

// Define las reglas de validación utilizando express-validator
const validarCrearTicket = [
  check('numero_autobus').notEmpty().withMessage('El número de autobús es obligatorio'),
  check('ccCliente').notEmpty().withMessage('La cédula del cliente es obligatoria'),
  check('origen').notEmpty().withMessage('El origen es obligatorio'),
  check('destino').notEmpty().withMessage('El destino es obligatorio'),
  check('numero_de_puesto').notEmpty().withMessage('El número de puesto es obligatorio').isInt(),
  check('valor_puesto').notEmpty().withMessage('El valor del puesto es obligatorio').isNumeric(),
  check('ruta').notEmpty().withMessage('El ID de ruta es obligatorio'),
];

// Middleware para validar los resultados de las validaciones al crear un ticket
const validarResultadosCrearTicket = validarResultados;

// Obtener todos los tickets
export const obtenerTickets = async (req, res) => {
  try {
    const tickets = await Tiket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los tickets.' });
  }
};

// Obtener un ticket por su ID
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

// Crear un nuevo ticket asociado a un cliente
export const crearTicket = async (req, res) => {
  try {
    const { numero_autobus, ccCliente } = req.body;

    // Buscar el vehículo por el número de autobús en la base de datos
    const vehiculo = await Vehiculo.findOne({ numero_autobus });

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }

    // Buscar al cliente por su número de cédula en la base de datos
    const cliente = await Cliente.findOne({ cc: ccCliente });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }

    // Si encontramos el vehículo y el cliente, creamos el objeto Tiket con toda la información
    const nuevoTicket = new Tiket({
      nombre_compania: vehiculo.nombre_compania,
      numero_autobus: vehiculo.numero_autobus,
      nombre_completo_cliente: `${cliente.nombre} ${cliente.apellido}`,
      cedula_cliente: ccCliente,
      nombre_conductor: vehiculo.nombre_conductor,
      origen: req.body.origen,
      destino: req.body.destino,
      numero_de_puesto: req.body.numero_de_puesto,
      valor_puesto: req.body.valor_puesto,
      ruta: req.body.ruta,
      fecha_tiket: new Date(),
      estado: 'activo',
    });

    // Guardar el nuevo ticket en la base de datos
    const ticketCreado = await nuevoTicket.save();

    res.status(201).json(ticketCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el ticket.' });
  }
};

// Actualizar un ticket existente
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

// Eliminar un ticket
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

export {
  validarCrearTicket,
  validarResultadosCrearTicket,
};
