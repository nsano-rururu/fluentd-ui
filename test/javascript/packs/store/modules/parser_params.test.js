import { describe, it, expect, beforeEach } from "vitest";
import { createStore } from "vuex";
import parserParams from "../../../../../app/javascript/packs/store/modules/parser_params";

describe("parserParams store module", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        parserParams,
      },
    });
  });

  describe("getters", () => {
    it("toParams returns formatted params", () => {
      store.commit("parserParams/setExpression", "test-expression");
      store.commit("parserParams/setTimeFormat", "%Y-%m-%d");
      store.commit("parserParams/setMessageFormat", "json");

      const params = store.getters["parserParams/toParams"];

      expect(params).toEqual({
        expression: "test-expression",
        time_format: "%Y-%m-%d",
        message_format: "json",
        rfc5424_time_format: null,
        with_priority: null,
      });
    });

    it("pluginName returns the type", () => {
      store.commit("parserParams/setType", "regexp");

      const name = store.getters["parserParams/pluginName"];

      expect(name).toBe("regexp");
    });
  });

  describe("mutations", () => {
    it("setType updates the type", () => {
      store.commit("parserParams/setType", "multiline");

      expect(store.state.parserParams.type).toBe("multiline");
    });

    it("setExpression updates the expression", () => {
      store.commit("parserParams/setExpression", "^\\[(?<time>[^\\]]+)\\]");

      expect(store.state.parserParams.expression).toBe("^\\[(?<time>[^\\]]+)\\]");
    });

    it("setTimeFormat updates the timeFormat", () => {
      store.commit("parserParams/setTimeFormat", "%Y/%m/%d %H:%M:%S");

      expect(store.state.parserParams.timeFormat).toBe("%Y/%m/%d %H:%M:%S");
    });

    it("setMessageFormat updates the messageFormat", () => {
      store.commit("parserParams/setMessageFormat", "rfc5424");

      expect(store.state.parserParams.messageFormat).toBe("rfc5424");
    });

    it("setRfc5424TimeFormat updates the rfc5424TimeFormat", () => {
      store.commit("parserParams/setRfc5424TimeFormat", "%Y-%m-%dT%H:%M:%S.%L%z");

      expect(store.state.parserParams.rfc5424TimeFormat).toBe("%Y-%m-%dT%H:%M:%S.%L%z");
    });

    it("setWithPriority updates the withPriority", () => {
      store.commit("parserParams/setWithPriority", true);

      expect(store.state.parserParams.withPriority).toBe(true);
    });

    it("clearParams resets all params to null", () => {
      store.commit("parserParams/setExpression", "test");
      store.commit("parserParams/setTimeFormat", "test");
      store.commit("parserParams/setMessageFormat", "test");
      
      store.commit("parserParams/clearParams");

      expect(store.state.parserParams.expression).toBeNull();
      expect(store.state.parserParams.timeFormat).toBeNull();
      expect(store.state.parserParams.messageFormat).toBeNull();
      expect(store.state.parserParams.rfc5424TimeFormat).toBeNull();
      expect(store.state.parserParams.withPriority).toBeNull();
    });
  });

  describe("actions", () => {
    it("updateType commits setType and clearParams", async () => {
      const event = { target: { value: "json" } };

      await store.dispatch("parserParams/updateType", event);

      expect(store.state.parserParams.type).toBe("json");
    });

    it("updateExpression commits setExpression", async () => {
      const event = { target: { value: "new-expression" } };

      await store.dispatch("parserParams/updateExpression", event);

      expect(store.state.parserParams.expression).toBe("new-expression");
    });

    it("updateTimeFormat commits setTimeFormat", async () => {
      const event = { target: { value: "%d/%b/%Y:%H:%M:%S %z" } };

      await store.dispatch("parserParams/updateTimeFormat", event);

      expect(store.state.parserParams.timeFormat).toBe("%d/%b/%Y:%H:%M:%S %z");
    });

    it("updateMessageFormat commits setMessageFormat", async () => {
      const event = { target: { value: "auto" } };

      await store.dispatch("parserParams/updateMessageFormat", event);

      expect(store.state.parserParams.messageFormat).toBe("auto");
    });

    it("updateRfc5424TimeFormat commits setRfc5424TimeFormat", async () => {
      const event = { target: { value: "%Y-%m-%dT%H:%M:%S%z" } };

      await store.dispatch("parserParams/updateRfc5424TimeFormat", event);

      expect(store.state.parserParams.rfc5424TimeFormat).toBe("%Y-%m-%dT%H:%M:%S%z");
    });

    it("updateWithPriority commits setWithPriority with checked value", async () => {
      const event = { target: { checked: true } };

      await store.dispatch("parserParams/updateWithPriority", event);

      expect(store.state.parserParams.withPriority).toBe(true);
    });
  });
});
