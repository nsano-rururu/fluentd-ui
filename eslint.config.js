const js = require("@eslint/js");
const vuePlugin = require("eslint-plugin-vue");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  ...vuePlugin.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: "module",
      globals: {
        ...globals.browser,
        $: "readonly",
        Rails: "readonly",
        Vue: "readonly",
        relativeUrlRoot: "readonly"
      }
    },
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "no-console": "off",
      "no-unused-vars": ["off", {
        "argsIgnorePattern": "^_"
      }]
    }
  }
];
