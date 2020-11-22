require 'fileutils'

task :default => ['build/demo.js', 'build/demo.html']

file 'build' do |t|
  FileUtils.mkdir_p t.name
end

file 'build/demo.js' => ['src/demo.js', 'build'] do |t|
  sh "npx rollup --format esm #{t.sources.first} -o #{t.name}"
end

rule(%r{build/.+\.html} => [proc{|tn| tn.sub(/^build/, 'src')}, 'build']) do |t|
  FileUtils.cp t.sources.first, t.name
end
