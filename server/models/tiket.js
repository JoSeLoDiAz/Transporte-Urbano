import mongoose from "mongoose";

const tiketSchema = new mongoose.Schema(
  {
    nombre_compania: { type: String },
    numero_autobus: { type: String },
    cedula_cliente:{typeof: String },
    nombre_completo_cliente: { type: String },
    nombre_conductor: { type: String },
    origen: { type: String },
    destino: { type: String },
    numero_de_puesto: { type: Number },
    valor_puesto: { type: Number },
    ruta: { type: mongoose.Schema.Types.ObjectId, ref: "Ruta" },
    fecha_tiket: { type: Date, default: Date.now },
    estado: { type: Boolean, default: true }
  },
  { collection: "Ticketes" }
);

const Tiket = mongoose.model("Tiket", tiketSchema);
export default Tiket;
