<script setup>
import {ref} from "vue"
import {useClientStore} from "./store/clientes.js"

const useClient = useClientStore()

let telefono, cc, apellido, nombre, asiento = ref("")

async function registrar(){
  await useClient.addClient({
    numero_asiento:asiento.value,
    telefono:telefono.value,
    cc:cc.value,
    apellido:apellido.value,
    nombre:nombre.value
  })
}
</script>

<template>
  <div>


    <div class="row" style="height: 10rem;"></div>

    <div id="carta" class="row">




      <div class="card border-2" style="width: 23rem;">
        <div class="card-body">
          <center>
            <h3 class="card-title">Admi</h3>
          </center>

          <center>
            <h6 class="card-subtitle mb-2 text-body-secondary mt-4">
              Ingrese los datos para acceder
            </h6>
          </center>

          <br>
          <label for="">Usuario:</label>
          <div class="input-group mb-3 ">

            <input type="text" class="form-control" v-model="asiento" placeholder="# asiento" aria-label="Recipient's username"
              aria-describedby="button-addon2">
            <button class="btn btn border" type="button" id="button-addon2">👤</button>
          </div>
          <label for="">correo:</label>
          <div class="input-group mb-3 ">

            <input type="text" class="form-control" v-model="nombre" placeholder="nombre" aria-label="Recipient's username"
              aria-describedby="button-addon2">
            
          </div>
          <label for="">Contraseña:</label>
          <div class="input-group mb-3 ">
            <input type="text" class="form-control" v-model="cc" id="cc" placeholder="Contraseña..."
              aria-label="Recipient's username" aria-describedby="button-addon2">


          </div>
          <div class="input-group mb-3 ">
            <input type="text" class="form-control" v-model="apellido" name="password" id="password" placeholder="apellido"
              aria-label="Recipient's username" aria-describedby="button-addon2">


          </div>
          <div class="input-group mb-3 ">
            <input type="text" class="form-control" v-model="telefono" name="telefono" id="password" placeholder="telefono"
              aria-label="Recipient's username" aria-describedby="button-addon2">


          </div>


          <div class="d-grid gap-2 col-12 mx-auto mt-3">
            <button class="btn btn-primary" type="button" @click="registrar()">guardar</button>

          </div>
        </div>


      </div>
    </div>




  </div>
</template>

<!-- <template>
  <div>


    <div class="row" style="height: 10rem;"></div>

    <div id="carta" class="row">




      <div class="card border-2" style="width: 23rem;">
        <div class="card-body">
          <center>
            <h3 class="card-title">Admi</h3>
          </center>

          <center>
            <h6 class="card-subtitle mb-2 text-body-secondary mt-4">
              Ingrese los datos para acceder
            </h6>
          </center>

          <br>
          <label for="">Usuario:</label>
          <div class="input-group mb-3 ">

            <input type="text" class="form-control" placeholder="Ususario" aria-label="Recipient's username"
              aria-describedby="button-addon2">
            <button class="btn btn border" type="button" id="button-addon2">👤</button>
          </div>
          <label for="">correo:</label>
          <div class="input-group mb-3 ">

            <input type="text" class="form-control" placeholder="correo" aria-label="Recipient's username"
              aria-describedby="button-addon2">
            
          </div>
          <label for="">Contraseña:</label>
          <div class="input-group mb-3 ">
            <input type="password" class="form-control" name="password" id="password" placeholder="Contraseña..."
              aria-label="Recipient's username" aria-describedby="button-addon2">


          </div>


          <div class="d-grid gap-2 col-12 mx-auto mt-3">
            <button class="btn btn-primary" type="button" onclick="redirigir()">Entrar</button>

          </div>
        </div>


      </div>
    </div>




  </div>
</template> -->

<style scoped>
#carta {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.titulo {
  font-size: 20rem;
}
</style>
