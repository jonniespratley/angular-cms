#
# @author Jonnie Spratley - AppMatrix, Inc.
# @note This file contains tasks to help with deployment to live server, building the scripts, and cleaning up files.
#

#cleanup
desc "remove all files from the temp folder"
task :cleanup do
  FileUtils.rm_rf "./temp/*"
end

#build
desc "Build the scripts and move to the public folder"
task :build do
  
end

#deploy
desc "Deploy distribution build to web server"
task :deploy_d => :build do
  require 'net/ssh'
  require 'net/scp'

  server = 'dev.myappmatrix.com'
  login = 'jonnie'

  Net::SSH.start(server, login, :password => "fred3212") do |ssh|
    ssh.scp.upload!("www", "/var", { :recursive => true, :verbose => true }) do |ch, name, sent, total|
      puts "#{name}: #{sent}/#{total}"
    end
  end
end

#deploy to development server

#deploy to staging server
desc "Deploy distribution build to test server"
task :deploy_t => :build do
  require 'net/ssh'
  require 'net/scp'

  server = 'dev.myappmatrix.com'
  login = 'jonnie'

  Net::SSH.start(server, login, :password => "fred3212") do |ssh|

    ssh.scp.upload!("www", "/var", { :recursive => true, :verbose => true }) do |ch, name, sent, total|
      puts "#{name}: #{sent}/#{total}"
    end
  end
end

#deploy to production server
desc "Deploy distribution build to production server"
task :deploy => :build do
  require 'net/ssh'
  require 'net/scp'

  server = 'myappmatrix.com'
  login = 'jonnie'

  Net::SSH.start(server, login, :password => "fred3212") do |ssh|
    ssh.scp.upload!("www", "/var", { :recursive => true, :verbose => true }) do |ch, name, sent, total|
      puts "#{name}: #{sent}/#{total}"
    end
  end
end


#deploy scripts to production server
desc "Deploy distribution scripts to production server"
task :deploy_scripts => :build do
  require 'net/ssh'
  require 'net/scp'

  server = 'myappmatrix.com'
  login = 'jonnie'

  Net::SSH.start(server, login, :password => "fred3212") do |ssh|
    ssh.scp.upload!("www/dist", "/var/www", { :recursive => true, :verbose => true }) do |ch, name, sent, total|
      puts "#{name}: #{sent}/#{total}"
    end
  end
end

#deploy to production server
desc "Deploy .htaccess to production server"
task :deploy_htacess => :build do
  require 'net/ssh'
  require 'net/scp'

  server = 'dev.myappmatrix.com'
  login = 'jonnie'

  Net::SSH.start(server, login, :password => "fred3212") do |ssh|
  #Upload root .htaccess file
    ssh.scp.upload!(".htaccess", "/var/www", { :recursive => true, :verbose => true }) do |ch, name, sent, total|
      puts "#{name}: #{sent}/#{total}"
    end
  end
end