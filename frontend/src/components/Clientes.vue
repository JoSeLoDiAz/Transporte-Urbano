
<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-sm-6">
          <h5 id="cli"><i class="fas fa-users"></i> Clientes</h5>
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
                <th id="color" scope="col">Apellido</th>
                <th id="color" scope="col">Cedula</th>
                <th id="color" scope="col">Telefono</th>
                <th id="color" scope="col">Estado</th>

                <th id="color" scope="col">Opciones</th>
                <th id="color" scope="col">Act / Des</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cliente, index) in clientes" :key="index">
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.apellido }}</td>
                <td>{{ cliente.cc }}</td>
                <td>{{ cliente.telefono }}</td>
                <td :class="{ 'activo': cliente.estado, 'inactivo': !cliente.estado }">
                  {{ cliente.estado ? 'Activo' : 'Inactivo' }} </td>
                <td>
                  <button @click="editarCliente(cliente)" type="button" class="btn " data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-user-pen"></i>
                  </button>
                </td>
                <td>
                  <label class="switch">
                    <input @click="editEstado(cliente)" v-model="cliente.estado" :checked="cliente.estado"
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
              <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ bd == 0 ? "Editar Cliente" : "Guardar Cliente" }}
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="salir"></button>
            </div>
            <div class="modal-body">
              <label for="">Nombre</label>
              <div class="input-group mb-3">
                <input v-model="nombre" type="text" class="form-control" placeholder="Nombre..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Apellido</label>
              <div class="input-group mb-3">
                <input v-model="apellido" type="text" class="form-control" placeholder="Apellido"
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Cedula</label>
              <div class="input-group mb-3">
                <input v-model="cc" type="text" class="form-control" placeholder="Cédula..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>

              <label for="">Telefono</label>
              <div class="input-group mb-3">
                <input v-model="telefono" type="text" class="form-control" placeholder="Teléfono..."
                  aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>
            </div>
            <div class="modal-footer">
              <button @click="salir" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-success" @click="guardarCliente">{{ bd == 0 ? "Editar" : "Guardar"
              }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClientStore } from '../stores/clientes';
import { ref, onMounted } from 'vue';

let clientes = ref([]);
const useclientes = useClientStore();
let nombre = ref('');
let apellido = ref('');
let cc = ref('');
let telefono = ref('');
let errores = ref('');


let estado = ref(null);
let bd = ref(1);
let indice = ref(null);


async function pedirclientes() {
  try {
    const cliente = await useclientes.traerclientes();
    clientes.value = cliente.data;
  } catch (error) {
    console.log(error);
  }
}
const editarCliente = async (clienteSeleccionado) => {
  try {
    bd.value = 0;
    indice.value = clienteSeleccionado._id;

    // Asignar los valores del cliente al formulario/modal de edición
    nombre.value = clienteSeleccionado.nombre;
    apellido.value = clienteSeleccionado.apellido;
    cc.value = clienteSeleccionado.cc;
    telefono.value = clienteSeleccionado.telefono;
    estado.value = clienteSeleccionado.estado;
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errores.value = error.response.data.errors[0].msg;
    } else if (error.response.data) {
      errores.value = error.response.data.error;
    } else {
      errores.value = "Error interno para editar el cliente,\n Intenta Nuevamente"
    }
  }
};


const editEstado = async (clienteSeleccionado) => {
  try {
    if (clienteSeleccionado.estado === true) {
      await useclientes.editEstado(clienteSeleccionado._id, false);
    } else {
      await useclientes.editEstado(clienteSeleccionado._id, true);
    }
  } catch (error) {
    console.error('Error en editEstado:', error);
  }
};

const cerrarModal = () => {
  const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
  if (closeButton) {
    closeButton.click();
  }
};

const guardarCliente = async () => {
  if (bd.value === 1) {
    try {
      const nuevoCliente = {
        nombre: nombre.value,
        apellido: apellido.value,
        cc: cc.value,
        telefono: telefono.value,
        estado: estado.value
      };

      await useclientes.addClient(nuevoCliente);
      cerrarModal()
      pedirclientes();
      nombre.value = '';
      apellido.value = '';
      cc.value = '';
      telefono.value = '';

      Swal.fire({
        icon: 'success',
        title: 'Cliente Guardado',
        text: 'El cliente se ha guardado exitosamente.',
        timer: 1500,
        timerProgressBar: true
      });

    } catch (error) {
      if (error.response && error.response.data.errors) {
        errores.value = error.response.data.errors[0].msg;


      } else if (error.response.data) {
        errores.value = error.response.data.error;
      }
      else {
        errores.value = 'Error interno para Guardar el cliente,\n Intenta Nuevamente';
      }
      Swal.fire({
        icon: 'error',
        title: errores.value,
        timer: 1500
      });

    }
  } else {
    try {
      const nuevoCliente = {
        nombre: nombre.value,
        apellido: apellido.value,
        cc: cc.value,
        telefono: telefono.value,
        estado: estado.value
      };

      let r = await useclientes.editClient(indice.value, nuevoCliente);
      cerrarModal()
      pedirclientes();
      nombre.value = '';
      apellido.value = '';
      cc.value = '';
      telefono.value = '';

      Swal.fire({

        icon: 'success',
        title: 'Cliente Editado',
        text: 'El cliente se ha editado exitosamente.',
        timer: 1500,
        timerProgressBar: true
      });

    } catch (error) {
      if (error.response && error.response.data.errors) {
        errores.value = error.response.data.errors[0].msg;
      } else if (error.response.data) {
        errores.value = error.response.data.error;
      } else {
        errores.value = 'Error interno para Editar el cliente,\n Intenta Nuevamente';
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errores.value,
        timer: 1500,
      });

    }
  }
};

function salir() {
  nombre.value = ''
  apellido.value = ''
  cc.value = ''
  telefono.value = ''
}

onMounted(() => {
  pedirclientes();
});
</script>

<style scoped>
.activo {
  color: #15ff00;
  /* Texto verde cuando está activado */
  /* desapareces el alerta de errores */
}

j .hidden {
  display: none;
}



.inactivo {
  color: #ff0101;
  /* Texto rojo cuando está desactivado */

}

.fa-solid.fa-user-pen {
  font-size: 22px;
  /* Ajusta el tamaño de la fuente según lo necesites */
}

#color {
  background-color: #1e69e1dc;
}


/* The switch - the box around the slider */
.switch {
  /* Variables */
  --switch_width: 2em;
  --switch_height: 1em;
  --thumb_color: #e8e8e8;
  --track_color: #ff0d00;
  --track_active_color: rgb(0, 255, 38);
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

#cli {
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

.container-fluid {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Raise thumb when hovered & checked */
input:hover:checked+.slider:before {
  transform: translateX(calc(var(--switch_width) - var(--switch_height))) translateY(-0.3em);
  box-shadow: 0 0.3em 0 var(--outline_color);
}
</style>
