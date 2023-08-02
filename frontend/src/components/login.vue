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
  
<script setup >


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