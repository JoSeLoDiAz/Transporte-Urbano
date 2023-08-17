<template>
  <div>
    <div class="container-fluid">

      <div class="row mt-3">
        <div class="col-sm-4">
          <h5 id="as"><i class="fa-solid fa-chair"></i> Asiento</h5>
        </div>
        <div class="col-sm-8">
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">

          <div class="card mt-4">
            <div class="card-body">
              <!-- Select para las rutas -->
              <b>
                <label for="">Seleccione La Ruta</label>
              </b>

              <select class="form-select" aria-label="Default select example" v-model="rutaSeleccionada">
                <option value="">Seleccione...</option>
                <option v-for="ruta in rutas" :key="ruta._id" :value="ruta._id">{{ ruta.nombre }}</option>
              </select>
              <br>


              <!-- Select para los vehículos -->
              <b>
                <form action="">Seleccione El Vehiculo</form>
              </b>

              <select class="form-select" aria-label="Default select example" v-model="vehiculoSeleccionado">
                <option value="">Seleccione...</option>
                <option v-for="vehiculo in vehiculos" :key="vehiculo._id" :value="vehiculo._id">{{
                  vehiculo.numero_autobus }}
                </option>
              </select>
              <br>
              <!-- Campo de entrada para la hora -->
              <b>
                <label for="">Hora</label>
              </b>
              <input :value="horaSalidaDeRutaSeleccionada" type="time" class="form-control" readonly>
              <div>
                <label for="fechaSalida"><b>Fecha de Salida</b></label>
                <input v-model="fechaSalida" type="date" class="form-control" id="fechaSalida" />
              </div>
              <b><!-- Botón de Verificación -->
                <button @click="verificarBoletosVendidos" :disabled="verificandoBoletos" class="btn btn-primary mt-3">
                  {{ verificandoBoletos ? 'Verificando...' : 'Verificar Boletos Vendidos' }}
                </button>

              </b>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div>
            <button v-for="numeroAsiento in numerosDeAsiento" :key="numeroAsiento"
              @click="seleccionarAsiento(numeroAsiento)" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
              id="icono" type="button"
              :class="{ 'btn btn-light mt-4 position-relative': true, 'btn-asiento-vendido': asientosVendidos.includes(numeroAsiento) }"
              :disabled="asientosVendidos.includes(numeroAsiento) || !rutaSeleccionada || !vehiculoSeleccionado || !fechaSalida">
              <i class="fa-solid fa-couch"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border  border-light rounded-circle"
                id="a">
                {{ numeroAsiento }}
                <span class="visually-hidden"></span>
              </span>
            </button>
  


          </div>
        </div>
        <div class="col-sm-4">
          <h4 id="asi">Asientos Vendidos</h4>
          <div style="overflow-y: auto; max-height: 450px; margin-top: 10px;">
            <p v-for="asientoVendido in asientosVendidos" :key="asientoVendido.num_tiket">
              <p>Puesto: {{ asientoVendido.numero_de_puesto }}</p>
              <p>Valor: {{ asientoVendido.valor_puesto }}</p>
              <p>Pasajero: {{ asientoVendido.cliente }}</p>
            </p>
          </div>



        </div>


      </div>


      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Vender ticket</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="cedula">Cedula Del Cliente</label>
              <div class="input-group mb-3 mt-1">
                <input v-model="cedula" id="cedula" type="text" class="form-control" placeholder="Cédula..."
                  aria-label="Cédula" aria-describedby="button-addon2">
              </div>
              <label for="valorPuesto">Valor del Puesto</label>
              <div class="input-group mb-3 mt-1">
                <input v-model="valorPuesto" id="valorPuesto" type="number" class="form-control"
                  placeholder="Valor del puesto..." aria-label="Valor del Puesto" aria-describedby="button-addon2">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="confirmarDatos">Confirmar Datos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';

import { useVenderStore } from '../stores/tiketes';
import { useRutasStore } from '../stores/rutas';
import { useVehiculosStore } from '../stores/vehiculos';
import { useClientStore } from '../stores/clientes';

const rutasStore = useRutasStore();
const vehiculosStore = useVehiculosStore();
const venderStore = useVenderStore();

const cedula = ref('');
const valorPuesto = ref('');
let vehiculoSeleccionadoValor = ref('');

