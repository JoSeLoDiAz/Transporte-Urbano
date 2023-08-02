import { defineStore } from "pinia";
import axios from "axios";

export const useClientStore = defineStore("clientes", () => {
  const addClient = async (info) => {
    try {
      return await axios.post(`http://localhost:4500/clientes`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const traerclientes = async () => {
    try {
      return await axios.get(`http://localhost:4500/clientes`);
    } catch (error) {
      console.log("no sirve");
    }
  };


  return {
    addClient,
    traerclientes,
  };
});


