import mongoose from 'mongoose';

const administradorRutasSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    correo: {
      type: String,
      required: true,
      unique: true
    },
    contraseña: {
      type: String,
      required: true
    },
    rutasAsignadas: [
      {
        ruta: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ruta',
          required: true
        },
        vehiculo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Vehiculo',
          required: true
        },
        horarios: [String]
      }
    ]
  },
  { collection: 'AdminRutas' } // Especifica el nombre de la colección en la base de datos
);

const AdministradorRutas = mongoose.model('AdministradorRutas', administradorRutasSchema);

export default AdministradorRutas;
