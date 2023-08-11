import Hello from "../components/Conductores.vue"
import Home from "../components/Clientes.vue"
import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import VenderTk from "../components/VenderTk.vue"
import cuatro from "../components/Rutas.vue"
import vehiculo from "../components/vehiculo.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/header", component: Header,
        children: [
            { path: "/home", component: Home },
            { path: "/hello", component: Hello },
            { path: "/vendertk", component: VenderTk },
            {path: "/cuatro", component:cuatro},
            {path:"/vehiculo", component:vehiculo}
        ]
    }
]

