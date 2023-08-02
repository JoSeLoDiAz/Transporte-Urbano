import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import {routes} from "./routes/routes.js"
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css' 
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import '@quasar/extras/line-awesome/line-awesome.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import '@quasar/extras/line-awesome/line-awesome.css'

import 'quasar/src/css/index.sass'

import {createPinia} from 'pinia'
//vamor a crear un objeto de vue router
const pinia= createPinia()
const router = createRouter({
    history: createWebHashHistory(),
    routes
})



const app = createApp(App)

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
app.use(router)
app.use(pinia)
app.mount('#app')
 