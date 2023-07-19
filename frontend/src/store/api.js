import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Función para obtener todos los pokémon
export async function getPokemons(offset, limit) {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: {
        offset,
        limit
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching pokémons:', error);
    return [];
  }
}

// Función para obtener un pokémon por su ID
export async function getPokemonById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokémon with ID ${id}:`, error);
    return null;
  }
}
