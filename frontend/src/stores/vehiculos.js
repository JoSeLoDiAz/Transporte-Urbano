import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "https://transurban.onrender.com";

export const useVehiculosStore = defineStore("vehiculos", () => {
  const addVehiculo = async (info) => {
    try {
      const response = await axios.post(`${BASE_URL}/vehiculos`, info);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editVehiculo = async (id, datosActualizados) => {
    try {
      const response = await axios.put(`${BASE_URL}/vehiculos/${id}`, datosActualizados);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editEstado = async (id, estado) => {
    try {
      const response = await axios.put(`${BASE_URL}/vehiculos/estado/${id}`, { estado });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al cambiar el estado del vehículo");
    }
  };

  const traerVehiculos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/vehiculos`);
      return response.data;
    } catch (error) {
      console.log("Error al obtener los vehículos");
      throw new Error("Error al obtener los vehículos");
    }
  };

  const obtenerNombreConductor = async (cedula_conductor) => {
    try {
      const response = await axios.get(`${BASE_URL}/vehiculos/nombre_conductor/${cedula_conductor}`);
      // Verificar si la respuesta contiene el nombre y la cédula del conductor
      if (response.data && response.data.nombre && response.data.cedula) {
        return {
          nombre: response.data.nombre,
          cedula: response.data.cedula
        };
      } else {
        return { nombre: 'Nombre Desconocido', cedula: 'Cédula Desconocida' };
      }
    } catch (error) {
      console.error("Error:", error);
      return { nombre: 'Nombre Desconocido', cedula: 'Cédula Desconocida' };
    }
  };



  const obtenerConductores = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/conductores`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los conductores");
    }
  };

  return {
    addVehiculo,
    editVehiculo,
    editEstado,
    traerVehiculos,
    obtenerNombreConductor,
    obtenerConductores
  };
});
