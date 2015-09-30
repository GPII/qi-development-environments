# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

ansible_vars = YAML.load_file('provisioning/vars.yml')

# By default this VM will use 1 processor core and 1GB of RAM. The 'VM_CPUS' and
# "VM_RAM" environment variables can be used to change that behaviour.
CPUS = ENV["VM_CPUS"] || 1
RAM = ENV["VM_RAM"] || 1048

# Check for the existence of 'VM_HOST_TCP_PORT' or 'VM_GUEST_TCP_PORT'
# environment variables. Otherwise if 'nodejs_app_tcp_port' is defined
# in vars.yml then use that port. Failing that use defaults provided
# in this file.
HOST_TCP_PORT = ENV["VM_HOST_TCP_PORT"] || ansible_vars["nodejs_app_tcp_port"] || 8080
GUEST_TCP_PORT = ENV["VM_GUEST_TCP_PORT"] || ansible_vars["nodejs_app_tcp_port"] || 8080

Vagrant.configure(2) do |config|

  config.vm.box = "inclusivedesign/centos7"

  # Port forwarding takes place here. The 'guest' port is used inside the VM
  # whereas the 'host' port is used by your host operating system.
  config.vm.network "forwarded_port", guest: GUEST_TCP_PORT, host: HOST_TCP_PORT, protocol: 'tcp',
    auto_correct: true

  # Your working directory will be synced to /home/vagrant in the VM. The
  # 'node_modules' directory is excluded from the sync but 'gpii/node_modules'
  # specifically is included due to the fact that GPII Universal uses this
  # convention:
  # https://github.com/GPII/universal/tree/master/gpii/node_modules
  config.vm.synced_folder ".", "/home/vagrant", type: "rsync",
    rsync__exclude: [".git/", "node_modules/"],
    rsync__args: ["--verbose", "--archive", "-z", "--copy-links", "--include=gpii/node_modules/"]

  config.vm.provider :virtualbox do |vm|
    vm.customize ["modifyvm", :id, "--memory", RAM]
    vm.customize ["modifyvm", :id, "--cpus", CPUS]
  end

  # The ansible-galaxy command assumes a git client is available in the VM, the
  # inclusivedesign/centos7 Vagrant box includes one.
  config.vm.provision "shell", inline: <<-SHELL
    sudo ansible-galaxy install -fr /home/vagrant/provisioning/requirements.yml
    sudo PYTHONUNBUFFERED=1 ansible-playbook /home/vagrant/provisioning/playbook.yml --tags="install,configure,deploy"
  SHELL

end
