import { createApp } from "vue";
import App from "./App.vue";

import FontAwesome from "@/plugins/FontAwesome";

const app = createApp(App);

app.use(FontAwesome);

app.mount("#app");
