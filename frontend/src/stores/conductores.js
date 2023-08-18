import { defineStore } from "pinia";
import axios from "axios";

export const useConductorStore = defineStore("conductores", () => {
  const addConductor = async (info) => {
    try {
      return await axios.post(`https://transurban.onrender.com/conductores`, info);
    } catch (error) {
      throw error
    }
  };

  const traerconductores = async () => {
    try {
      return await axios.get(`https://transurban.onrender.com/conductores`);
    } catch (error) {
      console.log("no sirve");
    }
  };

  const editConductores = async (id, conductores) => {
    try {
      return await axios.put(`https://transurban.onrender.com/conductores/${id}`, conductores);
    } catch (error) {
      throw error;
    }
  };
  const editEstado = async (id, estado) => {
    try {
      return await axios.put(`https://transurban.onrender.com/conductores/estado/${id}`, {estado:estado});
    } catch (error) {
      throw error;
    }
  };


  return {
    addConductor,
    traerconductores,
    editConductores,
    editEstado
  };
});


