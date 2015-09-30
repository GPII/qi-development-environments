This README assumes that you are starting development of a new Node.js project. The ``provisioning/vars.yml`` file contains three variables that need to be defined in order to boot a barebones Node.js VM. Those variables with example values are:

* nodejs_app_name: hello-world
* nodejs_app_git_clone: false
* nodejs_app_install_dir: /home/vagrant

There are detailed comments provided in the ``vars.yml`` file. The most significant variable is ``nodejs_app_name`` and it's pretty much the only one that needs to be changed. ``nodejs_app_git_clone`` and ``nodejs_app_install_dir`` should be left as-is with their defaults.

The remaining file has additional variables that are commented out. As development progresses they can be set and uncommented. You will need to use the ``vagrant provision`` command after saving your changes for them to take affect.

Once you have a ``package.json`` file with npm dependencies defined you can include:

    nodejs_app_commands:
      - npm install

With that change in place ``vagrant provision`` will cause that list of commands (in this case just ``npm install``) to be executed in the VM.

After creating an ``index.js`` file (or whatever you would like to call your script) you can uncomment the following:

    nodejs_app_start_script: index.js
    nodejs_app_dev_env: true

Once again you will need to run ``vagrant provision`` which will now pass your script as an argument to [nodemon](https://github.com/remy/nodemon) which will restart the Node.js process when filesystem changes are detected. This should be used in conjunction with ``vagrant rsync-auto`` so that your changes are propagated to the VM.

