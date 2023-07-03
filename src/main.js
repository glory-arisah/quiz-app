import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faDesktop,
  faBaseball,
  faChampagneGlasses,
  faCalculator,
  faDog,
  faSpinner,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faDesktop,
  faBaseball,
  faChampagneGlasses,
  faCalculator,
  faDog,
  faSpinner,
  faMusic
);

const pinia = createPinia();
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount("#app");
