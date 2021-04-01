/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { userService} from '@/services/user.service';

createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .use(ElementPlus, {
        i18n: i18n.global.t,
      })
    .provide('userService', userService)
    .mount("#app");

