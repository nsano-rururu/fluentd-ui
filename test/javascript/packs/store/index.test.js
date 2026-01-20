import { describe, it, expect } from "vitest";
import store from "../../../../app/javascript/packs/store";

describe("Vuex Store", () => {
  it("is created successfully", () => {
    expect(store).toBeDefined();
    expect(store.state).toBeDefined();
  });

  it("has parserParams module", () => {
    expect(store.state.parserParams).toBeDefined();
  });

  it("parserParams module has correct initial state", () => {
    expect(store.state.parserParams).toEqual({
      type: null,
      expression: null,
      timeFormat: null,
      messageFormat: null,
      rfc5424TimeFormat: null,
      withPriority: null,
    });
  });

  it("has parserParams getters available", () => {
    expect(store.getters["parserParams/toParams"]).toBeDefined();
    expect(store.getters["parserParams/pluginName"]).toBeNull();
  });

  it("can commit mutations to parserParams", () => {
    store.commit("parserParams/setType", "json");
    expect(store.state.parserParams.type).toBe("json");

    store.commit("parserParams/setExpression", "test-expression");
    expect(store.state.parserParams.expression).toBe("test-expression");

    // Clean up
    store.commit("parserParams/clearParams");
    store.commit("parserParams/setType", null);
  });

  it("can dispatch actions to parserParams", async () => {
    const event = { target: { value: "multiline" } };
    await store.dispatch("parserParams/updateType", event);
    
    expect(store.state.parserParams.type).toBe("multiline");

    // Clean up
    store.commit("parserParams/clearParams");
    store.commit("parserParams/setType", null);
  });
});
