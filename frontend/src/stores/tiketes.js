import { defineStore } from "pinia";
import axios from "axios";

export const useVenderStore = defineStore("venderTiket", () => {
  const addTiket = async (info) => {
    try {
      return await axios.post(`https://transurban.onrender.com/tikets`, info);
    } catch (error) {
      throw error
    }
  };

  const traerTikets = async () => {
    try {
      return await axios.get(`https://transurban.onrender.com/tikets`);
    } catch (error) {
    }
  };

  const editTikets = async (id, tikets) => {
    try {
      return await axios.put(`https://transurban.onrender.com/tikets/${id}`, tikets);
    } catch (error) {
      throw error;
    }
  };

  // Nueva función para obtener asientos vendidos
  const obtenerAsientosVendidos = async (rutaId, fechaVenta) => {
    try {
      return await axios.get(`https://transurban.onrender.com/tikets/asientos-vendidos/${rutaId}/${fechaVenta}`);
    } catch (error) {
      throw error;
    }
  };

  return {
    addTiket,
    traerTikets,
    editTikets,
    obtenerAsientosVendidos,
  };
});


