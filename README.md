# Angular CMS
This is a boilerplate CMS built with Angular, Twitter Bootstrap and Node; it is in development stage and aims to offer a quick start for creating full-stack angular application.


## Getting Started
Download the [production version][min] or the [development version][max].

**TODO: Include module builds**


###Step 1 - Start mongodb
To start mongodb execute the following command:

	$ sudo sh ./bin/db.sh

###Step 2 - Start node server
To start node execute the following command:

	$ node server

Open up the default host localhost:8181


#### REST API
The server supports dynamic REST API calls to a resource endpoint.

Endpoint: `http://localhost:8181/api/v2`

METHOD  | ACTION | ROUTE
------------ | ------------- | ------------
 GET   |   findAll     |   /database/table
 GET   |   findById    |   /database/table/:id
 POST  |   add         |   /database/table
 PUT   |   update      |   /database/table/:id
 DELETE |  destroy     |   /database/table/:id



### Step 3 - Start developing
Then for development use grunt to serve up a dev server that uses a proxy to route all requests to the API server.

    $ grunt serve

> Your browser should open up displaying the main page.
       
 
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/images/127_0_0_1__full.png)


# Contributing

## Important notes
Please don't edit files in the `dist` subdirectory as they are generated via Grunt. You'll find source code in the `src` subdirectory!

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

### PhantomJS
While Grunt can run the included unit tests via [PhantomJS](http://phantomjs.org/), this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI and Bower are installed by running `grunt --version` and `bower --version`.  If the commands aren't found, run `npm install -g grunt-cli bower`.  For more information about installing the tools, see the [getting started with Grunt guide](http://gruntjs.com/getting-started) or [bower.io](http://bower.io/) respectively.

1. Fork and clone the repo.
1. Run `npm install` to install all build dependencies (including Grunt).
1. Run `bower install` to install the front-end dependencies.
1. Run `grunt` to grunt this project.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
1. Fix stuff.
1. Run `grunt` to see if the tests pass. Repeat steps 2-4 until done.
1. Open `test/*.html` unit test file(s) in actual browser to ensure tests pass everywhere.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.
