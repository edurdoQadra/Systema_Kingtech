import { createApp, markRaw } from 'vue'
import {createPinia} from 'pinia'
import createPersistedstate from 'pinia-plugin-persistedstate';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './style.css'

window.axios=axios;

window.axios.defaults.baseUrl = 'http://localhost/matriz_back/public'
window.axios.defaults.headers.common['Accept']='application/json'
window.axios.defaults.headers.common['Content-Type']='application/json'
window.axios.defaults.headers.common['X-Requested-With']='application/json'
window.axios.defaults.withCredencials=true

const pinia = createPinia()

pinia.use(({store})=>{
    store.router = markRaw(router)
})

pinia.use(createPersistedstate)

const app=createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app');

