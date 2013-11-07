# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "backbone-rails"
  s.version = "1.0.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6") if s.respond_to? :required_rubygems_version=
  s.authors = ["Alexander Flatter"]
  s.date = "2013-07-30"
  s.description = "Ships backbone and underscore to your Rails 3.1 application through the new asset pipeline. Rails 3.0 is supported via generators."
  s.email = ["flatter@fastmail.fm"]
  s.homepage = "https://github.com/aflatter/backbone-rails"
  s.require_paths = ["lib"]
  s.rubygems_version = "2.0.3"
  s.summary = "backbone and underscore for Rails"

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, [">= 3.0.0"])
    else
      s.add_dependency(%q<rails>, [">= 3.0.0"])
    end
  else
    s.add_dependency(%q<rails>, [">= 3.0.0"])
  end
end
