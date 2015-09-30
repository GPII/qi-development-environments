# Quality Infrastructure Development Environments

This repository contains tools that can automatically provision a standardized development environment. Using these tools also ensures that the Prosperity4All Quality Infrastructure can automatically build and test your software. With this approach it is possible to:

* Spin up VMs containing application stacks using simple commands
* Sync file system changes from your operating system (also referred to as 'the host') to the VM so native development tools like editors and IDEs can be used
* Forward ports programmatically from the host to the VM
* Define entire development environments alongside application source code
* Treat VMs as disposable development or test environments since they can be reprovisioned with minimal effort
* Utilize [CentOS](https://github.com/idi-ops/packer-centos) and [Fedora](https://github.com/idi-ops/packer-fedora) VMs that are kept upto date with security patches by the Inclusive Design Institute

## Requirements

The following software needs to be installed on the host OS:

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)
* Rsync
* OpenSSH client

## Contents

Each subdirectory contains a [Vagrantfile](http://docs.vagrantup.com/v2/vagrantfile/) and a ``provisioning`` directory. The directory contains the following files:

* ``playbook.yml`` - an [Ansible playbook](http://docs.ansible.com/ansible/playbooks.html) that orchestrates the provisioning process
* ``requirements.yml`` - specifies the [Ansible roles](http://docs.ansible.com/ansible/playbooks_roles.html) that the playbook requires
* ``vars.yml`` - a list of variables used by the playbook, this is the only file that needs to be modified to get started

Currently only Node.js applications are supported. To get started you should copy the contents of the ``nodejs`` directory (excluding the README) to the top-level of your application's source code tree. You will want to edit the ``provisioning/vars.yml`` file. With these changes in place you can type ``vagrant up`` in the location where you copied the ``Vagranfile`` to which will boot the VM. 

## Notable Vagrant Commands

While the [Vagrant web site](https://docs.vagrantup.com/v2/cli/index.html) provides extensive documentation these are the bare minimum commands that you should ideally be familiar with:

* ``vagrant up`` - start up a new (provisioning takes place when starting new VMs) or stopped VM
* ``vagrant provision`` - trigger the provisioning process again at any given time
* ``vagrant rsync-auto`` - watch for host file system changes within the project directory and sync them to the VM
* ``vagrant ssh`` - log into the VM using SSH
* ``vagrant status`` - verify whether the VM has been provisioned once, if it's running, or stopped
* ``vagrant halt`` - stop the VM
* ``vagrant destroy`` - delete the VM altogether

For convenience sake it is suggested that the following shell aliases get added to your ``~/.bashrc`` or ``~/.zshrc`` file:

    alias vup="vagrant up"
    alias vpr="vagrant provision"
    alias vrs="vagrant rsync-auto"
    alias vss="vagrant ssh"
    alias vst="vagrant status"
    alias vha="vagrant halt"

