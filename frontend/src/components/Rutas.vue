
<template>
  <div>
    <div class="container-fluid">

      <div class="row">
        <div class="col-sm-6">
          <h5>Rutas</h5>
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

                <th id="color" scope="col">origen</th>
                <th id="color" scope="col">destino</th>
                <th id="color" scope="col">hora_salida</th>
                <th id="color" scope="col">fecha_salida</th>
                <th id="color" scope="col">Tiempo_estimado_viaje</th>
                <th id="color" scope="col">descripcion</th>
                <th id="color" scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(array, i) in Rutas" :key="i">

                <td>{{ array.origen }}</td>
                <td>{{ array.destino }}</td>
                <td>{{ array.hora_salida }}</td>
                <td>{{ array.fecha_salida }}</td>
                <td>{{ array.tiempo_estimado_viaje }}</td>
                <td>{{ array.descripcion }}</td>
                <td>

                  <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">Editar 📝</button>
                </td>

              </tr>


            </tbody>
          </table>
        </div>

      </div>


      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel"> Ruta</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <label for="">Origen</label>
              <div class="input-group mb-3 ">

                <input v-model="origen" type="text" class="form-control" placeholder="origen..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>

              <label for="">Destino</label>
              <div class="input-group mb-3 ">

                <input v-model="destino" type="text" class="form-control" placeholder="Destino..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>

              <label for="">Hora_salida</label>
              <div class="input-group mb-3 ">

                <input v-model="hora_salida" type="text" class="form-control" placeholder="Hora de salida..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>
              <label for="">Fecha_salida</label>
              <div class="input-group mb-3 ">

                <input v-model="fecha_salida" type="text" class="form-control" placeholder="fecha de salida..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>
              <label for="">Tiempo_estimado</label>
              <div class="input-group mb-3 ">

                <input v-model="tiempo_estimado_viaje" type="text" class="form-control"
                  placeholder="tiempo estimado de viaje..." aria-label="Recipient's username"
                  aria-describedby="button-addon2">

              </div>
              <label for="">Descripcion</label>
              <div class="input-group mb-3 ">

                <input v-model="descripcion" type="text" class="form-control" placeholder="Descripcion..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>

            </div>
            <div class="modal-footer ">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="guardarRuta"  >Guardar</button>
            </div>
          </div>
        </div>
      </div>



    </div>



  </div>
</template>

<script setup>
import { useRutasStore } from '../stores/rutas';
import { ref, onMounted } from 'vue';


let Rutas = ref([]);

let origen = ref('');
let destino = ref('');
let hora_salida = ref('');
let fecha_salida = ref('');
let tiempo_estimado_viaje = ref('');
let descripcion = ref('')

const userutas = useRutasStore()


async function pedirRutas() {
  let ruta = await userutas.traerRutas()
  console.log(Rutas.data);
  Rutas.value = ruta.data


}

const guardarRuta = async () => {

  try {

    const nuevaRuta = {
      origen: origen.value,
      destino: destino.value,
      hora_salida: hora_salida.value,
      fecha_salida: fecha_salida.value,
      tiempo_estimado_viaje: tiempo_estimado_viaje.value,
      descripcion: descripcion.value
    }

    await userutas.addRutas(nuevaRuta)
    pedirRutas()

    origen.value = ''
    destino.value = ''
    hora_salida.value = ''
    fecha_salida.value = ''
    tiempo_estimado_viaje.value = ''
    descripcion.value = ''

  } catch (error) {
console.log(error);
  }


}

onMounted(() => {
  pedirRutas()

})



</script>

<style scoped>
#color{
background-color: rgb(254, 183, 3);
}
</style>
