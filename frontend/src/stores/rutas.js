import { defineStore } from "pinia";
import axios from "axios";

export const useRutasStore = defineStore("rutas", () => {
  const addRutas = async (info) => {
    try {
      return await axios.post(`https://transurban.onrender.com/rutas`, info);
    } catch (error) {
      throw error
    }
  };
  const editrutas = async (id, rutas) => {
    try {
      return await axios.put(`https://transurban.onrender.com/rutas/${id}`, rutas);
    } catch (error) {
      throw error
    }
  };


  const editEstado = async (id, estado) => {
    try {
      return await axios.put(`https://transurban.onrender.com/rutas/estado/${id}`, { estado: estado });
    } catch (error) {
      return error;
    }
  };


  const traerRutas = async () => {
    try {
      return await axios.get(`https://transurban.onrender.com/rutas`);
    } catch (error) {
    }
  };


  return {
    addRutas,
    editrutas,
    editEstado,
    traerRutas,
  };
});


