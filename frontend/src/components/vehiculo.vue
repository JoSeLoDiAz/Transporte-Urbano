<template>
    <div>
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col-sm-6">
                    <h5 id="bus"><i class="fas fa-bus"></i> Vehiculo</h5>
                </div>
                <div class="col-sm-3"></div>
                <div class="col-sm-2 mt-2">
                    <div class="d-grid gap-2">
                        <button @click="bd = 1; limpiarCampos()" class="btn btn-success" type="button"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
                                <th id="color" scope="col">Matricula</th>
                                <th id="color" scope="col">Numero autobus</th>
                                <th id="color" scope="col">Can Puestos</th>
                                <th id="color" scope="col">Marca</th>
                                <th id="color" scope="col">Modelo</th>
                                <th id="color" scope="col">Numero Licencia</th>
                                <th id="color" scope="col">Fecha Vencimiento</th>
                                <th id="color" scope="col">Nombre Conductor</th>
                                <th id="color" scope="col">Cedula</th>
                                <th id="color" scope="col">Estado</th>
                                <th id="color" scope="col">Opciones</th>
                                <th id="color" scope="col">Act / Des</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(vehiculo, i) in vehiculos" :key="i">
                                <td>{{ vehiculo.matricula_vehiculo }}</td>
                                <td>{{ vehiculo.numero_autobus }}</td>
                                <td>{{ vehiculo.numero_puestos }}</td>
                                <td>{{ vehiculo.marca }}</td>
                                <td>{{ vehiculo.modelo }}</td>
                                <td>{{ vehiculo.numero_licencia_transito }}</td>
                                <td>{{ formatDate(vehiculo.fecha_vencimiento_seguro) }}</td>
                                <td>{{ vehiculo.cedula_conductor.nombre }}</td>
                                <td>{{ vehiculo.cedula_conductor.cedula }}</td>
                                <td :class="{ activo: vehiculo.estado, inactivo: !vehiculo.estado }">
                                    {{ vehiculo.estado ? "Activo" : "Inactivo" }}
                                </td>

                                <td>
                                    <button @click="editVehiculo(vehiculo)" id="editar" type="button" class="btn"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <i class="fa-solid fa-user-pen"></i>
                                    </button>
                                </td>
                                <td>
                                    <label class="switch">
                                        <input @click="editEstado(vehiculo)" v-model="vehiculo.estado"
                                            :checked="vehiculo.estado" type="checkbox" />
                                        <span class="slider"></span>
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal -->
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-2" id="staticBackdropLabel">
                                {{ bd === 0 ? "Editar Vehiculo" : "Guardar Vehiculo" }}
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                @click="limpiarCampos"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="">Matrícula del vehículo</label>
                                    <div class="input-group mb-3">
                                        <input v-model="matricula_vehiculo" type="text" class="form-control"
                                            placeholder="Matrícula del vehículo..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Número de autobús</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_autobus" type="text" class="form-control"
                                            placeholder="Número de autobús..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Número de puestos</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_puestos" type="number" class="form-control"
                                            placeholder="Número de puestos..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Nombre del conductor</label>
                                    <select v-model="cedula_conductor" class="form-control">
                                        <option value="">Seleccione...</option>
                                        <option v-for="conductor in conductores" :key="conductor.cedula"
                                            :value="conductor.cedula">
                                            {{ conductor.nombre }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    <label for="">Marca</label>
                                    <div class="input-group mb-3">
                                        <input v-model="marca" type="text" class="form-control" placeholder="Marca..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Modelo</label>
                                    <div class="input-group mb-3">
                                        <input v-model="modelo" type="text" class="form-control" placeholder="Modelo..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Fecha de vencimiento del seguro</label>
                                    <div class="input-group mb-3">
                                        <input v-model="fecha_vencimiento_seguro" type="date" class="form-control"
                                            aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Número de licencia de tránsito</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_licencia_transito" type="text" class="form-control"
                                            placeholder="Número de licencia de tránsito..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="limpiarCampos" type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-success" @click="guardarVehiculo">
                                {{ bd === 1 ? "Guardar" : "Editar" }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVehiculosStore } from "../stores/vehiculos";
import { ref, onMounted } from "vue";

const vehiculosStore = useVehiculosStore();
const vehiculos = ref([]);

let numero_autobus = ref("");
let cedula_conductor = ref("");
let matricula_vehiculo = ref("");
let numero_puestos = ref("");
let conductores = ref([]);
let marca = ref("");
let modelo = ref("");
let fecha_vencimiento_seguro = ref("");
let numero_licencia_transito = ref("");
let errores = ref('');
let estado = ref(null);
let bd = ref(1);
let indice = ref(null);

// Función para obtener el nombre del conductor a partir de la cédula
const obtenerNombreConductor = async (id) => {
    try {
        const response = await vehiculosStore.obtenerNombreConductor(id);
        if (response && response.data && response.data.cedula) {
            const cedulaConductor = response.data.cedula;
            return response.data.nombre;
        } else {
            return 'Nombre Desconocido';
        }
    } catch (error) {
        console.error(error);
        return 'Nombre Desconocido';
    }
};






// Función para obtener la lista de conductores
const obtenerConductores = async () => {
    try {
        const conductoresResponse = await vehiculosStore.obtenerConductores();
        conductores.value = conductoresResponse;
    } catch (error) {
        console.error(error);
    }
};

// Función para pedir los vehículos
const pedirvehiculos = async () => {
    try {
        const vehiculoResponse = await vehiculosStore.traerVehiculos();

        vehiculos.value = await Promise.all(vehiculoResponse.map(async (vehiculo) => {
            const nombre_conductor = await obtenerNombreConductor(vehiculo.cedula_conductor.cedula); // Cambio aquí

            return {
                ...vehiculo,
                nombre_conductor,
            };
        }));
    } catch (error) {
    }
};



// Función para formatear la fecha en "día-mes-año"
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

// Función para formatear la fecha para el input
const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Función para editar un vehículo
const editVehiculo = async (vehiculoSeleccionado) => {
    try {
        bd.value = 0;
        indice.value = vehiculoSeleccionado._id;

        // Asignar los valores del vehículo al formulario/modal de edición
        numero_autobus.value = vehiculoSeleccionado.numero_autobus.toUpperCase();
        cedula_conductor.value = vehiculoSeleccionado.cedula_conductor.cedula; // Obtener solo el valor de la cédula
        matricula_vehiculo.value = vehiculoSeleccionado.matricula_vehiculo.toUpperCase();
        numero_puestos.value = vehiculoSeleccionado.numero_puestos;
        marca.value = vehiculoSeleccionado.marca;
        modelo.value = vehiculoSeleccionado.modelo;
        fecha_vencimiento_seguro.value =
            formatDateForInput(vehiculoSeleccionado.fecha_vencimiento_seguro);
        numero_licencia_transito.value =
            vehiculoSeleccionado.numero_licencia_transito;
        estado.value = vehiculoSeleccionado.estado;
    } catch (error) {
        // Manejar el error aquí
    }
};

// Función para limpiar los campos del formulario
const limpiarCampos = () => {
    numero_autobus.value = "";
    cedula_conductor.value = "";
    matricula_vehiculo.value = "";
    numero_puestos.value = "";
    marca.value = "";
    modelo.value = "";
    fecha_vencimiento_seguro.value = "";
    numero_licencia_transito.value = "";
    estado.value = null;
    bd.value = 1;
    indice.value = null;
};

// Función para editar el estado de un vehículo
const editEstado = async (vehiculoSeleccionado) => {
    try {
        const nuevoEstado = !vehiculoSeleccionado.estado;
        await vehiculosStore.editEstado(vehiculoSeleccionado._id, nuevoEstado);
        vehiculoSeleccionado.estado = nuevoEstado;
    } catch (error) {
        // Manejar el error aquí
    }
};

// Función para guardar un vehículo
const guardarVehiculo = async () => {
    if (bd.value === 1) {
        try {
            // Verificar si el conductor ya tiene un vehículo asignado
            const conductorAsignado = vehiculos.value.find(vehiculo => vehiculo.cedula_conductor.cedula === cedula_conductor.value);
            if (conductorAsignado) {
                errores.value = "Este conductor ya tiene un vehículo asignado";
                Swal.fire({
                    icon: 'error',
                    title: errores.value,
                    timer: 1500,
                });
                return;
            }


            const nuevoVehiculo = {
                numero_autobus: numero_autobus.value.toUpperCase(),
                cedula_conductor: cedula_conductor.value.toUpperCase(),
                matricula_vehiculo: matricula_vehiculo.value.toUpperCase(),
                numero_puestos: numero_puestos.value,
                marca: marca.value.toUpperCase(),
                modelo: modelo.value.toUpperCase(),
                fecha_vencimiento_seguro: fecha_vencimiento_seguro.value,
                numero_licencia_transito: numero_licencia_transito.value.toUpperCase(),
                estado: estado.value,
            };

            await vehiculosStore.addVehiculo(nuevoVehiculo);
            cerrarModal();
            pedirvehiculos();
            limpiarCampos();

            Swal.fire({
                icon: 'success',
                title: 'Vehículo agregado correctamente',
                timer: 1500,
            });
        } catch (error) {
            erroresVehiculo(error)
        }
    } else {
        try {
            const nuevoVehiculo = {
                numero_autobus: numero_autobus.value.toUpperCase(),
                cedula_conductor: cedula_conductor.value.toUpperCase(),
                matricula_vehiculo: matricula_vehiculo.value.toUpperCase(),
                numero_puestos: numero_puestos.value,
                marca: marca.value.toUpperCase(),
                modelo: modelo.value.toUpperCase(),
                fecha_vencimiento_seguro: fecha_vencimiento_seguro.value,
                numero_licencia_transito: numero_licencia_transito.value.toUpperCase(),
            };

            await vehiculosStore.editVehiculo(indice.value, nuevoVehiculo);
            cerrarModal();
            pedirvehiculos();
            limpiarCampos();

            Swal.fire({
                icon: 'success',
                title: 'Vehículo editado correctamente',
                timer: 1500,
            });
        } catch (error) {
            erroresVehiculo(error)
        }
    }
};

const erroresVehiculo = (error) => {
    if (error.response && error.response.data) {
        if (error.response.data.errors) {
            const errorMsg = error.response.data.errors[0].msg || "Error interno para guardar/editar el vehículo";
            errores.value = errorMsg;
        } else if (error.response.data.error) {
            errores.value = error.response.data.error;
        } else {
            errores.value = "Error interno para guardar/editar el vehículo";
        }
    } else {
        errores.value = "Error interno para guardar/editar el vehículo";
    }
    Swal.fire({
        icon: 'error',
        title: errores.value,
        timer: 1500,
    });
};

const cerrarModal = () => {
    const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
    if (closeButton) {
        closeButton.click();
    }
};

// Llamar a las funciones necesarias cuando el componente se monte
onMounted(() => {
    pedirvehiculos();
    obtenerConductores();

});
</script>


<style scoped>
/* desapareces el alerta de errores */
.hidden {
    display: none;
}

#color {
    background-color: #1e69e1dc;
}

#bus {
    font-size: 50px;
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

.fa-solid.fa-user-pen {
    font-size: 22px;
    /* Ajusta el tamaño de la fuente según lo necesites */
}

.container-fluid {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
    transition: 0.15s;
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
    transition: 0.15s;
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