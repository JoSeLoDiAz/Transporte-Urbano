<template>
  <div>

    <div class="container-fluid">
      <div class="row mt-2">

        

      
        <div class="col-sm-5">
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <router-link to="/home">
              <button type="button" class="btn btn-warning  border border-3">Clientes</button>
            </router-link>
            <router-link to="/hello">
              <button type="button" class="btn btn-warning  border border-3">Conductor</button>
            </router-link>
            <router-link to="/cuatro">
              <button type="button" class="btn btn-warning  border border-3">Rutas</button>
            </router-link>
            <router-link to="/vehiculo">
              <button type="button" class="btn btn-warning  border border-3">vehiculos</button>
            </router-link>
            <router-link to="/tres">
              <button type="button" class="btn btn-success border  border-3">Vender</button>
            </router-link>


          </div>

        </div>
        <div class="col-sm-7"></div>


      </div>



      <!-- <div class="row">
        <div class="col-sm-1  ">
          <router-link to="/home">
            <button class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark" type="button">Clientes</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/hello">
            <button class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark" type="button">Conductor</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/cuatro">
            <button class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark" type="button">Rutas</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/vehiculo">
            <button
              class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark btn rounded-4 rounded-top-4 border-3 "
              type="button">vehiculo</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/tres">
            <button class="btn btn-success rounded-4  border-dark rounded-top-4 border-3  " type="button">Vender</button>
          </router-link>
        </div>

        <div class="col-sm-7">

        </div>
      </div> -->


      <div class="row">
        <div class="d-grid gap-2">






        </div>


      </div>
      <div class="row mt-3">
        <router-view>

        </router-view>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"


</script>

<style scoped>
#centrar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-fluid{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
