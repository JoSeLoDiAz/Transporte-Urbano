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
        } catch (error) {
            throw error
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
