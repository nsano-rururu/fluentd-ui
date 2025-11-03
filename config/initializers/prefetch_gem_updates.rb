Rails.application.config.after_initialize do
  require "plugin" # Avoid: RuntimeError Circular dependency detected while autoloading constant Plugin
  unless Rails.env.test?
    AllPluginCheckUpdateJob.perform_later
  end
end
