import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Importar bcryptjs aquí

const administradorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'Administrador',
    }
);

administradorSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const Administrador = mongoose.model('Administrador', administradorSchema);

export default Administrador;
