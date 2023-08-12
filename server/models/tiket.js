import mongoose from "mongoose";

const tiketSchema = new mongoose.Schema(
  {
    nombre_compania: { type: String, default: "TransUrban" },
    vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: "vehiculo" },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
    ruta: { type: mongoose.Schema.Types.ObjectId, ref: "Ruta" },
    num_tiket: { type: Number },
    numero_de_puesto: { type: Number },
    valor_puesto: { type: Number },

    fecha_tiket: { type: Date, default: Date.now }
  },
  { collection: "Tiketes" }
);

const Tiket = mongoose.model("Tiket", tiketSchema);
export default Tiket;
