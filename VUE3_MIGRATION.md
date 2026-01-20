# Vue 3 and Rails 6.1 Migration Summary

This document summarizes the changes made to migrate from Vue 2 to Vue 3 and Rails 5.2 to Rails 6.1 (with Ruby 3.0+ support).

## Rails & Ruby Upgrade

### Ruby Version Requirement
- **Before**: Ruby 2.2.2 or later
- **After**: Ruby 3.0.0 or later

### Rails Version
- **Before**: Rails ~> 5.2.0
- **After**: Rails ~> 6.1.0

For detailed Rails upgrade information, see [RAILS_UPGRADE.md](RAILS_UPGRADE.md).

## Package Updates

### Updated Dependencies
- `vue`: `^2.6.8` → `^3.3.4`
- `vuex`: `^3.0.1` → `^4.0.2`
- `vue-loader`: `^15.7.0` → `^16.8.3`
- `bootstrap-vue`: `^2.0.0-rc.14` → `bootstrap-vue-next@^0.14.10`
- `eslint`: `^5.1.0` → `^9.15.0`
- `eslint-plugin-vue`: `^4.7.0` → `^9.30.0`

### Removed Dependencies
- `vue-template-compiler`: No longer needed in Vue 3

### Added Resolutions
- `node-sass`: Resolved to `npm:sass@^1.32.0` to fix build issues with Node 20

## Code Changes

### 1. Vue Instance Creation
**Before (Vue 2):**
```javascript
new Vue({
  el: "#app",
  // options
});
```

**After (Vue 3):**
```javascript
import { createApp } from "vue";

const app = createApp({
  // options
});
app.mount("#app");
```

### 2. Vuex Store Creation
**Before (Vue 2):**
```javascript
import Vue from "vue/dist/vue.esm";
import Vuex from "vuex/dist/vuex.esm";

Vue.use(Vuex);

const store = new Vuex.Store({
  // options
});
```

**After (Vue 3):**
```javascript
import { createStore } from "vuex";

const store = createStore({
  // options
});
```

### 3. Filters Removed
Vue 3 removed support for filters. They were converted to methods.

**Before (Vue 2):**
```javascript
// In component
filters: {
  humanize: function(value) {
    return _.capitalize(value.replace(/_/g, " "));
  }
}

// In template
{{ option.name | humanize }}
```

**After (Vue 3):**
```javascript
// In component
methods: {
  humanize: function(value) {
    return _.capitalize(value.replace(/_/g, " "));
  }
}

// In template
{{ humanize(option.name) }}
```

### 4. Reactivity API Changes
**Before (Vue 2):**
```javascript
this.$set(this.array, index, value);
this.$delete(this.array, index);
```

**After (Vue 3):**
```javascript
this.array[index] = value;
delete this.array[index];
```

### 5. Data Property
**Before (Vue 2):**
```javascript
data: {
  message: "Hello"
}
```

**After (Vue 3):**
```javascript
data() {
  return {
    message: "Hello"
  };
}
```

### 6. Event Bus Deprecation
The `$on`, `$off`, and `$once` instance methods have been removed. Use native event handling via template event listeners instead.

**Before (Vue 2):**
```javascript
mounted() {
  this.$on("event-name", this.handler);
}
```

**After (Vue 3):**
```javascript
// Use v-on in template or use provide/inject pattern
```

### 7. BootstrapVue Migration
Migrated from `bootstrap-vue` to `bootstrap-vue-next`, which is the Vue 3 compatible version.

## Files Modified

### JavaScript Files
- `app/javascript/packs/application.js` - Updated imports and global setup
- `app/javascript/packs/store/index.js` - Updated Vuex store creation
- `app/javascript/packs/plugin_setting.js` - Updated Vue instance creation
- `app/javascript/packs/navigation.js` - Updated Vue instance creation
- `app/javascript/packs/treeview.js` - Updated Vue instance creation and data property
- `app/javascript/packs/settings.js` - Updated Vue instance creation and removed $set/$delete
- `app/javascript/packs/in_tail_parse.js` - Updated Vue instance creation
- `app/javascript/packs/fluent_log.js` - Updated Vue instance creation and data property
- `app/javascript/packs/out_forward_setting.js` - Updated Vue instance creation
- `app/javascript/packs/out_s3_setting.js` - Updated Vue instance creation
- `app/javascript/packs/filter_grep_setting.js` - Updated Vue instance creation and removed $on
- `app/javascript/packs/transport_section.js` - Updated Vue instance creation and moved filter to method
- `app/javascript/packs/components/config_field.js` - Moved filter to method
- `app/javascript/packs/components/grep_pattern.js` - Moved filter to method
- `app/javascript/packs/components/grep_container.js` - Moved filter to method, removed $set
- `app/javascript/packs/components/transport_config.js` - Moved filter to method

### Template Files (HAML)
- `app/views/shared/vue/_config_field.html.haml` - Changed filter syntax to method calls
- `app/views/shared/vue/_grep_pattern.html.haml` - Changed filter syntax to method calls
- `app/views/shared/vue/_grep_container.html.haml` - Changed filter syntax to method calls
- `app/views/shared/vue/_transport_config.html.haml` - Changed filter syntax to method calls
- `app/views/shared/vue/_transport_section.html.haml` - Changed filter syntax to method calls

### Configuration Files
- `.eslintrc.js` - Updated to use `plugin:vue/vue3-recommended`
- `package.json` - Updated all dependencies and added resolutions

## Testing

To verify the migration:

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Run linter:
   ```bash
   npm run lint
   ```

3. Build assets (if applicable):
   ```bash
   bin/webpack
   ```

## Known Warnings

There are some linting warnings that are informational only:
- Props should define types (vue/require-prop-types)
- Events should be declared in emits option (vue/require-explicit-emits)

These can be addressed in future refinements but do not affect functionality.

## Breaking Changes to Be Aware Of

1. **Global API changes**: All Vue global APIs are now accessed through named exports
2. **Filters removed**: All filters must be converted to methods or computed properties
3. **Event bus removed**: `$on`, `$off`, `$once` are no longer available
4. **Reactivity**: Direct property assignment now works without `$set`
5. **BootstrapVue components**: May have different props/events in bootstrap-vue-next

## Resources

- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Vuex 4 Migration Guide](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html)
- [BootstrapVue Next Documentation](https://bootstrap-vue-next.github.io/bootstrap-vue-next/)
