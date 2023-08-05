<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <h5 id="bus"><i class="fas fa-bus"></i> Vehiculo</h5>
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
                                <th id="color" scope="col">Num autobus</th>
                                <th id="color" scope="col">Nombre_conductor</th>
                                <th id="color" scope="col">Cedula_conductor</th>
                                <th id="color" scope="col">Matricula</th>
                                <th id="color" scope="col">Num_puestos</th>
                                <th id="color" scope="col">Marca</th>
                                <th id="color" scope="col">Modelo</th>
                                <th id="color" scope="col">Fecha_vencimiento</th>
                                <th id="color" scope="col">Numero_licencia</th>
                                <th id="color" scope="col">Estado</th>
                                <th id="color" scope="col">Opciones</th>
                                <th id="color" scope="col">Act / Des</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(array, i) in vehiculos" :key="i">
                                <td>{{ array.numero_autobus }}</td>
                                <td>{{ array.nombre_conductor }}</td>
                                <td>{{ array.cedula_conductor }}</td>
                                <td>{{ array.matricula_vehiculo }}</td>
                                <td>{{ array.numero_puestos }}</td>
                                <td>{{ array.marca }}</td>
                                <td>{{ array.modelo }}</td>
                                <td>{{ array.fecha_vencimiento_seguro }}</td>
                                <td>{{ array.numero_licencia_transito }}</td>
                                <td :class="{ activo: array.estado, inactivo: !array.estado }">
                                    {{ array.estado ? "Activo" : "Inactivo" }}
                                </td>

                                <td>
                                    <button @click="editVehiculo(array)" id="editar" type="button" class="btn"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <i class="fa-solid fa-user-pen"></i>
                                    </button>
                                </td>
                                <td>
                                    <label class="switch">
                                        <input @click="editEstado(array)" v-model="array.estado" :checked="array.estado"
                                            type="checkbox" />
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
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">
                                {{ bd == 0 ? "Editar Vehiculo" : "Guardar Vehiculo" }}
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                @click="limpiarCampos"> </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="">Número de autobús</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_autobus" type="text" class="form-control"
                                            placeholder="Número de autobús..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Nombre del conductor</label>
                                    <div class="input-group mb-3">
                                        <input v-model="nombre_conductor" type="text" class="form-control"
                                            placeholder="Nombre del conductor..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Cédula del conductor</label>
                                    <div class="input-group mb-3">
                                        <input v-model="cedula_conductor" type="text" class="form-control"
                                            placeholder="Cédula del conductor..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Matrícula del vehículo</label>
                                    <div class="input-group mb-3">
                                        <input v-model="matricula_vehiculo" type="text" class="form-control"
                                            placeholder="Matrícula del vehículo..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>

                                    <label for="">Número de puestos</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_puestos" type="number" class="form-control"
                                            placeholder="Número de puestos..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                    </div>
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
                                            placeholder="Fecha de vencimiento del seguro..."
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
                            <div :class="['alert', 'alert-danger', { 'hidden': !errores }]" role="alert">
                                <span>{{ errores }}</span>
                            </div>
                            <button @click="limpiarCampos" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                            <button type="button" class="btn btn-success" @click="guardarvehiculo">
                                {{ bd == 1 ? "Guardar" : "Editar" }}
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
let nombre_conductor = ref("");
let cedula_conductor = ref("");
let matricula_vehiculo = ref("");
let numero_puestos = ref("");
let marca = ref("");
let modelo = ref("");
let fecha_vencimiento_seguro = ref("");
let numero_licencia_transito = ref("");
let errores = ref('');
let estado = ref(null);
let bd = ref(1);
let indice = ref(null);

const limpiarAlert = () => {
    setTimeout(() => {
        errores.value = ''; // Restablecer el valor de errores después de 2 segundos
    }, 2000);
}

async function pedirvehiculos() {
    try {
        const vehiculo = await vehiculosStore.traervehiculos();
        vehiculos.value = vehiculo.data;
    } catch (error) {
        console.log(error);
    }
}

