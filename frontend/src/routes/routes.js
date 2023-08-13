import Conductores from "../components/Conductores.vue"
import Clientes from "../components/Clientes.vue"
import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import VenderTk from "../components/VenderTk.vue"
import Rutas from "../components/Rutas.vue"
import Vehiculos from "../components/vehiculo.vue"

export const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
        path: "/header", component: Header,
        children: [
            { path: "/clientes", component: Clientes },
            { path: "/conductores", component: Conductores },
            { path: "/vendertk", component: VenderTk },
            {path: "/rutas", component:Rutas},
            {path:"/vehiculos", component:Vehiculos}
        ]
    }
]

