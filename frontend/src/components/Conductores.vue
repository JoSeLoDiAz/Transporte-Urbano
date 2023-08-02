<template  >
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <h5>Conductor</h5>
        </div>
        <div class="col-sm-3"></div>
        <div class="col-sm-2 mt-2">
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button" data-bs-toggle="modal"
              data-bs-target="#staticBackdrop">Nuevo</button>

          </div>

        </div>
        <div class="col-sm-1"></div>

      </div>

      <div class="row mt-4">

        <div class="col-sm-12">

          <table class="table table-striped table-hover">
            <thead>
              <tr>

                <th id="color" scope="col">nombre</th>
                <th id="color" scope="col">cedula</th>
                <th id="color" scope="col">telefono</th>
                <th id="color" scope="col">direccion</th>
                <th id="color" scope="col">clase_pase</th>
                <th id="color" scope="col">vigencia_pase</th>
                <th id="color" scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(array, i) in conductores" :key="i">

                <td>{{ array.nombre }}</td>
                <td>{{ array.cedula }}</td>
                <td>{{ array.telefono }}</td>
                <td>{{ array.direccion }}</td>
                <td>{{ array.clase_pase }}</td>
                <td>{{ array.vigencia_pase }}</td>
                <td>
                  <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">Editar 📝</button>

                </td>
              </tr>


            </tbody>
          </table>
        </div>

      </div>



    </div>




    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Conductor</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">


            <label for="">Nombre</label>
            <div class="input-group mb-3 ">

              <input v-model="nombre" type="text" class="form-control" placeholder="Nombre..."
                aria-label="Recipient's username" aria-describedby="button-addon2">

            </div>
            <label for="">Cedula
            </label>
            <div class="input-group mb-3 ">

              <input v-model="cedula" type="text" class="form-control" placeholder="cedula..."
                aria-label="Recipient's username" aria-describedby="button-addon2">

            </div>

            <label for="">Telefono</label>
            <div class="input-group mb-3 ">

              <input v-model="telefono" type="text" class="form-control" placeholder="telefono..."
                aria-label="Recipient's username" aria-describedby="button-addon2">

            </div>

            <label for="">Direccion</label>
            <div class="input-group mb-3 ">

              <input v-model="direccion" type="text" class="form-control" placeholder="Direccion..."
                aria-label="Recipient's username" aria-describedby="button-addon2">

            </div>

            <label for="">clase_pase</label>
            <div class="input-group mb-3 ">

              <input v-model="clase_pase" type="text" class="form-control" placeholder="Clase de pase..."
                aria-label="Recipient's username" aria-describedby="button-addon2">

            </div>

            <label for="">vigencia_pase</label>
            <div class="input-group mb-3 ">

              <input v-model="vigencia_pase" type="text" class="form-control" placeholder="Vigencia de pase..."
                aria-label="Recipient's username" aria-describedby="button-addon2">

            </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="guaradarConductor" >Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConductorStore } from '../../stores/conductores'
import { ref, onMounted } from 'vue';


let conductores = ref([]);
let nombre = ref('');
let cedula = ref('');
let telefono = ref('');
let direccion = ref('');
let clase_pase = ref('');
let vigencia_pase = ref('')

const useconductor = useConductorStore()


async function pedirconductores() {
  let conductor = await useconductor.traerconductores()
  console.log(conductores.data);
  conductores.value = conductor.data


}

const guaradarConductor = async () => {
  try {
    const nuevoConductor = {
    nombre: nombre.value,
    cedula: cedula.value,
    telefono: telefono.value,
    direccion: direccion.value,
    clase_pase: clase_pase.value,
    vigencia_pase: vigencia_pase.value


  }
  await useconductor.addConductor(nuevoConductor);
  pedirconductores();

  nombre.value = ''
  cedula.value = ''
  telefono.value = ''
  direccion.value = ''
  clase_pase.value = ''
  vigencia_pase.value=''
  } catch (error) {
    console.log(error);
  }

}



onMounted(() => {
  pedirconductores()

})



</script>

<style scoped>
#color{
background-color: rgb(254, 183, 3);
}

</style>
