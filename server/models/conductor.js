import mongoose from 'mongoose';

const conductorSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    cedula: { type: String },
    telefono: { type: String },
    direccion: { type: String },
    clase_pase: { type: String },
    vigencia_pase: { type: Date },
  },
  {
    collection: 'Conductores' // Especifica el nombre de la colección en la base de datos
  }
);

const Conductor = mongoose.model('Conductor', conductorSchema);
export default Conductor;
