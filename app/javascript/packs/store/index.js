/* global process:true */
import { createStore } from "vuex";
import { createNamespacedHelpers } from "vuex";
import { createLogger } from "vuex";

const debug = process.env.NODE_ENV !== "production";

import parserParams from "./modules/parser_params";

const store = createStore({
  modules: {
    parserParams,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export { store as default };
