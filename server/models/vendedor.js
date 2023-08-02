    import mongoose from 'mongoose';
    import bcrypt from 'bcryptjs'; // Agrega esta importación

    const vendedorSchema = new mongoose.Schema({
        cc: { type: String, required: true },
        nombre: { type: String, required: true },
        telefono: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
        { collection: 'Vendedores' });
    // Antes de guardar el vendedor, hashear la password
    vendedorSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    });

    const Vendedor = mongoose.model('Vendedores', vendedorSchema);

    export default Vendedor;

