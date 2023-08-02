<template>
  <div>

    <div class="container-fluid">

      <div class="row">
        <div class="col-sm-1  ">
          <router-link to="/home">
            <button style="width: 100%; " class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark"
              type="button">Clientes</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/hello">
            <button style="width: 100%;" class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark"  
              type="button">Conductor</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/cuatro">
            <button style="width: 100%;" class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark"   type="button">Rutas</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/vehiculo">
            <button style="width: 100%;" class="btn btn-warning rounded-4 rounded-top-4 border-3 border-dark btn rounded-4 rounded-top-4 border-3 "   type="button">vehiculo</button>
          </router-link>
        </div>
        <div class="col-sm-1">
          <router-link to="/tres">
            <button style="width: 100%" class="btn btn-success rounded-4  border-dark rounded-top-4 border-3  " type="button">Vender</button>
          </router-link>
        </div>
        
        <div class="col-sm-7">

        </div>
      </div>


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
</style>
