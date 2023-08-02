<template>
  <div>

    <div class="container-fluid">
      <div class="row" style="height: 9rem;"></div>

      <div id="carta" class="row">
        <div class="card border-2" style="width: 23rem;">
          <div class="card-body">
            <div>
              <h3 id="centrar" class="card-title">Logueo</h3>
            </div>
            <div>
              <h6 id="centrar" class="card-subtitle mb-2 text-body-secondary mt-4">
                Ingrese los datos para acceder
              </h6>
            </div>

            <label class=" mt-3 " for="">Email</label>
            <div class="input-group mb-3">
              <input v-model="email" type="text" class="form-control" placeholder="Email..."
                aria-label="Recipient's username" aria-describedby="button-addon2">
            </div>

            <label for="">Contraseña:</label>
            <div class="input-group mb-3 ">
              <input v-model="password" type="password" class="form-control" placeholder="Contraseña..."
                aria-label="Recipient's username" aria-describedby="button-addon2">
            </div>

            <div class="d-grid gap-2">
              <div class="row">
                <div class="col"></div>
                <div class="col">
                  <button class="btn btn-primary" type="button" @click="login()">Ingresar</button>
                </div>
                <div class="col"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="error" class="error-message">{{ error }}</div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useLoginUsersStore } from '../stores/loginUsers';

const { setToken, setError } = useLoginUsersStore();

const email = ref('');
const password = ref('');
const router = useRouter();
const error = ref(null);

const login = () => {
  axios.post('/loginUser', { email: email.value, password: password.value })
    .then(response => {
      const token = response.data.token;
      setToken(token);
      console.log("token generado", token);
      router.push('/header');
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales inválidas');
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
