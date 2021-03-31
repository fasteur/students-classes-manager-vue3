/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import { userService} from '@/services/user.service';

createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .provide('userService', userService)
    .mount("#app");