const rutaSeleccionada = ref("");
const vehiculoSeleccionado = ref("");
const rutas = ref([]);
const asientosVendidos = ref([]);
const vehiculos = ref([]);
const fechaSalida = ref('');
const asientoVendido = ref(false);
const verificandoBoletos = ref(false);
const tiketInfo = ref({
  vehiculo: '',
  conductor: '',
  cliente: '',
  ruta: '',
  numero_de_puesto: '',
  valor_puesto: 0,
});
const numeroAsientoSeleccionado = ref(null);

const seleccionarAsiento = (numeroAsiento) => {
  numeroAsientoSeleccionado.value = numeroAsiento;
};

// Obtener la hora de salida de la ruta seleccionada
const horaSalidaDeRutaSeleccionada = computed(() => {
  const ruta = rutas.value.find(ruta => ruta._id === rutaSeleccionada.value);
  return ruta ? ruta.hora_salida : 'Hora no disponible';
});

// Función para obtener las rutas
const obtenerRutas = async () => {
  try {
    const response = await rutasStore.traerRutas();
    rutas.value = response.data;
    console.log("rutas");
    console.log(rutas);

    // Llamar a la función obtenerAsientosVendidos después de obtener las rutas
    await obtenerAsientosVendidos(rutaSeleccionada.value, fechaSalida.value);
  } catch (error) {
    console.error(error);
  }
};



// Función para obtener los vehículos
const obtenerVehiculos = async () => {
  try {
    const response = await vehiculosStore.traerVehiculos();
    vehiculos.value = response;
    console.log("vehiculos");
    console.log(vehiculos);
  } catch (error) {
    console.error(error);
  }
};



// Propiedad calculada para generar un arreglo de números de asientos
const numerosDeAsiento = computed(() => {
  vehiculoSeleccionadoValor = vehiculoSeleccionado.value;
  const vehiculoEncontrado = vehiculos.value.find(vehiculo => vehiculo._id === vehiculoSeleccionadoValor);
  if (vehiculoEncontrado) {
    const cantidadDeAsientos = vehiculoEncontrado.numero_puestos;
    return Array.from({ length: cantidadDeAsientos }, (_, index) => index + 1);
  }
  return [];
});

// Función para obtener los asientos vendidos
const obtenerAsientosVendidos = async () => {
  if (rutaSeleccionada.value && vehiculoSeleccionado.value && fechaSalida.value) {
    try {
      
      const response = await venderStore.obtenerAsientosVendidos(rutaSeleccionada.value, fechaSalida.value);
      console.log("res", response);
      asientosVendidos.value = response.data.map(asiento => asiento.numero_de_puesto);
      console.log(asientosVendidos.value);
    } catch (error) {
      console.error(error);
    }
  }
};

const verificarBoletosVendidos = async () => {
  if (rutaSeleccionada.value && vehiculoSeleccionado.value && fechaSalida.value) {
    try {
      verificandoBoletos.value = true;
      await obtenerAsientosVendidos();

      // Deshabilitar botones y aplicar color verde a asientos vendidos
      const buttons = document.querySelectorAll('.btn-asiento');
      buttons.forEach(button => {
        const numeroAsiento = parseInt(button.dataset.numeroAsiento);
        const isVendido = asientosVendidos.value.includes(numeroAsiento);
        button.disabled = isVendido;
        button.classList.toggle('btn-asiento-vendido', isVendido);
      });

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Los boletos vendidos han sido verificados',
      });
    } catch (error) {
      console.error(error);
    } finally {
      verificandoBoletos.value = false;
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Campos Incompletos',
      text: 'Por favor, seleccione una ruta, un vehículo y una fecha de salida',
    });
  }
};


// Función para cargar asientos vendidos y actualizar botones
const cargarAsientosVendidos = async () => {
  try {
    await obtenerAsientosVendidos();

    // Habilitar/Deshabilitar botones y aplicar color verde
    const buttons = document.querySelectorAll('.btn-asiento');
    buttons.forEach(button => {
      const numeroAsiento = parseInt(button.dataset.numeroAsiento);
      const isVendido = asientosVendidos.value.includes(numeroAsiento);
      button.disabled = isVendido;
      button.classList.toggle('btn-asiento-vendido', isVendido);
    });
  } catch (error) {
    console.error(error);
  }
};



