/* global _ */
"use strict";
import "lodash/lodash";
import GrepPattern from "./grep_pattern";

const GrepContainer = {
  template: "#vue-grep-container",
  components: {
    "grep-pattern": GrepPattern
  },
  props: [
    "containerType", // and/or
    "index",
  ],
  data: function() {
    return {
      grepType: "regexp",
      patterns: [true],
    };
  },
  methods: {
    humanize: function(value) {
      return _.capitalize(value.replace(/_/g, " "));
    },
    add: function(event) {
      this.$emit("add-grep-container", this.containerType, this.index);
    },
    remove: function(event) {
      this.$emit("remove-grep-container", this.containerType, this.index);
    },
    addGrepPattern: function(grepType, index) {
      const found = this.patterns.indexOf(false);
      if (found < 0) {
        this.patterns[this.patterns.length] = true;
      } else {
        this.patterns[found] = true;
      }
    },
    removeGrepPattern: function(grepType, index) {
      console.log(index);
      console.log(this.patterns);
      this.patterns[index] = false;
      console.log(this.patterns);
    },
    inputName: function(index) {
      return `setting[${this.containerType}[${this.index}]][grep_type]`;
    }
  }
};

export { GrepContainer as default };
