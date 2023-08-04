import { defineStore } from "pinia";
import axios from "axios";

export const useRutasStore = defineStore("rutas", () => {
  const addRutas = async (info) => {
    try {
      return await axios.post(`http://localhost:4500/rutas`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const editrutas = async (id, rutas) => {
    try {
      return await axios.put(`http://localhost:4500/rutas/${id}`, rutas);
    } catch (error) {
      console.log(error);
      return error;
    }
  };


  const editEstado = async (id, estado) => {
    try {
      return await axios.put(`http://localhost:4500/rutas/estado/${id}`, { estado: estado });
    } catch (error) {
      console.log(error);
      return error;
    }
  };


  const traerRutas = async () => {
    try {
      return await axios.get(`http://localhost:4500/rutas`);
    } catch (error) {
      console.log("no sirve");
    }
  };


  return {
    addRutas,
    editrutas,
    editEstado,
    traerRutas,
  };
});


