source 'https://rubygems.org'

gemspec

# spec.add_development_dependency gems doesn't installed by `gem install fluentd-ui`, but required them from config/application.rb, then error.
# this is workaround for that.
group :development, :test do
  gem "rake"
  gem "pry"
  gem "pry-rails"
  gem "test-unit-rails"
  gem "test-unit-notify"
end

group :development do
  gem 'listen', '~> 3.7'
  gem 'i18n_generators', '~> 2.2'
  gem 'better_errors'
  gem 'web-console', '~> 4.2'
  gem 'binding_of_caller'
end

group :test do
  gem "factory_bot_rails"
  gem "capybara", "~> 3.36"
  gem "capybara-screenshot"
  gem "webdrivers", "= 5.3.0"
  gem "simplecov", "~> 0.21.0", require: false
  gem "webmock", "~> 3.14"
  gem "timecop"
  gem "selenium-webdriver", "~> 4.0"
end
