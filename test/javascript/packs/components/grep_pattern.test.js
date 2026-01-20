import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GrepPattern from "../../../../app/javascript/packs/components/grep_pattern";

describe("GrepPattern Component", () => {
  const createWrapper = (props = {}) => {
    return mount(GrepPattern, {
      props: {
        containerType: "and",
        grepType: "regexp",
        index: 0,
        subIndex: 0,
        ...props,
      },
    });
  };

  describe("methods", () => {
    it("humanize capitalizes and replaces underscores", () => {
      const wrapper = createWrapper();
      const result = wrapper.vm.humanize("test_value");

      expect(result).toBe("Test value");
    });

    it("humanize handles single words", () => {
      const wrapper = createWrapper();
      const result = wrapper.vm.humanize("regexp");

      expect(result).toBe("Regexp");
    });

    it("add method emits add-grep-pattern event", async () => {
      const wrapper = createWrapper({ subIndex: 1 });
      
      await wrapper.vm.add();

      expect(wrapper.emitted("add-grep-pattern")).toBeTruthy();
      expect(wrapper.emitted("add-grep-pattern")[0]).toEqual(["regexp", 1]);
    });

    it("remove method emits remove-grep-pattern event", async () => {
      const wrapper = createWrapper({ subIndex: 2 });
      
      await wrapper.vm.remove();

      expect(wrapper.emitted("remove-grep-pattern")).toBeTruthy();
      expect(wrapper.emitted("remove-grep-pattern")[0]).toEqual(["regexp", 2]);
    });

    it("labelId generates correct label id", () => {
      const wrapper = createWrapper({
        containerType: "or",
        grepType: "exclude",
        index: 1,
        subIndex: 2,
      });
      
      const result = wrapper.vm.labelId("key", 1, 2);

      expect(result).toBe("label_setting_or_1_exclude_2__key");
    });

    it("inputId generates correct input id", () => {
      const wrapper = createWrapper({
        containerType: "and",
        grepType: "regexp",
        index: 0,
        subIndex: 1,
      });
      
      const result = wrapper.vm.inputId("pattern", 0, 1);

      expect(result).toBe("setting_and_0_regexp_1__pattern");
    });

    it("inputName generates correct input name", () => {
      const wrapper = createWrapper({
        containerType: "or",
        grepType: "exclude",
        index: 2,
        subIndex: 3,
      });
      
      const result = wrapper.vm.inputName("key", 2, 3);

      expect(result).toBe("setting[or[2]][exclude[3]][key]");
    });
  });

  describe("data properties", () => {
    it("initializes with null key and pattern", () => {
      const wrapper = createWrapper();

      expect(wrapper.vm.key).toBeNull();
      expect(wrapper.vm.pattern).toBeNull();
    });

    it("allows setting key and pattern", async () => {
      const wrapper = createWrapper();

      await wrapper.setData({ key: "message", pattern: "error.*" });

      expect(wrapper.vm.key).toBe("message");
      expect(wrapper.vm.pattern).toBe("error.*");
    });
  });

  describe("props validation", () => {
    it("accepts valid containerType values", () => {
      const andWrapper = createWrapper({ containerType: "and" });
      const orWrapper = createWrapper({ containerType: "or" });

      expect(andWrapper.props("containerType")).toBe("and");
      expect(orWrapper.props("containerType")).toBe("or");
    });

    it("accepts valid grepType values", () => {
      const regexpWrapper = createWrapper({ grepType: "regexp" });
      const excludeWrapper = createWrapper({ grepType: "exclude" });

      expect(regexpWrapper.props("grepType")).toBe("regexp");
      expect(excludeWrapper.props("grepType")).toBe("exclude");
    });

    it("accepts numeric index and subIndex", () => {
      const wrapper = createWrapper({ index: 5, subIndex: 10 });

      expect(wrapper.props("index")).toBe(5);
      expect(wrapper.props("subIndex")).toBe(10);
    });
  });
});
