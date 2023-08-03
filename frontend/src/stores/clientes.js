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

  const editClient = async (id, cliente) => {
    try {
      return await axios.put(`http://localhost:4500/clientes/${id}`, cliente);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const editEstado = async (id, estado) => {
    try {
      return await axios.put(`http://localhost:4500/clientes/estado/${id}`, {estado:estado});
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return {
    addClient,
    traerclientes,
    editClient,
    editEstado
  };
});
