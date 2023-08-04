import { defineStore } from "pinia";
import axios from "axios";

export const useLoginUsersStore = defineStore('loginUsers', () => {
    // const state = () => ({
    //     token: '',
    //     errors: [],
    // });

    // const setToken = (newToken) => {
    //     state().token = newToken;
    // };

    // const setErrors = (errors) => {
    //     state().errors.push(errors);
    // };

    // const clearErrors = () => {
    //     state().errors = [];
    // };

    const loguear = async (email, password) => {
        let data = { email, password };
        try {
            
            return await axios.post('http://localhost:4500/loginUser', data);
            // const token = response.data.token;
        } catch (error) {
            // console.log("jjjjjjjjjjjjjjj");
            // console.log(error.response);
            // console.log("jjjjjjjjjjjjjjj");
            throw error
            
        //     console.log('Credenciales inválidas'); // Establece el error en la tienda
        //     return error;
        }
    };

    return {
        // state,
        // setToken,
        // setErrors,
        // clearErrors,
        loguear
    };
});
