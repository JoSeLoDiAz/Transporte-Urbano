import mongoose from 'mongoose';

const administradorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        correo: {
            type: String,
            required: true,
            unique: true,
        },
        contraseña: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'Administrador',
    }
);

const Administrador = mongoose.model('Administrador', administradorSchema);

export default Administrador;
