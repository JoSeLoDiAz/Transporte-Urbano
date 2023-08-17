import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nombre: { type: String },
  apellido: { type: String },
  cc: { type: String, unique: true },
  telefono: { type: String },
  estado: { type: Boolean, default: true }
},
  { collection: 'Clientes' });

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
