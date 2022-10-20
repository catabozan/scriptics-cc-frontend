import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementPlus from "element-plus";

import "./index.css";
import "element-plus/dist/index.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost/api";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(ElementPlus)
  .mount("#app");