const editVehiculo = async (vehiculoSeleccionado) => {
    try {
        bd.value = 0;
        indice.value = vehiculoSeleccionado._id;

        // Asignar los valores del vehículo al formulario/modal de edición
        numero_autobus.value = vehiculoSeleccionado.numero_autobus;
        nombre_conductor.value = vehiculoSeleccionado.nombre_conductor;
        cedula_conductor.value = vehiculoSeleccionado.cedula_conductor;
        matricula_vehiculo.value = vehiculoSeleccionado.matricula_vehiculo;
        numero_puestos.value = vehiculoSeleccionado.numero_puestos;
        marca.value = vehiculoSeleccionado.marca;
        modelo.value = vehiculoSeleccionado.modelo;
        fecha_vencimiento_seguro.value =
            vehiculoSeleccionado.fecha_vencimiento_seguro;
        numero_licencia_transito.value =
            vehiculoSeleccionado.numero_licencia_transito;
        estado.value = vehiculoSeleccionado.estado;
    } catch (error) {
        if (error.response && error.response.data.errors) {
            errores.value = error.response.data.errors[0].msg;
            // console.log(`error0: ${errores.value}`);
        } else if (error.response.data) {
            errores.value = error.response.data.msg;
            // console.log(`error0: ${errores.value}`);
        } else {
            errores.value = "Error interno para editar el Vehiculo,\n Intenta Nuevamente"
        }
        limpiarAlert()
    }
};


const limpiarCampos = () => {
    numero_autobus.value = "";
    nombre_conductor.value = "";
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


const editEstado = (vehiculoSeleccionado) => {
    if (vehiculoSeleccionado.estado === true) {
        vehiculosStore.editEstado(vehiculoSeleccionado._id, false);
    } else {
        vehiculosStore.editEstado(vehiculoSeleccionado._id, true);
    }
};

const guardarvehiculo = async () => {
    console.log(bd.value);
    if (bd.value === 1) {
        try {
            const nuevovehiculo = {
                numero_autobus: numero_autobus.value,
                nombre_conductor: nombre_conductor.value,
                cedula_conductor: cedula_conductor.value,
                matricula_vehiculo: matricula_vehiculo.value,
                numero_puestos: numero_puestos.value,
                marca: marca.value,
                modelo: modelo.value,
                fecha_vencimiento_seguro: fecha_vencimiento_seguro.value,
                numero_licencia_transito: numero_licencia_transito.value,
                estado: estado.value,
            };
            await vehiculosStore.addvehiculo(nuevovehiculo);
            pedirvehiculos();
            limpiarCampos();

        } catch (error) {
            if (error.response && error.response.data.errors) {
                errores.value = error.response.data.errors[0].msg;
                // console.log(`error0: ${errores.value}`);
            } else if (error.response.data) {
                errores.value = error.response.data.msg;
                // console.log(`error0: ${errores.value}`);
            } else {
                errores.value = "Error interno para editar el Vehiculo,\n Intenta Nuevamente"
            }
            limpiarAlert()
        }
    } else {
        try {
            const nuevovehiculo = {
                numero_autobus: numero_autobus.value,
                nombre_conductor: nombre_conductor.value,
                cedula_conductor: cedula_conductor.value,
                matricula_vehiculo: matricula_vehiculo.value,
                numero_puestos: numero_puestos.value,
                marca: marca.value,
                modelo: modelo.value,
                fecha_vencimiento_seguro: fecha_vencimiento_seguro.value,
                numero_licencia_transito: numero_licencia_transito.value,
            };
            let r = await vehiculosStore.editVehiculo(indice.value, nuevovehiculo);
            console.log(r);
            pedirvehiculos();
            limpiarCampos();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                errores.value = error.response.data.errors[0].msg;
            } else if (error.response.data) {
                errores.value = error.response.data.msg;
            } else {
                errores.value = "Error interno para Editar el Vehiculo,\n Intenta Nuevamente";
            }
            limpiarAlert()
        }
    }

};
onMounted(() => {
    pedirvehiculos();
});
</script>

<style scoped>
/* desapareces el alerta de errores */
.hidden {
    display: none;
}

#color {
    background-color: rgb(254, 183, 3);
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
    --track_color: #15ff00;
    --track_active_color: red;
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