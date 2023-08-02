
<template>
    <div>
        <div class="container-fluid">

            <div class="row">
                <div class="col-sm-6">
                    <h5>vehiculo</h5>
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

                                <th id="color" scope="col">numero_autobus</th>
                                <th id="color" scope="col">nombre_conductor</th>
                                <th id="color" scope="col">cedula_conductor</th>
                                <th id="color" scope="col">matricula_vehiculo</th>
                                <th id="color" scope="col">numero_puestos</th>
                                <th id="color" scope="col">marca</th>
                                <th id="color" scope="col">modelo</th>
                                <th id="color" scope="col">fecha_vencimiento_seguro</th>
                                <th id="color" scope="col">numero_licencia_transito</th>
                                <th id="color" scope="col">Opciones</th>
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
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Clientes</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="">Número de autobús</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_autobus" type="text" class="form-control"
                                            placeholder="Número de autobús..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2">
                                    </div>

                                    <label for="">Nombre del conductor</label>
                                    <div class="input-group mb-3">
                                        <input v-model="nombre_conductor" type="text" class="form-control"
                                            placeholder="Nombre del conductor..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2">
                                    </div>

                                    <label for="">Cédula del conductor</label>
                                    <div class="input-group mb-3">
                                        <input v-model="cedula_conductor" type="text" class="form-control"
                                            placeholder="Cédula del conductor..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2">
                                    </div>

                                    <label for="">Matrícula del vehículo</label>
                                    <div class="input-group mb-3">
                                        <input v-model="matricula_vehiculo" type="text" class="form-control"
                                            placeholder="Matrícula del vehículo..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2">
                                    </div>

                                    <label for="">Número de puestos</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_puestos" type="text" class="form-control"
                                            placeholder="Número de puestos..." aria-label="Recipient's username"
                                            aria-describedby="button-addon2">
                                    </div>

                                </div>
                                <div class="col-sm-6">


                                    <label for="">Marca</label>
                                    <div class="input-group mb-3">
                                        <input v-model="marca" type="text" class="form-control" placeholder="Marca..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2">
                                    </div>

                                    <label for="">Modelo</label>
                                    <div class="input-group mb-3">
                                        <input v-model="modelo" type="text" class="form-control" placeholder="Modelo..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2">
                                    </div>

                                    <label for="">Fecha de vencimiento del seguro</label>
                                    <div class="input-group mb-3">
                                        <input v-model="fecha_vencimiento_seguro" type="text" class="form-control"
                                            placeholder="Fecha de vencimiento del seguro..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2">
                                    </div>

                                    <label for="">Número de licencia de tránsito</label>
                                    <div class="input-group mb-3">
                                        <input v-model="numero_licencia_transito" type="text" class="form-control"
                                            placeholder="Número de licencia de tránsito..."
                                            aria-label="Recipient's username" aria-describedby="button-addon2">
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" @click="guardarvehiculo">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>




        </div>



    </div>
</template>
  
<script setup>
import { useVehiculosStore } from '../stores/vehiculos';
import { ref, onMounted } from 'vue';

const vehiculosStore = useVehiculosStore();
const vehiculos = ref([]);
let numero_autobus = ref('');
let nombre_conductor = ref('');
let cedula_conductor = ref('');
let matricula_vehiculo = ref('');
let numero_puestos = ref('');
let marca = ref('');
let modelo = ref('');
let fecha_vencimiento_seguro = ref('');
let numero_licencia_transito = ref('');

async function pedirvehiculos() {
    try {
        const vehiculo = await vehiculosStore.traervehiculos();
        vehiculos.value = vehiculo.data;
    } catch (error) {
        console.log(error);
    }
}

const guardarvehiculo = async () => {
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
            numero_licencia_transito: numero_licencia_transito.value
        };
        await vehiculosStore.addvehiculo(nuevovehiculo)
        pedirvehiculos()
        nombre_autobus.value = '';
        nombre_conductor.value = '';
        cedula_conductor.value = '';
        matricula_vehiculo.value = '';
        numero_puestos.value = '';
        marca.value = '';
        modelo.value = '';
        fecha_vencimiento_seguro.value = '';
        numero_licencia_transito.value = '';

    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    pedirvehiculos()

})
</script>

  
<style scoped>
#color {
    background-color: rgb(254, 183, 3);
}
</style>
  