import { createNotivue } from 'notivue'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import '@unocss/reset/tailwind.css'
import './assets/main.css'

import 'virtual:uno.css'
import 'notivue/notification.css' // Only needed if using built-in <Notification />
import 'notivue/animations.css' // Only needed if using default animations

const notivue = createNotivue(/* Options */)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(notivue)

app.mount('#app')
