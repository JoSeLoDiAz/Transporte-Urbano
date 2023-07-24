import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Otros campos relevantes para tu aplicación
});

// Método para verificar la contraseña del usuario
userSchema.methods.validarContraseña = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Antes de guardar, hashear la contraseña si ha sido modificada o es nueva
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
