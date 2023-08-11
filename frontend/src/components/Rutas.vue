<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-sm-6">
          <h5 id="ruta"><i class="fas fa-road"></i> Rutas</h5>
        </div>
        <div class="col-sm-3"></div>
        <div class="col-sm-2 mt-2">
          <div class="d-grid gap-2">
            <button @click="bd = 1" class="btn btn-success" type="button" data-bs-toggle="modal"
              data-bs-target="#staticBackdrop">

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

                <th id="color" scope="col">Origen</th>
                <th id="color" scope="col">Destino</th>
                <th id="color" scope="col">Hora Salida</th>
                <th id="color" scope="col">Fecha Salida</th>
                <th id="color" scope="col">Tiempo Viaje</th>
                <th id="color" scope="col">Descripcion</th>
                <th id="color" scope="col">Estado</th>
                <th id="color" scope="col">Opciones</th>
                <th id="color" scope="col">Act / Des</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ruta, index) in rutas" :key="index">

                <td>{{ ruta.origen }}</td>
                <td>{{ ruta.destino }}</td>
                <td>{{ ruta.hora_salida }}</td>
                <td>{{ formatDate(ruta.fecha_salida) }}</td>
                <td>{{ ruta.tiempo_estimado_viaje }}</td>
                <td>{{ ruta.descripcion }}</td>
                <td :class="{ 'activo': ruta.estado, 'inactivo': !ruta.estado }">
                  {{ ruta.estado ? 'Activo' : 'Inactivo' }}

                </td>
                <td>

                  <button @click="editarrutas(ruta)" type="button" class="btn " data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-user-pen"></i>
                  </button>
                </td>
                <td>
                  <label class="switch">
                    <input @click="editEstado(ruta)" v-model="ruta.estado" :checked="ruta.estado" type="checkbox">
                    <span class="slider"></span>
                  </label>
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
              <h1 class="modal-title fs-2" id="staticBackdropLabel">{{ bd == 0 ? "Editar Ruta" : "Guardar Ruta" }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="salir" ></button>
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

              <label for="">Hora Salida</label>
              <div class="input-group mb-3 ">

                <input v-model="hora_salida" type="time" class="form-control" placeholder="Hora de salida..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>
              <label for="">Fecha Salida</label>
              <div class="input-group mb-3 ">

                <input v-model="fecha_salida" type="date" class="form-control"
                  aria-label="Recipient's username" aria-describedby="button-addon2">

              </div>
              <label for="">Tiempo Estimado </label>
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
              <!-- <div :class="['alert', 'alert-danger', { 'hidden': !errores }]" role="alert">
                <span>{{ errores }}</span>
              </div> -->
              <button  @click="salir" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-success" @click="guardarRuta">{{ bd == 1 ? "Guardar Ruta" : "Editar Ruta"}}</button>
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


let rutas = ref([]);
let estado = ref()
let origen = ref('');
let destino = ref('');
let hora_salida = ref('');
let fecha_salida = ref('');
let tiempo_estimado_viaje = ref('');
let descripcion = ref('')
let bd = ref(1);
let indice = ref(null);
let errores = ref('');

const userutas = useRutasStore()

// Filtro para formatear la fecha en "día-mes-año"
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

async function pedirRutas() {
  let ruta = await userutas.traerRutas()
  rutas.value = ruta.data
}

//me toco formatear la fecha para el input
const formatDateForInput = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};



const editarrutas = async (rutaSeleccionada) => {
  try {
    bd.value = 0;
    indice.value = rutaSeleccionada._id;

    // Asignar los valores de la ruta al formulario/modal de edición
    origen.value = rutaSeleccionada.origen;
    destino.value = rutaSeleccionada.destino;
    hora_salida.value = rutaSeleccionada.hora_salida;
    fecha_salida.value = formatDateForInput(rutaSeleccionada.fecha_salida);
    tiempo_estimado_viaje.value = rutaSeleccionada.tiempo_estimado_viaje;
    descripcion.value = rutaSeleccionada.descripcion;
    estado.value = rutaSeleccionada.estado;
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errores.value = error.response.data.errors[0].msg;
      
    } else if (error.response.data) {
      errores.value = error.response.data.msg;
     
    } else {
      errores.value = "Error interno para editar la Ruta,\n Intenta Nuevamente"
    }
    
  }
};

