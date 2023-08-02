// stores/vehiculos.js
import { defineStore } from "pinia";
import axios from "axios";

export const useVehiculosStore = defineStore("vehiculos", () => {
  const addvehiculo = async (info) => {
    try {
      return await axios.post(`http://localhost:4500/vehiculos`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const traervehiculos = async () => {
    try {
      return await axios.get(`http://localhost:4500/vehiculos`);
    } catch (error) {
      console.log("no sirve");
      throw error; // Propagate the error further
    }
  };

  return {
    addvehiculo,
    traervehiculos,
  };
});
