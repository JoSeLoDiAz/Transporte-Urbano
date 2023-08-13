import mongoose from 'mongoose';

const rutaSchema = new mongoose.Schema(
  {
    nombre: {type: String},
    origen: { type: String },
    destino: { type: String },
    hora_salida: { type: String },
    fecha_salida: { type: Date },
    tiempo_estimado_viaje: { type: String },
    descripcion: { type: String },
    estado: { type: Boolean , default: true}
  },
  {
    collection: 'Rutas',
  }
);

const Ruta = mongoose.model('Ruta', rutaSchema);
export default Ruta;
