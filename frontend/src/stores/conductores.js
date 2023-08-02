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


  return {
    addConductor,
    traerconductores,
  };
});


