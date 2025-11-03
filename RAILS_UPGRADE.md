# Rails 5.2 to 6.1 Upgrade Guide

This document outlines the changes made to upgrade from Rails 5.2 to Rails 6.1 to support Ruby 3.0+.

## Major Changes

### Ruby Version Requirement
- **Before**: Ruby 2.2.2 or later
- **After**: Ruby 3.0.0 or later

Rails 6.1 is the first Rails version to officially support Ruby 3.0.

### Rails Version
- **Before**: Rails ~> 5.2.0
- **After**: Rails ~> 6.1.0

### Key Dependency Updates

#### Core Dependencies
- `rails`: `~> 5.2.0` → `~> 6.1.0`
- `bootsnap`: `>= 1.1.0` → `>= 1.4.0`
- `webpacker`: unversioned → `~> 5.4`
- `puma`: unversioned → `~> 5.0`

#### Asset Pipeline
- `sass-rails`: `~> 5.0.7` → replaced with `sassc-rails ~> 2.1`
  - Note: `sass-rails` was replaced with `sassc-rails` for better Ruby 3 compatibility

#### Other Dependencies
- `sucker_punch`: `~> 2.0.4` → `~> 3.0`
- `haml-rails`: `~> 1.0` → `~> 2.0`
- `jbuilder`: `~> 2.0` → `~> 2.11`
- `draper`: `~> 3.0` → `~> 4.0`
- `httpclient`: `~> 2.5` → `~> 2.8`
- `kramdown`: `> 1.0.0` → `>= 2.3.0`

#### Development Dependencies
- `listen`: `>= 3.0.5, < 3.2` → `~> 3.7`
- `i18n_generators`: `2.1.1` → `~> 2.2`
- `web-console`: `~> 3.6` → `~> 4.2`

#### Test Dependencies
- `capybara`: `~> 3.4.2` → `~> 3.36`
- `simplecov`: `~> 0.16.1` → `~> 0.21.0`
- `webmock`: `~> 3.12.2` → `~> 3.14`
- `selenium-webdriver`: `~> 3.13.1` → `~> 4.0`

### Configuration Changes

#### config/application.rb
```ruby
# Before
config.load_defaults 5.2

# After
config.load_defaults 6.1
```

### Removed Dependencies
- `dig_rb`: No longer needed in Ruby 3 (dig is built-in)

## Rails 6.1 New Features

### Zeitwerk Autoloader
Rails 6.1 uses Zeitwerk as the default autoloader. This provides:
- Faster autoloading
- Better error messages
- More reliable constant loading

### Horizontal Sharding
Rails 6.1 introduces horizontal sharding support for databases (not applicable to this project as it doesn't use ActiveRecord).

### Better Action Cable Testing
Improved testing utilities for Action Cable (not applicable to this project).

## Breaking Changes to Watch For

### Ruby 3 Specific Changes

1. **Keyword Arguments**: Ruby 3 changed how keyword arguments work. All keyword arguments must now be explicit.
2. **Hash#except**: Now available as a core method (was previously from Rails)
3. **Numeric#positive?/negative?/zero?**: Performance improvements

### Rails 6.1 Specific Changes

1. **Asset Pipeline**: If using Sprockets, ensure compatibility with newer versions
2. **Action Mailer**: New preview interceptor API
3. **Active Model**: Errors API changes (not applicable without ActiveRecord)

## Migration Steps

When upgrading an existing installation:

1. **Update Ruby**:
   ```bash
   # Install Ruby 3.0 or later (3.2+ recommended)
   rbenv install 3.2.0  # or latest 3.x version
   rbenv global 3.2.0
   ```

2. **Remove old Gemfile.lock** (IMPORTANT):
   ```bash
   rm Gemfile.lock
   ```
   
   This is necessary because the old lock file contains Rails 5.2 dependencies that conflict with Rails 6.1.

3. **Install dependencies**:
   ```bash
   bundle install
   ```

4. **Update JavaScript dependencies** (already done in Vue 3 migration):
   ```bash
   yarn install
   ```

5. **Run tests**:
   ```bash
   bundle exec rake test
   npm run test
   ```

6. **Check for deprecation warnings**:
   Look for any deprecation warnings in the logs and address them.

## Troubleshooting

### Gemfile.lock Conflicts

If you encounter errors like:
```
You have requested:
  capybara ~> 3.36

The bundle currently has capybara locked at 3.4.2.
Try running `bundle update capybara`
```

**Solution**: Delete the `Gemfile.lock` file and run `bundle install` again:
```bash
rm Gemfile.lock
bundle install
```

### Bundler Version Warnings

If you see warnings about `Pathname#untaint` being deprecated, you're using an old version of Bundler. Update it:
```bash
gem install bundler
# or
gem update bundler
```

### Missing Gems

If you encounter "Could not find gem" errors when starting the server, ensure all dependencies are installed:
```bash
bundle install
```

## Compatibility Notes

- **Fluentd**: Still supports v1.0.0 or later (< v2)
- **Fluentd Plugins**: All plugin dependencies remain compatible
- **Vue 3**: Already migrated in this PR
- **Webpacker**: Updated to v5.4 for better Rails 6.1 compatibility

## Testing Recommendations

After upgrading:

1. Test all fluentd plugin configurations
2. Verify UI functionality in all major browsers
3. Test the configuration editor
4. Verify log viewing and monitoring features
5. Test plugin installation/uninstallation
6. Check system settings management

## References

- [Rails 6.0 Release Notes](https://guides.rubyonrails.org/6_0_release_notes.html)
- [Rails 6.1 Release Notes](https://guides.rubyonrails.org/6_1_release_notes.html)
- [Ruby 3.0 Release Notes](https://www.ruby-lang.org/en/news/2020/12/25/ruby-3-0-0-released/)
- [Rails Upgrade Guide](https://guides.rubyonrails.org/upgrading_ruby_on_rails.html)
