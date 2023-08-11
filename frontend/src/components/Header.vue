<template>
  <div id="app">


    <div class="container-fluid flex-grow-1">
      <div class="row" style="height: 27px;"></div>
      <div class="row">
        <div class="col-sm-12">
          <nav class="navbar bg-primary fixed-top">
            <div class="container-fluid">
              <a class="navbar-brand ">
                <h4 style="color: aliceblue;">Trans-Urban</h4>
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div style="width: 310px;" class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                  <h4 class="offcanvas-title" id="offcanvasNavbarLabel">Trans-Urban</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">

                  <router-link to="/home">
                    <div class="d-grid gap-2">
                      <button class="btn btn-primary" type="button">Clientes</button>
                    </div>
                  </router-link>

                  <router-link to="/hello">
                    <div class="d-grid gap-2 mt-2">
                      <button class="btn btn-primary" type="button">Conductor</button>
                    </div>
                  </router-link>

                  <router-link to="/cuatro">
                    <div class="d-grid gap-2 mt-2">
                      <button type="button" class="btn btn-primary">Rutas</button>
                    </div>
                  </router-link>

                  <router-link to="/vehiculo">
                    <div class="d-grid gap-2 mt-2">
                      <button type="button" class="btn btn-primary">Vehiculo</button>
                    </div>
                  </router-link>
                  <router-link to="/vendertk">
                    <div class="d-grid gap-2 mt-2">
                      <button type="button" class="btn btn-success">Vender</button>
                    </div>
                  </router-link>

                  <div class="mt-auto text-end">
                    <button type="button" class="btn btn-light" style="margin-top: 120%;">
                      <i class="fa-solid fa-arrow-right-from-bracket" style="font-size: 30px; "></i>  Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="row mt-5">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component">

            </component>
          </keep-alive>
        </router-view>
      </div>

    </div>
    <footer class="bg-dark text-white text-center mt-3">
      <p>&copy; 2023 Trans-Urban. Todos los derechos reservados. JoseLo y Maluendas</p>
    </footer>

  </div>
</template>

<script setup>
import { ref } from "vue"
</script>

<style scoped>
#centrar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-fluid {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#uno {
  font-size: 22px;
}

#color {
  background-color: #1e69e1;
}

/* Estilos para el "sticky footer" */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
