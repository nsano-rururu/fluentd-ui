"use strict";

import { createApp } from "vue";
import OwnedPluginForm from "./components/owned_plugin_form";
import AwsCredential from "./components/aws_credential";

window.addEventListener("load", () => {
  const app = createApp({
    components: {
      "owned-plugin-form": OwnedPluginForm,
      "aws-credential": AwsCredential
    }
  });
  app.mount("#out-s3-setting");
});
