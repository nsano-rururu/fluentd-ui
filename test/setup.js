// Global test setup
import { config } from "@vue/test-utils";
import _ from "lodash";

// Make lodash globally available
global._ = _;

// Mock global objects that are available in the browser
global.$ = global.jQuery = () => ({
  tooltip: () => {},
  getJSON: () => Promise.resolve({}),
  ajax: () => Promise.resolve({}),
});

global.Rails = {
  csrfToken: () => "test-token",
  start: () => {},
};

global.relativeUrlRoot = "";

// Configure Vue Test Utils
config.global.mocks = {
  $: global.$,
  Rails: global.Rails,
  relativeUrlRoot: global.relativeUrlRoot,
};
