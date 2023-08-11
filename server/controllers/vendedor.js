import Vendedor from '../models/vendedor.js';

// Función para obtener todos los vendedores
export const getVendedores = async (req, res) => {
    try {
        const vendedores = await Vendedor.find();
        res.status(200).json(vendedores);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los vendedores.' });
    }
};

// Función para obtener un solo vendedor
export const getVendedor = async (req, res) => {
    try {
        // Obtiene el ID del vendedor desde los parámetros de la solicitud
        const { id } = req.params;

        // Busca el vendedor por su ID en la base de datos
        const vendedor = await Vendedor.findById(id);

        // Si el vendedor existe, envía la respuesta con el vendedor encontrado
        if (vendedor) {
            res.status(200).json(vendedor);
        } else {
            // Si el vendedor no existe, envía una respuesta de error
            res.status(404).json({ error: 'Vendedor no encontrado.' });
        }
    } catch (error) {
        // Si ocurre un error, envía una respuesta de error
        res.status(500).json({ error: 'No se pudo obtener el vendedor.' });
    }
};

// Función para crear un vendedor
export const crearVendedor = async (req, res) => {
    try {
      // Verificar si ya existe un vendedor con la misma cédula
      const { cedula } = req.body;
      const vendedorExistente = await Vendedor.findOne({ cedula });
  
      if (vendedorExistente) {
        return res.status(400).json({ error: 'Ya existe un vendedor con esta cédula.' });
      }
  
      // Crea un nuevo objeto Vendedor con los datos de la solicitud
      const nuevoVendedor = new Vendedor(req.body);
  
      // Guarda el vendedor en la base de datos
      const vendedorCreado = await nuevoVendedor.save();
  
      // Envía la respuesta con el vendedor creado
      res.status(201).json(vendedorCreado);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo crear el vendedor.' });
    }
  };
  
  export const actualizarVendedor = async (req, res) => {
    try {
      // Obtiene el ID del vendedor desde los parámetros de la solicitud
      const { id } = req.params;
  
      // Verificar si ya existe otro vendedor con la misma cédula
      const { cedula, ...datosVendedor } = req.body;
      const vendedorExistente = await Vendedor.findOne({ cedula, _id: { $ne: id } });
      if (vendedorExistente) {
        return res.status(400).json({ error: 'Ya existe un vendedor con esta cédula.' });
      }
  
      // Actualiza el vendedor en la base de datos
      const vendedorActualizado = await Vendedor.findByIdAndUpdate(id, datosVendedor, { new: true });
  
      if (vendedorActualizado) {
        res.status(200).json(vendedorActualizado);
      } else {
        res.status(404).json({ error: 'Vendedor no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar el vendedor.' });
    }
  };

//actualizar estado vendedor
export const actualizarestado = async (req, res) => {

    const id = req.params.id
    // console.log(`estado actualizado ${id}`);

    const actualizado = {
        estado: req.body.estado
    }

    try {
        const vendedorActualizado = await Vendedor.findByIdAndUpdate(id, actualizado);

        if (vendedorActualizado) {
            console.log(vendedorActualizado);
            res.status(200).json(vendedorActualizado);
        } else {
            res.status(404).json({ error: 'vendedor no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'No se pudo actualizar el vendedor.', error });
    }
};

// Función para eliminar un vendedor
export const eliminarVendedor = async (req, res) => {
    try {
        // Obtiene el ID del vendedor desde los parámetros de la solicitud
        const { id } = req.params;

        // Elimina el vendedor de la base de datos
        const vendedorEliminado = await Vendedor.findByIdAndDelete(id);

        // Si el vendedor existe, envía la respuesta con el vendedor eliminado
        if (vendedorEliminado) {
            res.status(200).json(vendedorEliminado);
        } else {
            // Si el vendedor no existe, envía una respuesta de error
            res.status(404).json({ error: 'Vendedor no encontrado.' });
        }
    } catch (error) {
        // Si ocurre un error, envía una respuesta de error
        res.status(500).json({ error: 'No se pudo eliminar el vendedor.' });
    }
};
