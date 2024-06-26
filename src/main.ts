import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/scss/index.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
	store.router = markRaw(router)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
