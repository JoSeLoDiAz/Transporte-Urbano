import mongoose from 'mongoose';

const vehiculoSchema = new mongoose.Schema(
  {
    numero_autobus: { type: String },
    cedula_conductor: { type: String, ref: 'Conductor' },
    matricula_vehiculo: { type: String },
    numero_puestos: { type: Number },
    marca: { type: String },
    modelo: { type: String },
    fecha_vencimiento_seguro: { type: Date },
    numero_licencia_transito: { type: String },
    estado: { type: Boolean, default: true }
  },
  {
    collection: 'Vehiculos'
  }
);

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
export default Vehiculo;