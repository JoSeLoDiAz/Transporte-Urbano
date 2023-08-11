<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-sm-6">
          <h5 id="con"><i class="fas fa-users"></i> Conductor</h5>
        </div>
        <div class="col-sm-3"></div>
        <div class="col-sm-2 mt-2">
          <div class="d-grid gap-2">
            <button @click="bd = 1" class="btn btn-success" type="button" data-bs-toggle="modal"
              data-bs-target="#staticBackdrop">
              <i class="fas fa-plus"></i> Nuevo
            </button>
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
                <th id="color" scope="col">Clase Pase</th>
                <th id="color" scope="col">Vigencia Pase</th>
                <th id="color" scope="col">Estado</th>
                <th id="color" scope="col">Opciones</th>
                <th id="color" scope="col">Act / Des</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(conductor, index) in conductores" :key="index">
                <td>{{ conductor.nombre }}</td>
                <td>{{ conductor.cedula }}</td>
                <td>{{ conductor.telefono }}</td>
                <td>{{ conductor.direccion }}</td>
                <td>{{ conductor.clase_pase }}</td>
                <td>{{ formatDate(conductor.vigencia_pase) }}</td>
                <td :class="{ 'activo': conductor.estado, 'inactivo': !conductor.estado }">
                  {{ conductor.estado ? 'Activo' : 'Inactivo' }}
                </td>
                <td>
                  <button @click="editarConductor(conductor)" type="button" class="btn " data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-user-pen"></i>
                  </button>
                </td>
                <td>
                  <label class="switch">
                    <input @click="editEstado(conductor)" v-model="conductor.estado" :checked="conductor.estado"
                      type="checkbox">
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
              <h1 class="modal-title fs-2 " id="staticBackdropLabel">{{ bd == 0 ? "Editar Conductor" : "Guardar Conductor"}}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="salir"></button>
            </div>
            <div class="modal-body">
              <label for="">Nombre</label>
              <div class="input-group mb-3">
                <input v-model="nombre" type="text" class="form-control" placeholder="Nombre..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Cedula</label>
              <div class="input-group mb-3">
                <input v-model="cedula" type="text" class="form-control" placeholder="Cedula..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Telefono</label>
              <div class="input-group mb-3">
                <input v-model="telefono" type="text" class="form-control" placeholder="Telefono..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Direccion</label>
              <div class="input-group mb-3">
                <input v-model="direccion" type="text" class="form-control" placeholder="Direccion..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Clase Pase</label>
              <div class="input-group mb-3">
                <input v-model="clase_pase" type="text" class="form-control" placeholder="Clase de pase..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Vigencia Pase</label>
              <div class="input-group mb-3">
                <input v-model="vigencia_pase" type="date" class="form-control"
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>
            </div>
            <div class="modal-footer">
              <button @click="salir" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-success" @click="guardarConductor">{{ bd == 1 ? "Guardar" : "Editar"
              }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useConductorStore } from '../stores/conductores'
import { ref, onMounted } from 'vue';


let conductores = ref([]);
let nombre = ref('');
let cedula = ref('');
let telefono = ref('');
let direccion = ref('');
let clase_pase = ref('');
let vigencia_pase = ref('')
const useconductor = useConductorStore()
let estado = ref(null);
let bd = ref(1);
let indice = ref(null);
let errores =ref ('')

// Filtro para formatear la fecha en "día-mes-año"
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

async function pedirconductores() {
  try {
    let conductor = await useconductor.traerconductores()
    conductores.value = conductor.data
  } catch (error) {
    console.log(error);
  }
}

