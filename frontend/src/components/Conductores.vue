<template  >
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <h5 id="con"><i class="fas fa-id-badge"></i> Conductor</h5>
        </div>
        <div class="col-sm-3"></div>
        <div class="col-sm-2 mt-2">
          <div class="d-grid gap-2">
            <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

              <i class="fas fa-plus"></i> Nuevo</button>

          </div>

        </div>
        <div class="col-sm-1"></div>

      </div>

      <div class="row mt-4">

        <div class="col-sm-12">

          <table class="table table-striped table-hover">
            <thead>
              <tr>

                <th id="color" scope="col">Nombre</th>
                <th id="color" scope="col">Cedula</th>
                <th id="color" scope="col">Telefono</th>
                <th id="color" scope="col">Direccion</th>
                <th id="color" scope="col">Clase_pase</th>
                <th id="color" scope="col">Vigencia_pase</th>
                <th id="color" scope="col">Estado</th>
                <th id="color" scope="col">Opciones</th>
                <th id="color" scope="col">Act / Des</th>
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
                <td :class="{ 'activo': array.estado, 'inactivo': !array.estado }">
                  {{ array.estado ? 'Activo' : 'Inactivo' }}

                </td>
                <td>
                  <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-user-pen"></i>
                  </button>
                </td>
                <td>
                  <label class="switch">
                    <input v-model="array.estado" :checked="array.estado" type="checkbox">
                    <span class="slider"></span>
                  </label>
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

              <input v-model="vigencia_pase" type="date" class="form-control" placeholder="Vigencia de pase..."
                aria-label="Recipient's username" aria-describedby="button-addon2">

            </div>


          </div>
          <div class="modal-footer">
            <div class="alert alert-danger" role="alert">
              A simple primary alert—check it out!
            </div>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" @click="guaradarConductor">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConductorStore } from '../stores/conductores'
import { ref, onMounted } from 'vue';

let estado = ref()
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
      vigencia_pase: vigencia_pase.value,
      estado: estado.value


    }
    await useconductor.addConductor(nuevoConductor);
    pedirconductores();

    nombre.value = ''
    cedula.value = ''
    telefono.value = ''
    direccion.value = ''
    clase_pase.value = ''
    vigencia_pase.value = ''
    estado.value = ''
  } catch (error) {
    console.log(error);
  }

}



onMounted(() => {
  pedirconductores()

})



</script>

<style scoped>
.container-fluid {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#con {
  font-size: 50px;
}

#color {
  background-color: rgb(254, 183, 3);
}

.fa-solid.fa-user-pen {
  font-size: 22px;
  /* Ajusta el tamaño de la fuente según lo necesites */
}

.activo {
  color: #15ff00;
  /* Texto verde cuando está activado */


}

.inactivo {
  color: #ff0101;
  /* Texto rojo cuando está desactivado */

}

/* The switch - the box around the slider */
.switch {
  /* Variables */
  --switch_width: 2em;
  --switch_height: 1em;
  --thumb_color: #e8e8e8;
  --track_color: #15ff00;
  --track_active_color: red;
  --outline_color: #000;
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: var(--switch_width);
  height: var(--switch_height);
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  box-sizing: border-box;
  border: 2px solid var(--outline_color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--track_color);
  transition: .15s;
  border-radius: var(--switch_height);
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: var(--switch_height);
  width: var(--switch_height);
  border: 2px solid var(--outline_color);
  border-radius: 100%;
  left: -2px;
  bottom: -2px;
  background-color: var(--thumb_color);
  transform: translateY(-0.2em);
  box-shadow: 0 0.2em 0 var(--outline_color);
  transition: .15s;
}

input:checked+.slider {
  background-color: var(--track_active_color);
}

input:focus-visible+.slider {
  box-shadow: 0 0 0 2px var(--track_active_color);
}

/* Raise thumb when hovered */
input:hover+.slider:before {
  transform: translateY(-0.3em);
  box-shadow: 0 0.3em 0 var(--outline_color);
}

input:checked+.slider:before {
  transform: translateX(calc(var(--switch_width) - var(--switch_height))) translateY(-0.2em);
}

/* Raise thumb when hovered & checked */
input:hover:checked+.slider:before {
  transform: translateX(calc(var(--switch_width) - var(--switch_height))) translateY(-0.3em);
  box-shadow: 0 0.3em 0 var(--outline_color);
}</style>
