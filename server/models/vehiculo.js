import mongoose from 'mongoose';

const vehiculoSchema = new mongoose.Schema(
  {
    numero_autobus: { type: String , unique: true },
    cedula_conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor', unique: true  },
    matricula_vehiculo: { type: String, unique: true },
    numero_puestos: { type: Number },
    marca: { type: String },
    modelo: { type: String },
    fecha_vencimiento_seguro: { type: Date },
    numero_licencia_transito: { type: String, unique: true },
    estado: { type: Boolean, default: true }
  },
  {
    collection: 'Vehiculos'
  }
);

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
export default Vehiculo;