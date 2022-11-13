import { createApp } from 'vue'
import './index.css' 
import {createPinia, defineStore } from 'pinia'
import { ref } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'


export const useEnvironmentStore = defineStore('environment', () => {

	
	return {
	}
}
, {
	persist: true
}
)




const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const vueapp = createApp(App )

vueapp.use(pinia) // Create the root store

vueapp.mount('#app')
