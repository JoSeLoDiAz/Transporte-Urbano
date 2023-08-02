


<template>
  <div>


    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <h5>Asiento</h5>
        </div>
        <div class="col-sm-5"></div>

        <div class="col-sm-1"></div>

      </div>
      <div class="row  ">

        <div class="col-sm-1"></div>
        <div class="col-sm-5">
          <div class="v-ford">
            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-for="(n, i) in 25" :key="n" id="icono"
              type="button" class="btn btn-light mt-4 position-relative">
              <i class="fa-solid fa-couch"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle p-2 bg-secondary border border-light rounded-circle"
                id="a">
                {{ i + 1 }}
                <span class="visually-hidden"></span>
              </span>
            </button>
          </div>

        </div>
        <div class="col-sm-5"></div>
        <div class="col-sm-1"></div>


      </div>
      <div class="col-sm-4"></div>





      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Vender ticket</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">




              <label for="">Cedula</label>
              <div class="input-group mb-3 mt-1 ">

                <input v-model="cedula" type="text" class="form-control" placeholder="cedula..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
#icono {
  box-shadow: 0px 12px 12px 12px rgba(0, 0, 0, 0.287);

  padding: 10px;
  margin: 0 18px;
  font-size: 49px;
  align-self: center;
  background-color: white;
}

#icono {
  position: relative;
}

#icono span {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: white;
  padding: 5px;
  font-size: 12px;
}

#a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}
</style> 


