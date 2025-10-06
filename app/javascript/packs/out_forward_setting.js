"use strict";

import { createApp } from "vue";
import TransportConfig from "./components/transport_config";
import OwnedPluginForm from "./components/owned_plugin_form";

window.addEventListener("load", () => {
  const app = createApp({
    components: {
      "transport-config": TransportConfig,
      "owned-plugin-form": OwnedPluginForm,
    }
  });
  app.mount("#out-forward-setting");
});
