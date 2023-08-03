import { defineStore } from "pinia";
import axios from "axios";

export const useLoginUsersStore = defineStore('loginUsers', () => {
    const state = () => ({
        token: '',
        errors: [],
    });

    const setToken = (newToken) => {
        state().token = newToken;
    };

    const setErrors = (errors) => {
        state().errors.push(errors);
    };

    const clearErrors = () => {
        state().errors = [];
    };

    const loginUsers = async (email, password) => {
        try {
            return await axios.post('http://localhost:4500/loginUsers', { email, password });
            // const token = response.data.token;
        } catch (error) {
            console.log('Credenciales inválidas'); // Establece el error en la tienda
            return error;
        }
    };

    return {
        state,
        setToken,
        setErrors,
        clearErrors,
        loginUsers,
    };
});
