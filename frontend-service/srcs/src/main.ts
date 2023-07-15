import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { controller } from './controller'

controller.init();
createApp(App).mount('#app')