const editEstado = async (rutaSeleccionada) => {
  if (rutaSeleccionada.estado === true) {
    await userutas.editEstado(rutaSeleccionada._id, false);
  } else {
    await userutas.editEstado(rutaSeleccionada._id, true);
  }
};

const cerrarModal = () => {
  const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
  if (closeButton) {
    closeButton.click();
  }
};

function salir() {
  origen.value = '';
    destino.value = '';
    hora_salida.value = '';
    fecha_salida.value = '';
    tiempo_estimado_viaje.value = '';
    descripcion.value = '';
}

const guardarRuta = async () => {

  if (bd.value == 1) {
    try {
      const nuevaRuta = {
        origen: origen.value,
        destino: destino.value,
        hora_salida: hora_salida.value,
        fecha_salida: fecha_salida.value,
        tiempo_estimado_viaje: tiempo_estimado_viaje.value,
        descripcion: descripcion.value,
        estado: estado.value
      }
      await userutas.addRutas(nuevaRuta);
      cerrarModal()
      pedirRutas();

      origen.value = '';
      destino.value = '';
      hora_salida.value = '';
      fecha_salida.value = '';
      tiempo_estimado_viaje.value = '';
      descripcion.value = '';

      Swal.fire({
        
        icon: 'success',
        title: 'Ruta Guardada',
        text: 'La ruta se ha guardado exitosamente.',
        timer: 1500,
        timerProgressBar: true
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        errores.value = error.response.data.errors[0].msg;
       
      } else if (error.response.data) {
        errores.value = error.response.data.msg;
       
      } else {
        errores.value = "Error interno para Guardar las Rutas,\n Intenta Nuevamente"
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errores.value,
        timer:1500
      });
    }

  } else {
  try {
    const nuevaRuta = {
      origen: origen.value,
      destino: destino.value,
      hora_salida: hora_salida.value,
      fecha_salida: fecha_salida.value,
      tiempo_estimado_viaje: tiempo_estimado_viaje.value,
      descripcion: descripcion.value,
      estado: estado.value
    };
    let r = await userutas.editrutas(indice.value, nuevaRuta);
    cerrarModal()
    pedirRutas();


    origen.value = '';
    destino.value = '';
    hora_salida.value = '';
    fecha_salida.value = '';
    tiempo_estimado_viaje.value = '';
    descripcion.value = '';


    Swal.fire({
        
        icon: 'success',
        title: 'Ruta Editada',
        text: 'La ruta se ha editado exitosamente.',
        timer: 1500,
        timerProgressBar: true
      });
  } catch (error) {
      if (error.response && error.response.data.errors) {
        errores.value = error.response.data.errors[0].msg;
      } else if (error.response.data) {
        errores.value = error.response.data.msg;
      } else {
        errores.value = "Error interno para Editar la Ruta,\n Intenta Nuevamente";
      }
      Swal.fire({
        icon: 'error',
        title: errores.value,
        timer:1500
      });
      
    }
}


}
onMounted(() => {
  pedirRutas()

})



</script>

<style scoped>

/* desapareces el alerta de errores */
.hidden {
    display: none;
  }

  #color {
  background-color: #1e69e1dc;
}
.fa-solid.fa-user-pen {
  font-size: 22px;
  /* Ajusta el tamaño de la fuente según lo necesites */
}

/* The switch - the box around the slider */
.switch {
  /* Variables */
  --switch_width: 2em;
  --switch_height: 1em;
  --thumb_color: #e8e8e8;
  --track_color: red;
  --track_active_color: #15ff00;
  --outline_color: #000;
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: var(--switch_width);
  height: var(--switch_height);
}

.container-fluid {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

#ruta {
  font-size: 50px;
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

.activo {
  color: #15ff00;
  /* Texto verde cuando está activado */


}

.inactivo {
  color: #ff0101;
  /* Texto rojo cuando está desactivado */

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
}
</style>
