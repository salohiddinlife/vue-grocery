import '@/assets/styles/main.scss'
import { createApp } from 'vue'
import { routes } from '@/routes'
import { createPinia } from 'pinia'
import App from './App.vue'

import Loader from "@/components/UI/Loader.vue";
import api from './store/api'
import VueLazyLoad from "vue-lazyload";



const pinia = createPinia()
const app = createApp(App)

app.component('Loader', Loader)
app.use(pinia).use(VueLazyLoad)
app.use(routes)
app.provide('api', api)
app.mount('#app')
