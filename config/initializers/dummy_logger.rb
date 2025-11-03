require_relative '../../lib/dummy_logger' unless defined?(DummyLogger)
$log ||= DummyLogger.logger
