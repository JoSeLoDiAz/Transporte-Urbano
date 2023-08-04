import { defineStore } from "pinia";
import axios from "axios";

export const useConductorStore = defineStore("conductores", () => {
  const addConductor = async (info) => {
    try {
      return await axios.post(`http://localhost:4500/conductores`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const traerconductores = async () => {
    try {
      return await axios.get(`http://localhost:4500/conductores`);
    } catch (error) {
      console.log("no sirve");
    }
  };

  const editConductores = async (id, conductores) => {
    try {
      return await axios.put(`http://localhost:4500/conductores/${id}`, conductores);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const editEstado = async (id, estado) => {
    try {
      return await axios.put(`http://localhost:4500/conductores/estado/${id}`, {estado:estado});
    } catch (error) {
      console.log(error);
      return error;
    }
  };


  return {
    addConductor,
    traerconductores,
    editConductores,
    editEstado
  };
});


