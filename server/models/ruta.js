import mongoose from 'mongoose';

const rutaSchema = new mongoose.Schema(
  {
    origen: { type: String },
    destino: { type: String },
    hora_salida: { type: String },
    fecha_salida: { type: Date },
    tiempo_estimado_viaje: { type: String },
    descripcion: { type: String },
    estado: { type: Boolean , default: true}
  },
  {
    collection: 'Rutas', // Especifica el nombre de la colección en la base de datos
  }
);

const Ruta = mongoose.model('Ruta', rutaSchema);
export default Ruta;
