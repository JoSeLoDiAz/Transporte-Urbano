import { defineStore } from "pinia";
import axios from "axios";

export const useVenderStore = defineStore("venderTiket", () => {
  const addTiket = async (info) => {
    try {
      return await axios.post(`http://localhost:4500/tikets`, info);
    } catch (error) {
      throw error
    }
  };

  const traerTikets = async () => {
    try {
      return await axios.get(`http://localhost:4500/tikets`);
    } catch (error) {
      console.log("no sirve");
    }
  };

  const editTikets = async (id, tikets) => {
    try {
      return await axios.put(`http://localhost:4500/tikets/${id}`, tikets);
    } catch (error) {
      throw error;
    }
  };

  return {
    addTiket,
    traerTikets,
    editTikets
  };
});


