/* global _ */
"use strict";
import "lodash/lodash";
import { createApp } from "vue";

import GrepContainer from "./components/grep_container";

window.addEventListener("load", () => {
  const app = createApp({
    components: {
      "grep-container": GrepContainer,
    },
    data: function() {
      return {
        containers: {
          and: [true],
          or: [true]
        }
      };
    },
    methods: {
      addGrepContainer: function(containerType, index) {
        const found = this.containers[containerType].indexOf(false);
        if (found < 0) {
          this.containers[containerType][this.containers[containerType].length] = true;
        } else {
          this.containers[containerType][found] = true;
        }
      },
      removeGrepContainer: function(containerType, index) {
        this.containers[containerType][index] = false;
      }
    }
  });
  app.mount("#filter-grep-setting");
});
