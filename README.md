# Quality Infrastructure Development Environments

This repository contains tools that can automatically provision a standardized development environment. Using these tools also ensures that the Prosperity4All Quality Infrastructure can automatically build and test your software. With this approach it is possible to:

* Easily spin up upto date [CentOS](https://github.com/idi-ops/packer-centos), [Fedora](https://github.com/idi-ops/packer-fedora), and [Windows](https://github.com/idi-ops/packer-windows) VMs using simple commands to create disposable development and test environments
* Sync file system changes from your operating system (also referred to as 'the host') to the VM so native development tools like editors and IDEs can be used
* Forward ports from the host to the VM to communicate with services being developed
* Run your automated web accessibility tests using tools such as Selenium WebDriver

## Requirements

The following software needs to be installed on the host OS:

* [VirtualBox 5.0.x](https://www.virtualbox.org/wiki/Download_Old_Builds_5_0) (Avoid 5.1.x releases as [they are currently not reliable](https://www.virtualbox.org/query?version=VirtualBox+5.1.0&version=VirtualBox+5.1.2&version=VirtualBox+5.1.4&col=id&col=summary&col=status&col=owner&col=type&col=priority&col=component&order=priority))
* [Vagrant](https://www.vagrantup.com/downloads.html) 1.9.2 or newer
* [Vagrant GPII CI plugin](https://github.com/amatas/vagrant-gpii-ci)
* OpenSSH client

**Note:** Windows host support was tested using a [Cygwin](https://cygwin.com) shell after having performed the following tasks:

* Installed OpenSSH using Cygwin
* Made sure the Windows firewall was not restricting Vagrant or VirtualBox

## Getting Started

 A [.vagrant.yml](https://github.com/amatas/vagrant-gpii-ci#virtual-machines-definition) configuration file defines what type of environment is to be created and the CI jobs to run within it. The file should reside in the top level of project repositories and possibly also a ``provisioning`` directory containing build scripts that could be executed in VMs. Please refer to the ``linux`` and ``windows`` directories in this repository for examples of how to configure VMs to automate web accessibility tests.

With the appropriate configuration in place the following commands will create an environment, provision it, and carry out any CI jobs within it:

```
vagrant up
vagrant ci test
```

## Notable Vagrant Commands

While the [Vagrant web site](https://docs.vagrantup.com/v2/cli/index.html) provides extensive documentation these are the bare minimum commands that one should ideally be familiar with:

* ``vagrant up`` - start up a new
* ``vagrant ci test`` - provision the VM and trigger CI stages
* ``vagrant ssh`` - log into the VM using SSH
* ``vagrant status`` - verify whether the VM has been provisioned once, if it's running, or stopped
* ``vagrant halt`` - stop the VM
* ``vagrant destroy`` - delete the VM altogether and reclaim storage space
* ``vagrant box update`` - Vagrant boxes are disk images that serve as templates for VMs, this command downloads a newer version of a previously downloaded box 

## Automated Accessibility Tests

The VMs created using these tools can aide the development of a diverse type of projects. This section will cover aspects of using VMs to automate web accessibility tests. 

### Tools Used for Automating Tests

The examples in the ``linux`` and ``windows`` directories use the following software to test [content provided by the W3C](https://www.w3.org/WAI/demos/bad/Overview.html):

* [Selenium WebDriver](https://github.com/SeleniumHQ/selenium)
* [aXe WebDriverJS](https://github.com/dequelabs/axe-webdriverjs)
* Google Chrome

While the examples use [Mocha](https://mochajs.org/) any test framework such as [QUnit](https://qunitjs.com/) or [Jasmine](https://jasmine.github.io/) can be used to achieve the same results. [Infusion](https://github.com/fluid-project/infusion/) based projects can employ [jqUnit](http://docs.fluidproject.org/infusion/development/jqUnit.html) and [gpii-webdriver](https://github.com/GPII/gpii-webdriver/).

### Run Tests

Navigating to either of the directories and typing the ``vagrant up`` and ``vagrant ci test`` commands will start the tests and report results. Google Chrome will be launched before each test, content will be loaded, and the aXe engine will be used to audit the user interface.

These types of tests can be run as often as needed to test the accessibility of user interfaces as an application or document is being developed.

### Resources

To learn more about automated accessibility tests and using the WebDriver API to interact with UIs please refer to the following resources:

* [Selenium Webdriver documentation](http://seleniumhq.github.io/selenium/docs/api/javascript/)
* [JavaScript with Selenium WebDriver and Mocha](http://testerstories.com/2016/02/javascript-with-selenium-webdriver-and-mocha/)
* [Accessibility Testing with axe-core and WebdriverJS](https://www.youtube.com/watch?v=1QAvRJM-zR8)
