import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useLoginUsersStore = defineStore("loginUsers", () => {
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
  let login = ref(false);
  const loguear = async (email, password) => {
    let data = { email, password };
    try {
      login.value = true;
      return await axios.post("http://localhost:4500/loginUser", data);
    } catch (error) {
       
      throw error;
      login.value = true;
    } finally {
      login.value = false;
    }
  };

  return {
    // state,
    // setToken,
    // setErrors,
    // clearErrors,
    loguear,
    login
  };
});
