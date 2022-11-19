import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/js/bootstrap.min.js";

import FontAwesome from "@/plugins/FontAwesome";

const app = createApp(App);

app.use(FontAwesome);

app.mount("#app");
