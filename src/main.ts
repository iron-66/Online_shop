import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//store.dispatch('initializeStore') Попытка залить всё в LocalStorage

createApp(App).use(store).use(router).mount('#app')
