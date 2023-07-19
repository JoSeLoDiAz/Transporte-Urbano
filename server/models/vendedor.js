import mongoose from 'mongoose';

const vendedorSchema = new mongoose.Schema({
    cc: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    contraseña: { type: String, required: true }
},
{collection: 'Vendedores'});

const Vendedor = mongoose.model('Vendedores', vendedorSchema);

export default Vendedor;

