import { createApp } from 'vue'
import popup from './App.vue'
import  router  from "./router";
const app = createApp(popup)
app.use(router)
app.mount('#app');
