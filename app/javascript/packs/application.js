/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import jQuery from "jquery/dist/jquery";

window.$ = jQuery;
window.jQuery = jQuery;

import Rails from "rails-ujs/lib/assets/compiled/rails-ujs.js";

window.Rails = Rails;
Rails.start();

import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import "startbootstrap-sb-admin/js/sb-admin";

import { createApp } from "vue";
import { createStore } from "vuex";
import BootstrapVueNext from "bootstrap-vue-next";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

// Make Vue and Vuex available globally for compatibility
window.Vue = { createApp };
window.Vuex = { createStore };
window.BootstrapVueNext = BootstrapVueNext;

import "../stylesheets/application.scss";

window.addEventListener("load", () => {
  $("[data-toggle=tooltip]").tooltip();
});
