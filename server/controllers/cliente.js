import Cliente from '../models/cliente.js';



// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los clientes.' });
  }
};

// Obtener un cliente por su ID
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

//actualizar estado cliente
export const actualizarestado = async (req, res) => {
  const id = req.params.id

  const actualizado = {
    estado: req.body.estado
  }

  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, actualizado);

    if (clienteActualizado) {
      res.status(200).json(clienteActualizado);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el cliente.', error });
  }
};
// Crear un nuevo cliente
export const crearCliente = async (req, res) => {
  try {
    const { cc } = req.body;

    // Verificar si el número de cédula ya existe en la base de datos
    const clienteExistente = await Cliente.findOne({ cc });
    if (clienteExistente) {
      return res.status(400).json({ error: 'El número de cédula ya está registrado.' });
    }
    const nuevoCliente = new Cliente(req.body);
    const clienteCreado = await nuevoCliente.save();
    res.status(201).json(clienteCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el cliente.' });
  }
};

// Actualizar un cliente existente
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { cc, ...datosCliente } = req.body;

    if (cc) {
      // Verificar si el nuevo número de cédula ya existe en la base de datos
      const clienteExistente = await Cliente.findOne({ cc, _id: { $ne: id } });
      if (clienteExistente) {
        return res.status(400).json({ error: 'El número de cédula ya está registrado.' });
      }
    }

    const clienteActualizado = await Cliente.findByIdAndUpdate(id, datosCliente, { new: true });

    if (clienteActualizado) {
      res.status(200).json(clienteActualizado);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el cliente.' });
  }
};


// Eliminar un cliente
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

