import { defineStore } from "pinia";
import axios from "axios";

export const useClientStore = defineStore("clientes", () => {
  const addClient = async (info) => {
    try {
      return await axios.post(`https://transurban.onrender.com/clientes`, info);
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

  const traerclientes = async () => {
    try {
      return await axios.get(`https://transurban.onrender.com/clientes`);
    } catch (error) {
      console.log("No se Pudieron traer los clientes", error);
    }
  };

  const editClient = async (id, cliente) => {
    try {
      return await axios.put(`https://transurban.onrender.com/clientes/${id}`, cliente);
    } catch (error) {
      throw error;
    }
  };
  const editEstado = async (id, estado) => {
    try {
      return await axios.put(`https://transurban.onrender.com/clientes/estado/${id}`, {estado:estado});
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
