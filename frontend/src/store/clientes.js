import {defineStore} from "pinia"
import axios from "axios"

export const useClientStore = defineStore("client", ()=>{

 const addClient = async(info) =>{
    try {
        return await axios.post(`http://localhost:4500/clientes`,info)
    } catch (error) {
        console.log(error);
        return error
    }
 }

    return{
        addClient
    }
})