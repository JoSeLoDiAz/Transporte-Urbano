import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config(); // Carga las variables de entorno de .env

const port = process.env.PORT || 3000;
const app = express();
const nombreBd= process.env.bdMongo||'transUrban';

app.use(bodyParser.json());
app.use(routes);
app.use(cors())
app.use(cors({
  origin:"*"
}))

mongoose.connect(`mongodb://127.0.0.1:27017/${nombreBd}`)
  .then(() => console.log(`Conectado a la Base de MongoDb llamada ${nombreBd}`))
  .catch((error) => console.error('Error de conexión a la base de datos:', error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a la base de datos:"));
db.once("open", () => {
  console.log("Conexión exitosa a la base de datos");
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

