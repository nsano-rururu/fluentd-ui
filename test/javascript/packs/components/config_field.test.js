import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ConfigField from "../../../../app/javascript/packs/components/config_field";
import { createStore } from "vuex";
import parserParams from "../../../../app/javascript/packs/store/modules/parser_params";

describe("ConfigField Component", () => {
  const createWrapper = (props = {}, storeOptions = {}) => {
    const store = createStore({
      modules: {
        parserParams,
      },
      ...storeOptions,
    });

    return mount(ConfigField, {
      props: {
        pluginType: "parse",
        option: {
          name: "test_option",
          type: "string",
          default: "default_value",
          desc: "Test option description",
        },
        initialTextValue: "",
        ...props,
      },
      global: {
        plugins: [store],
        mocks: {
          Rails: {
            csrfToken: () => "test-token",
          },
        },
      },
    });
  };

  describe("methods", () => {
    it("humanize capitalizes and replaces underscores", () => {
      const wrapper = createWrapper();
      const result = wrapper.vm.humanize("test_option_name");

      expect(result).toBe("Test option name");
    });

    it("labelId generates correct label id", () => {
      const wrapper = createWrapper();
      const result = wrapper.vm.labelId("parse", { name: "expression" });

      expect(result).toBe("label_setting_parse_0__expression");
    });

    it("inputId generates correct input id for non-output plugin", () => {
      const wrapper = createWrapper();
      const result = wrapper.vm.inputId("parse", { name: "expression" });

      expect(result).toBe("setting_parse_0__expression");
    });

    it("inputId generates correct input id for output plugin", () => {
      const wrapper = createWrapper({ pluginType: "output" });
      const result = wrapper.vm.inputId("output", { name: "buffer_type" });

      expect(result).toBe("setting_buffer_type");
    });

    it("inputName generates correct input name for non-output plugin", () => {
      const wrapper = createWrapper();
      const result = wrapper.vm.inputName("parse", { name: "expression" });

      expect(result).toBe("setting[parse[0]][expression]");
    });

    it("inputName generates correct input name for output plugin", () => {
      const wrapper = createWrapper({ pluginType: "output" });
      const result = wrapper.vm.inputName("output", { name: "buffer_type" });

      expect(result).toBe("setting[buffer_type]");
    });

    it("checked returns 'checked' for true values", () => {
      const wrapper = createWrapper();

      expect(wrapper.vm.checked(true)).toBe("checked");
      expect(wrapper.vm.checked("true")).toBe("checked");
    });

    it("checked returns empty string for false values", () => {
      const wrapper = createWrapper();

      expect(wrapper.vm.checked(false)).toBe("");
      expect(wrapper.vm.checked("false")).toBe("");
      expect(wrapper.vm.checked(null)).toBe("");
    });
  });

  describe("data initialization", () => {
    it("initializes with enum type option", () => {
      const wrapper = createWrapper({
        option: {
          name: "test_enum",
          type: "enum",
          default: "option1",
          list: ["option1", "option2", "option3"],
        },
      });

      expect(wrapper.vm.selectedValue).toBe("option1");
    });

    it("initializes with bool type option", () => {
      const wrapper = createWrapper({
        option: {
          name: "test_bool",
          type: "bool",
          default: true,
        },
      });

      expect(wrapper.vm.checkboxValue).toBe(true);
    });

    it("initializes with text type option", () => {
      const wrapper = createWrapper({
        option: {
          name: "test_text",
          type: "string",
          default: "default_text",
        },
        initialTextValue: "initial_text",
      });

      expect(wrapper.vm.textValue).toBe("initial_text");
    });

    it("uses default value when no initialTextValue provided", () => {
      const wrapper = createWrapper({
        option: {
          name: "test_text",
          type: "string",
          default: "default_text",
        },
      });

      expect(wrapper.vm.textValue).toBe("default_text");
    });
  });

  describe("onChange event handling", () => {
    it("emits change-parse-config event on change", async () => {
      const wrapper = createWrapper();
      const event = { target: { value: "new_value" } };

      await wrapper.vm.onChange(event);

      expect(wrapper.emitted("change-parse-config")).toBeTruthy();
      expect(wrapper.emitted("change-parse-config")[0]).toEqual([{}]);
    });

    it("updates store state for expression option", async () => {
      const store = createStore({
        modules: {
          parserParams,
        },
      });

      const wrapper = mount(ConfigField, {
        props: {
          pluginType: "parse",
          option: {
            name: "expression",
            type: "string",
            default: "",
          },
        },
        global: {
          plugins: [store],
          mocks: {
            Rails: {
              csrfToken: () => "test-token",
            },
          },
        },
      });

      const event = { target: { value: "test-expression" } };
      await wrapper.vm.onChange(event);

      // Verify the store state was updated
      expect(store.state.parserParams.expression).toBe("test-expression");
    });
  });
});
