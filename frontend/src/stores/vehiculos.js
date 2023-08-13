import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "http://localhost:4500";

export const useVehiculosStore = defineStore("vehiculos", () => {
  const addVehiculo = async (info) => {
    try {
      const response = await axios.post(`${BASE_URL}/vehiculos`, info);
      return response.data;
    } catch (error) {
      throw new Error("Error al agregar el vehículo");
    }
  };

  const editVehiculo = async (id, datosActualizados) => {
    try {
      const response = await axios.put(`${BASE_URL}/vehiculos/${id}`, datosActualizados);
      return response.data;
    } catch (error) {
      throw new Error("Error al editar el vehículo");
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
      console.log("API Response en store:", response.data); // Agrega esta línea
      return response.data;
    } catch (error) {
      console.log("Error al obtener los vehículos");
      throw new Error("Error al obtener los vehículos");
    }
  };

  const obtenerNombreConductor = async (cedula_conductor) => {
    try {
      console.log("Cédula del conductor:", cedula_conductor);
      const response = await axios.get(`${BASE_URL}/vehiculos/nombre_conductor/${cedula_conductor}`);
      console.log("API Response en store:", response.data);

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
      console.error(error);
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
