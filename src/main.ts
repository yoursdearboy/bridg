import '@fortawesome/fontawesome-free/css/all.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'

import App from './App.vue'
import router from './router'
import formkitConfig from './formkit.config.ts'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(plugin, defaultConfig(formkitConfig))

app.mount('#app')
