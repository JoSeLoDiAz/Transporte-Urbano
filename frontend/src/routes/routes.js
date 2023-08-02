import Hello from "../components/Conductores.vue"
import Home from "../components/Clientes.vue"
import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import tres from "../components/Tres.vue"
import cuatro from "../components/Rutas.vue"
import vehiculo from "../components/vehiculo.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header,
        children: [
            { path: "/home", component: Home },
            { path: "/hello", component: Hello },
            { path: "/tres", component: tres },
            {path: "/cuatro", component:cuatro},
            {path:"/vehiculo", component:vehiculo}
        ]
    }
]

