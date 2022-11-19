import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);
library.add(faPause);

export default (app) => {
  app.component("fa-icon", FontAwesomeIcon);
};
