/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/style.scss';
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtOfqY6PjSeFtdtEcYB5Jo8h_lU6HHC8E",
    authDomain: "http-vue-3f9db.firebaseapp.com",
    databaseURL: "https://http-vue-3f9db-default-rtdb.firebaseio.com",
    projectId: "http-vue-3f9db",
    storageBucket: "http-vue-3f9db.appspot.com",
    messagingSenderId: "382173592321",
    appId: "1:382173592321:web:6abae844e63827a6293900",
    measurementId: "G-79P1CXJXT4"
};

firebase.initializeApp(firebaseConfig);

createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .use(ElementPlus, { i18n: i18n.global.t })
    .mount("#app");
