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
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginUsersStore } from '../stores/loginUsers';

let email = ref('');
let password = ref('');
let router = useRouter();
let loginUsers = useLoginUsersStore();
let e = ref('');
let errores = ref("")

const login = async () => {
  try {
    const res = await loginUsers.loguear(email.value, password.value);
    // console.log(res);
    router.push('/tres');
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errores.value = error.response.data.errors[0].msg;
      // console.log(`error0: ${errores.value}`);
    } else if (error.response.data) {
      errores.value = error.response.data.msg;
      // console.log(`error0: ${errores.value}`);
    } else {
      errores.value = "Error interno para iniciar sesion,\n Intenta Nuevamente"
      console.log('Error al ingresar:', error);
    }
    Swal.fire({
      icon: 'error',
      title: errores.value, // Usa el mensaje de error para el título
      showConfirmButton: false,
      timer: 2000 // Mostrar durante 2 segundos
    });
  }
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

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