const cerrarModal = () => {
  const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
  if (closeButton) {
    closeButton.click();
  }
};

const confirmarDatos = async () => {
  if (rutaSeleccionada.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, asigne una ruta primero',
    });
    return;
  } else if (!cedula.value) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingrese una cédula válida',
    });
    return;
  } else if (valorPuesto.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingrese un valor',
    });
    return;
  } else if (fechaSalida.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, elija una fecha de salida',
    });
    return;
  }

  const clientStore = useClientStore();
  const clientes = await clientStore.traerclientes();
  const clienteExistente = clientes.data.find(cliente => cliente.cc === cedula.value);

  if (clienteExistente) {
    cerrarModal();

    const tiketsStore = useVenderStore();
    const vehiculoSeleccionadoValor = vehiculoSeleccionado.value;
    const vehiculoEncontrado = vehiculos.value.find(vehiculo => vehiculo._id === vehiculoSeleccionadoValor);
    const rutaSeleccionadaValor = rutaSeleccionada.value;
    const rutaEncontrada = rutas.value.find(ruta => ruta._id === rutaSeleccionadaValor);
    const precioPuesto = valorPuesto.value;

    tiketInfo.vehiculo = vehiculoEncontrado._id;
    tiketInfo.cliente = clienteExistente._id;
    tiketInfo.ruta = rutaEncontrada._id;
    tiketInfo.fecha_salida = `${fechaSalida.value}`;
    tiketInfo.numero_de_puesto = numeroAsientoSeleccionado.value;
    tiketInfo.valor_puesto = valorPuesto.value;

    // Mostrar la alerta de confirmación de datos
    const confirmResult = await Swal.fire({
      icon: 'info',
      title: 'Confirmar Datos',
      html: `
      <p><strong>Vehículo:</strong> ${vehiculoEncontrado.numero_autobus}</p>
        <p><strong>Conductor:</strong> ${vehiculoEncontrado.cedula_conductor.nombre}</p>
        <p><strong>Cédula del Cliente:</strong> ${clienteExistente.cc}</p>
        <p><strong>Nombre del Cliente:</strong> ${clienteExistente.nombre} ${clienteExistente.apellido}</p>
        <p><strong>Origen de la Ruta:</strong> ${rutaEncontrada.origen}</p>
        <p><strong>Fecha de Salida:</strong> ${fechaSalida.value} Hora ${rutaEncontrada.hora_salida}</p>
        <p><strong>Destino de la Ruta:</strong> ${rutaEncontrada.destino}</p>
        <p><strong>Número de Puesto:</strong> ${numeroAsientoSeleccionado.value}</p>
        <p><strong>Valor del Puesto $:</strong> ${valorPuesto.value}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    });

    // Si el usuario confirma, guardar el ticket en la base de datos
    if (confirmResult.isConfirmed) {
      try {
        console.log(tiketInfo);
        await tiketsStore.addTiket(tiketInfo);
        cerrarModal();

        // Actualizar la lista de asientos vendidos
        await obtenerAsientosVendidos();

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El ticket se ha guardado correctamente',
        });
        // Ticket vendido exitosamente
        asientoVendido.value = true;

        // Obtener asientos vendidos actualizados
        await obtenerAsientosVendidos();
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al guardar el ticket',
        });
      }
    }
  } else {
    // Mostrar SweetAlert si el cliente no existe
    Swal.fire({
      icon: 'info',
      title: 'Cédula no encontrada',
      text: 'La cédula no existe en la base de datos de clientes. Por favor, registre a la persona.',
    });
  }
};


// Llamar a las funciones necesarias cuando el componente se monte
onMounted(() => {
  obtenerRutas();
  obtenerVehiculos();
  cargarAsientosVendidos();
});
</script>

  
<style scoped>

.bg-success {
  background-color: green;
}
#icono {
  box-shadow: 0px 12px 12px 12px rgba(0, 0, 0, 0.364);

  padding: 10px;
  margin: 0 18px;
  font-size: 48px;
  align-self: center;
  background-color: white;
}

/* Aplicar color verde a botones de asiento vendido */
.btn-asiento-vendido {
  background-color: green;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

#asi {

  position: sticky;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-fluid {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#icono {
  position: relative;
}

#as {
  font-size: 50px;
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