grunt-require-jasmine-sinon skeleton
====================================
This respository is just a skeleton to make it easier to get started with a new project using grunt, coffeescript, requirejs and jasmine. It provides a common configuration, some common jasmine matchers, and a few other conveniences. Much thanks to the talented [Gabriel Hernandez](https://github.com/webspinner) for most of the heavy lifting.

Instructions
------------
 1. Edit package.json to reflect your project details and dependencies
 1. Edit bower.json to reflect your project details and dependencies
 1. Delete the example PROJECT_NAME symlink by running `rm -f PROJECT_NAME` from the project root
 1. Create a symlink in the project root that points to src-cov with the bower name of this project
     ln -s ./src-cov PROJECT_NAME
 1. Update coffee/src/main.coffee PROJECT_NAME to your project name
 1. Update this README.md

Usage
-----
  * Write coffeescript in /coffee/src
  * Write coffeescript unit tests in /coffee/spec
  * Write javascript in /src
  * Write javascript unit tests in /spec
  * Unit tests must be suffixed with .spec before the file extension.
    * In /coffee/spec: `/coffee/spec/filename.spec.coffee`
    * In /spec: `/spec/filename.spec.js`

NOTE: Files in coffee/ will be compiled and placed into /src - If a filename collision occurs, the file in /src will be overwritten with the compiled file from /coffee/src

RequireJS
---------
For this application structure it is recommended to always refer to your local dependencies via requirejs using your PROJECT_NAME as the prefix. eg, `require "some/thing"` should be `require "PROJECT_NAME/some/thing"`. This allows your project to become more portable when included in upstream projects by allowing the upstream developer to simply add a line to their requirejs paths pointing to your src dir with PROJECT_NAME.

<!-- Remove everything above this line once your repository is properly configured -->

PROJECT NAME
============

```bash
npm install
./node_modules/.bin/bower install
./node_modules/.bin/grunt
```

You can then navigate to http://localhost:9001 and view the tests there or see them run in the console.
