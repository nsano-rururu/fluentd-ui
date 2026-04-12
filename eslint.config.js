const js = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
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
      }],
      "vue/no-deprecated-events-api": "warn",
      "vue/no-deprecated-data-object-declaration": "warn",
      "vue/no-deprecated-delete-set": "warn",
      "vue/require-prop-types": "warn"
    }
  },
  {
    ignores: ["node_modules/**", "vendor/**", "public/**"]
  }
];
