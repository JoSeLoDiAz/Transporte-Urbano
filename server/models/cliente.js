import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  numero_asiento: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  cc: { type: String },
  telefono: { type: String }
},
  { collection: 'Clientes' });

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
