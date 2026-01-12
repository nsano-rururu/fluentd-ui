const js = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");

module.exports = [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: "module",
      globals: {
        $: "readonly",
        Rails: "readonly",
        Vue: "readonly",
        relativeUrlRoot: "readonly",
        browser: true,
        es6: true,
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
      "vue/require-prop-types": "warn"
    }
  },
  {
    ignores: ["node_modules/**", "vendor/**", "public/**"]
  }
];
