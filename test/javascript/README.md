# Vue Component Tests

This directory contains unit tests for the Vue 3 components and Vuex store modules.

## Test Framework

- **Vitest**: Fast, modern test runner with native ESM support
- **@vue/test-utils**: Official testing utilities for Vue.js
- **jsdom**: JavaScript implementation of DOM for Node.js testing

## Running Tests

### Run all tests
```bash
npm run test
```

### Run tests in watch mode (recommended for development)
```bash
npm run test
# Vitest runs in watch mode by default
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Structure

```
test/javascript/
├── setup.js                          # Global test setup
├── packs/
│   ├── store/
│   │   ├── index.test.js            # Vuex store tests
│   │   └── modules/
│   │       └── parser_params.test.js # parserParams module tests
│   └── components/
│       ├── config_field.test.js     # ConfigField component tests
│       └── grep_pattern.test.js     # GrepPattern component tests
└── README.md                         # This file
```

## Writing Tests

### Component Test Example

```javascript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MyComponent from "../../../../app/javascript/packs/components/my_component";

describe("MyComponent", () => {
  it("renders correctly", () => {
    const wrapper = mount(MyComponent, {
      props: {
        message: "Hello"
      }
    });
    
    expect(wrapper.text()).toContain("Hello");
  });
});
```

### Store Test Example

```javascript
import { describe, it, expect } from "vitest";
import { createStore } from "vuex";
import myModule from "../../../../app/javascript/packs/store/modules/my_module";

describe("myModule", () => {
  it("updates state correctly", () => {
    const store = createStore({
      modules: { myModule }
    });
    
    store.commit("myModule/setData", "test");
    expect(store.state.myModule.data).toBe("test");
  });
});
```

## Test Coverage

The test suite covers:

- **Vuex Store**: Main store and parserParams module
  - Getters
  - Mutations
  - Actions
  
- **Vue Components**:
  - ConfigField: Form field rendering and validation
  - GrepPattern: Pattern matching configuration

## Global Mocks

The following globals are mocked in `test/setup.js`:

- `$` / `jQuery`: Basic jQuery functions
- `Rails`: Rails UJS utilities (csrfToken, etc.)
- `relativeUrlRoot`: Application root path
- `_`: Lodash utilities

## Adding New Tests

1. Create a new test file in the appropriate directory
2. Follow the naming convention: `*.test.js`
3. Import necessary testing utilities
4. Write descriptive test cases
5. Run tests to verify they pass

## Best Practices

- Write descriptive test names that explain what is being tested
- Test one thing at a time
- Use `beforeEach` for common setup
- Mock external dependencies
- Test both success and error cases
- Keep tests isolated and independent

## Configuration

Test configuration is in `vitest.config.js` at the project root.
