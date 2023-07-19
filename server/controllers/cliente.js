import Cliente from '../models/cliente.js';

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los clientes.' });
  }
};

export const getCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el cliente.' });
  }
};

export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteCreado = await nuevoCliente.save();
    res.status(201).json(clienteCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el cliente.' });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    if (clienteActualizado) {
      res.status(200).json(clienteActualizado);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el cliente.' });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if (clienteEliminado) {
      res.status(200).json(clienteEliminado);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el cliente.' });
  }
};
