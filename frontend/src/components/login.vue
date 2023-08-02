<template>
  <div>

    <div class="container-fluid">


      <div class="row" style="height: 9rem;"></div>

      <div id="carta" class="row">

        <div class="card border-2" style="width: 23rem;">
          <div class="card-body">
            <div>
              <h3 id="centrar" class="card-title">Admi</h3>
            </div>

            <div>
              <h6 id="centrar" class="card-subtitle mb-2 text-body-secondary mt-4">
                Ingrese los datos para acceder
              </h6>
            </div>

            <br>
            <label for="">seleccione</label>
            <select class="form-select" aria-label="Default select example">
              <option value="1">Administrador</option>
              <option value="2">Vendedor</option>
            </select>


            <label class=" mt-3 " for="">Correo</label>
            <div class="input-group mb-3">

              <input type="text" class="form-control" placeholder="Correo..." aria-label="Recipient's username"
                aria-describedby="button-addon2">

            </div>
            <label for="">Contraseña:</label>
            <div class="input-group mb-3 ">
              <input type="password" class="form-control" placeholder="Contraseña..." aria-label="Recipient's username"
                aria-describedby="button-addon2">

            </div>



            <div class="d-grid gap-2">
              <div class="row">
                <div class="col"></div>
                <div class="col">
                  <router-link to="/Home">
                    <button class="btn btn-primary" type="button">Ingresar</button>
                  </router-link>
                </div>
                <div class="col"></div>
              </div>



            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

// Función para manejar el inicio de sesión
const login = () => {
  // Realiza la solicitud de inicio de sesión
  axios.post('/loginUser', { email: email.value, password: password.value })
    .then(response => {
      const token = response.data.token;
      // Aquí debes almacenar el token en tu store de autenticación o en otro lugar
      // Puedes usar el enrutador para redirigir al usuario a la página de inicio
      router.push('/inicio');
    })
    .catch(error => {
      // Manejo de errores
      console.error('Error al iniciar sesión:', error);
    });
};
</script>

<style scoped>
#carta {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

#centrar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>