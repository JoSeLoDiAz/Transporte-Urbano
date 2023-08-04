import mongoose from 'mongoose';

const conductorSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    cedula: { type: String },
    telefono: { type: String },
    direccion: { type: String },
    clase_pase: { type: String },
    vigencia_pase: { type: Date },
    estado: { type: Boolean, default: true }
  },
  {
    collection: 'Conductores'
  }
);

const Conductor = mongoose.model('Conductor', conductorSchema);
export default Conductor;
