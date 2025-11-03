# Migration Guide: Upgrading to Vue 3, Rails 6.1, and Ruby 3.x

This guide walks you through upgrading an existing fluentd-ui installation to the latest versions.

## Quick Start

If you're starting fresh or want the fastest path:

```bash
# 1. Update Ruby (use 3.2 or later for best compatibility)
rbenv install 3.2.0
rbenv local 3.2.0

# 2. Remove old lock file
rm Gemfile.lock

# 3. Install dependencies
bundle install
yarn install

# 4. Start the server
bin/rails server
```

## Step-by-Step Migration

### 1. Update Ruby Version

The minimum required Ruby version is now **3.0.0**, but **3.2.x or later is recommended**.

#### Using rbenv:
```bash
rbenv install 3.2.0
rbenv local 3.2.0  # or rbenv global 3.2.0
ruby -v  # Verify: should show 3.2.0 or later
```

#### Using rvm:
```bash
rvm install 3.2.0
rvm use 3.2.0
ruby -v  # Verify: should show 3.2.0 or later
```

### 2. Update Bundler

Ensure you have a recent version of Bundler:

```bash
gem install bundler
bundler -v  # Should be 2.0 or later
```

### 3. Clean Dependencies

**IMPORTANT**: Delete the old `Gemfile.lock` to avoid version conflicts:

```bash
rm Gemfile.lock
```

This is necessary because the old lock file contains Rails 5.2 and Ruby 2.x dependencies that are incompatible with the new versions.

### 4. Install Ruby Dependencies

```bash
bundle install
```

If you encounter permission errors, **do not use sudo**. Instead, install to a local path:

```bash
bundle install --path vendor/bundle
```

### 5. Install JavaScript Dependencies

```bash
yarn install
```

If you don't have yarn installed:

```bash
npm install -g yarn
```

### 6. Verify Installation

Run the test suites to ensure everything is working:

```bash
# JavaScript tests
npm run test

# JavaScript linting
npm run lint

# Ruby tests (if applicable)
bundle exec rake test
```

### 7. Start the Server

For development:
```bash
bin/rails server
```

For production:
```bash
RAILS_ENV=production bin/rails server
```

Access the application at http://localhost:3000

## Common Issues and Solutions

### Issue 1: Gemfile.lock Version Conflicts

**Error:**
```
You have requested:
  capybara ~> 3.36

The bundle currently has capybara locked at 3.4.2.
Try running `bundle update capybara`
```

**Solution:**
```bash
rm Gemfile.lock
bundle install
```

### Issue 2: Bundler Deprecation Warnings

**Warning:**
```
warning: Pathname#untaint is deprecated and will be removed in Ruby 3.2.
```

**Solution:** Update Bundler to a newer version:
```bash
gem install bundler
```

### Issue 3: Missing Gems When Starting Server

**Error:**
```
Could not find gem 'listen (~> 3.7)' in locally installed gems.
```

**Solution:**
```bash
bundle install
```

### Issue 4: Node/Yarn Dependencies Not Found

**Error:**
```
sh: 1: vitest: not found
```

**Solution:**
```bash
yarn install
```

### Issue 5: Permission Denied

**Error:**
```
Don't run Bundler as root.
```

**Solution:** Don't use `sudo` with bundle commands. If you need to install to a specific location:
```bash
bundle install --path vendor/bundle
```

## What's Changed

### Ruby & Rails
- Ruby: 2.2.2+ → **3.0.0+** (3.2+ recommended)
- Rails: 5.2 → **6.1**

### Frontend
- Vue: 2.6 → **3.3**
- Vuex: 3.0 → **4.0**
- ESLint: 7 → **9**
- Bootstrap-Vue → **Bootstrap-Vue-Next**

### Key Dependencies
- `sass-rails` → `sassc-rails`
- `sucker_punch`: 2.0 → 3.0
- `haml-rails`: 1.0 → 2.0
- `draper`: 3.0 → 4.0
- `puma`: Added version constraint 5.0
- `webpacker`: Added version constraint 5.4

## Testing Your Migration

After migration, test these key features:

1. **UI Functionality**
   - Navigate through all pages
   - Test form submissions
   - Verify dropdowns and modals work

2. **Fluentd Integration**
   - Test plugin configurations
   - Verify log viewing
   - Check monitoring features

3. **Settings Management**
   - Update settings
   - Test save/restore functionality

4. **Plugin Management**
   - Install a plugin
   - Uninstall a plugin
   - Update plugins

## Getting Help

If you encounter issues not covered in this guide:

1. Check the detailed documentation:
   - [VUE3_MIGRATION.md](VUE3_MIGRATION.md) - Vue 2 to Vue 3 changes
   - [RAILS_UPGRADE.md](RAILS_UPGRADE.md) - Rails 5.2 to 6.1 changes

2. Review the test suite:
   ```bash
   npm run test
   ```

3. Check for any deprecation warnings in the logs

4. Open an issue on GitHub with:
   - Ruby version (`ruby -v`)
   - Bundler version (`bundler -v`)
   - Error message
   - Steps to reproduce

## Rollback

If you need to rollback to the previous version:

1. Check out the previous release:
   ```bash
   git checkout <previous-release-tag>
   ```

2. Restore dependencies:
   ```bash
   bundle install
   yarn install
   ```

3. You may need to downgrade Ruby if you upgraded specifically for this release.
