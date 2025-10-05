import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import VWave from 'v-wave'
// import 'v-wave/dist/style.css'

import App from './App.vue'
import router from './router'
import ui from '@nuxt/ui/vue-plugin'

const app = createApp(App)
const green = 'oklch(26.6% 0.065 152.934)'
app.use(createPinia())
app.use(router)
app.use(ui)
app.use(VWave, {
  color: green,
  initialOpacity: 0.5,
  easing: 'ease-in',
})
app.mount('#app')
