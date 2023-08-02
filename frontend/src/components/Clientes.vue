
<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <h5>Clientes</h5>
        </div>
        <div class="col-sm-3"></div>
        <div class="col-sm-2 mt-2">
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Nuevo
            </button>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>

      <div class="row mt-4">
        <div class="col-sm-12">
          <table class="table table-striped table-hover">
            <thead>
              <tr  >
                <th id="color" scope="col">nombre</th>
                <th id="color" scope="col">apellido</th>
                <th id="color" scope="col">cc</th>
                <th id="color" scope="col">telefono</th>
                <th id="color" scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cliente, index) in clientes" :key="index">
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.apellido }}</td>
                <td>{{ cliente.cc }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>
                  <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    @click="editar(cliente)">
                    Editar 📝
                  </button>
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
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Clientes</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

              <label for="">CC</label>
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
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="guardarCliente">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClientStore } from '../../stores/clientes';
import { ref, onMounted } from 'vue';

let clientes = ref([]);
const useclientes = useClientStore();
let nombre = ref('');
let apellido = ref('');
let cc = ref('');
let telefono = ref('');

async function pedirclientes() {
  try {
    const cliente = await useclientes.traerclientes();
    clientes.value = cliente.data;
  } catch (error) {
    console.log(error);
  }
}

// function editar(cliente) {
//   // Rellenar los campos del formulario con los datos del cliente seleccionado
//   nombre.value = cliente.nombre;
//   apellido.value = cliente.apellido;
//   cc.value = cliente.cc;
//   telefono.value = cliente.telefono;
//   clienteSeleccionado.value = cliente;
//   modoEdicion.value = true;
// }

const guardarCliente = async () => {
  try {
    // Creamos un objeto con la información del nuevo cliente
    const nuevoCliente = {
      nombre: nombre.value,
      apellido: apellido.value,
      cc: cc.value,
      telefono: telefono.value,
    };

    // Llamamos a la función addClient de la tienda para enviar la información al servidor
    await useclientes.addClient(nuevoCliente);

    // Una vez agregado el cliente correctamente, volvemos a pedir la lista actualizada
    pedirclientes();



    // Limpiamos los campos del formulario después de guardar el cliente (opcional)
    nombre.value = '';
    apellido.value = '';
    cc.value = '';
    telefono.value = '';
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  pedirclientes();
});
</script>

<style scoped>

#color{
background-color: rgb(254, 183, 3);
}
</style>
