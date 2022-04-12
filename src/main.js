import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import style from "@/style/style.css";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

createApp(App).use(Quasar, quasarUserOptions).use(router).use(style).mount("#app");
