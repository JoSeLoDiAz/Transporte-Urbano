import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Importar bcryptjs aquí

const administradorRutasSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { collection: 'AdminRutas' }
);

// Antes de guardar el administrador de rutas, hashear la password
administradorRutasSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const AdministradorRutas = mongoose.model('AdministradorRutas', administradorRutasSchema);

export default AdministradorRutas;
