import { defineStore } from 'pinia';
import { getPokemons, getPokemonById } from './api';
import { ref, computed } from 'vue';

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        pokemons: [],
        offset: 0,
        limit: 50,
        filterType: '',
        searchTerm: '',
    }),

    getters: {
        getPokemonById: (state) => (id) => {
            return state.pokemons.find((pokemon) => pokemon.id === id);
        },
    },

    actions: {
        async fetchPokemons() {
            try {
                const response = await getPokemons(this.offset, this.limit);
                const pokemonPromises = response.map((pokemon) =>
                    getPokemonById(pokemon.name)
                );
                const pokemonData = await Promise.all(pokemonPromises);
                const newPokemons = pokemonData.map((pokemon, index) => ({
                    id: this.offset + index + 1,
                    name: pokemon.name,
                    image: pokemon.sprites.other['official-artwork'].front_default,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    types: pokemon.types.map((type) => type.type.name),
                }));
                this.offset += this.limit;

                // Filtrar por tipo si se ha seleccionado un tipo
                const filteredPokemons = this.filterType
                    ? newPokemons.filter((pokemon) =>
                        pokemon.types.includes(this.filterType.toLowerCase())
                    )
                    : newPokemons;

                this.pokemons = [...this.pokemons, ...filteredPokemons];
            } catch (error) {
                console.error('Failed to fetch pokemons:', error);
            }
        },

        async loadMore() {
            try {
                this.offset += this.limit;
                const response = await getPokemons(this.offset, this.limit);
                const pokemonPromises = response.map((pokemon) =>
                    getPokemonById(pokemon.name)
                );
                const pokemonData = await Promise.all(pokemonPromises);
                const newPokemons = pokemonData.map((pokemon, index) => ({
                    id: this.offset + index + 1,
                    name: pokemon.name,
                    image: `${pokemon.sprites.other['official-artwork'].front_default}`,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    types: pokemon.types.map((type) => type.type.name),
                }));
                this.pokemons = [...this.pokemons, ...newPokemons];
            } catch (error) {
                console.error('Failed to load more pokemons:', error);
            }
        },

        setFilterType(type) {
            this.filterType = type;
        },

        filterByType(type) {
            this.setFilterType(type);
            this.offset = 0;
            this.pokemons = [];
            this.fetchPokemons();
        },
    },
});
