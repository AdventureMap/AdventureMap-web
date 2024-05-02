import './styles/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//vue-index
import router from "./plugins/router.ts";

//pinia
import {createPinia} from "pinia";
const pinia = createPinia()

//element-plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
    .use(pinia)
    .use(ElementPlus)
    .mount('#app')