//me toco formatear la fecha para el input
const formatDateForInput = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const editarConductor = async (conductorSeleccionado) => {
  try {
    bd.value = 0;
    indice.value = conductorSeleccionado._id;

    // Asignar los valores del conductor al formulario/modal de edición
    nombre.value = conductorSeleccionado.nombre;
    cedula.value = conductorSeleccionado.cedula;
    telefono.value = conductorSeleccionado.telefono;
    direccion.value = conductorSeleccionado.direccion;
    clase_pase.value = conductorSeleccionado.clase_pase;
    vigencia_pase.value = formatDateForInput(conductorSeleccionado.vigencia_pase);
    estado.value = conductorSeleccionado.estado;
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errores.value = error.response.data.errors[0].msg;
    } else if (error.response.data) {
      errores.value = error.response.data.error;
    } else {
      errores.value = "Error interno para editar el conductor,\n Intenta Nuevamente";
    }
  }
};



const editEstado = async (conductorSeleccionado) => {
  if (conductorSeleccionado.estado === true) {
    await useconductor.editEstado(conductorSeleccionado._id, false);
  } else {
    await useconductor.editEstado(conductorSeleccionado._id, true);
  }
};

const cerrarModal = () => {
  const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
  if (closeButton) {
    closeButton.click();
  }
};

const guardarConductor = async () => {
  if (bd.value == 1) {
    try {
      const nuevoConductor = {
        nombre: nombre.value,
        cedula: cedula.value,
        telefono: telefono.value,
        direccion: direccion.value,
        clase_pase: clase_pase.value,
        vigencia_pase: vigencia_pase.value,
        estado: estado.value
      };

      await useconductor.addConductor(nuevoConductor);
      cerrarModal();
      pedirconductores();
      nombre.value = '';
      cedula.value = '';
      telefono.value = '';
      direccion.value = '';
      clase_pase.value = '';
      vigencia_pase.value = '';

      Swal.fire({
       
        icon: 'success',
        title: 'Conductor Guardado',
        text: 'El conductor se ha guardado exitosamente.',
        timer: 1500,
        timerProgressBar: true
      });

    } catch (error) {
      if (error.response && error.response.data.errors) {
        errores.value = error.response.data.errors[0].msg;
      } else if (error.response.data) {
        errores.value = error.response.data.error;
      } else {
        errores.value = "Error interno para Guardar el conductor,\n Intenta Nuevamente";
      } 
      Swal.fire({
        icon: 'error',
        title: errores.value,
        timer:1500
      });
      
    }
  } else {
    try {
      const nuevoConductor = {
        nombre: nombre.value,
        cedula: cedula.value,
        telefono: telefono.value,
        direccion: direccion.value,
        clase_pase: clase_pase.value,
        vigencia_pase: vigencia_pase.value,
        estado: estado.value
      };
      let r = await useconductor.editConductores(indice.value, nuevoConductor);
      cerrarModal();
      pedirconductores();
      nombre.value = '';
      cedula.value = '';
      telefono.value = '';
      direccion.value = '';
      clase_pase.value = '';
      vigencia_pase.value = '';

     
      Swal.fire({
        
        icon: 'success',
        title: 'Conductor Editado',
        text: 'El conductor se ha editado exitosamente.',
        timer: 1500,
        timerProgressBar: true
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        errores.value = error.response.data.errors[0].msg;
      } else if (error.response.data) {
        errores.value = error.response.data.error;
      } else {
        errores.value = "Error interno para Editar el conductor,\n Intenta Nuevamente";
      }
      Swal.fire({
        icon: 'error',
        title: errores.value,
        timer:1500
      });
      
    }
  }
};


function salir() {
  nombre.value = '';
  cedula.value = '';
  telefono.value = '';
  direccion.value = '';
  clase_pase.value = '',
    vigencia_pase.value = '';
}



onMounted(() => {
  pedirconductores()

})



</script>

<style scoped>

  /* desapareces el alerta de errores */
  .hidden {
    display: none;
  }

.container-fluid {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#con {
  font-size: 50px;
}

#color {
  background-color: #1e69e1dc;
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
  --track_color: red;
  --track_active_color: rgb(49, 242, 46);
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
}
</style>
