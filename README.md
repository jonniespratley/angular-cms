# Angular CMS
<<<<<<< HEAD
This is a boilerplate CMS built with Angular, Twitter Bootstrap and Node; it is in development stage and aims to offer a quick start for creating full-stack angular application.


## Getting Started

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
=======
This is a lightweight CMS built with Angular.js, Twitter Bootstrap and Node.js.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jonniespratley/angular-cms/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![Build Status](https://travis-ci.org/jonniespratley/angular-cms.png)](https://travis-ci.org/jonniespratley/angular-cms)

This is a lightweight CMS built with Angular.js, Twitter Bootstrap and Node.js.

The purpose of this CMS is for many reasons, the most important reason is this is the CMS that the Learning Yeoman book is going to revolve around.
The book is going to be published during the 1st quarter of the new year by Packt Publishing. Each piece has to do with a corresponding chapter in the book that I am writing.



## Features


### Database
The database of choice is Mongo, its fast, easy and scalable.

### Server
The server of choice is Node, its JavaScript, its fast and scalable.

### AngularJS 
The client-side framework of choice is Angular, its a full-stack, just what we need.

### Responsive
The client-side ui of choice is Twitter Bootstrap, its updated and clean.

### HTML5
Using HTML5 in every way to make a better user experience.

### Customizable
Using a modular approach you can easily extend the core to your application.



_(Coming soon)_











## Server
The server is a Node.js server that supports dynamic RESTful API calls to resource endpoints.

Base URL: `http://localhost:8181/api/v2`


HTTP  | METHOD | ENDPOINT
>>>>>>> b6e9992bc764ecfd6179bf6aecc046e0decf7b71
------------ | ------------- | ------------
 GET   |   findAll     |   /database/table
 GET   |   findById    |   /database/table/:id
 POST  |   add         |   /database/table
 PUT   |   update      |   /database/table/:id
 DELETE |  destroy     |   /database/table/:id

<<<<<<< HEAD


### Step 3 - Start developing
Then for development use grunt to serve up a dev server that uses a proxy to route all requests to the API server.

    $ grunt serve

> Your browser should open up displaying the main page.
       
 
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/images/127_0_0_1__full.png)
=======
### Socket Server
This is a socket server implementation for "real" time analytics and other data.
This is for use with geo analytics and other backend data from the app. listen for connected clients

### Socket Server Channels
These are the events that this socket server dispatches.


1. cms:authorization
2. cms:client:message
3. cms:client:connect
4. cms:client:disconnect
5. cms:server:message
6. cms:server:disconnect
7. cms:server:connect
8. cms:






### Must Have
* user management & user roles
* action and view permissions
* content versioning and audit
* some form of workflow and notifications
* i18n support on literals and object versions
* normalized database schema design
* some form of content import-export
* assets management and thumbnail generation for uploads
* Valid XHTML (compressed with GZIP)
* Rich text editing (e.g FCKeditor) which generates accessible markup
* Valid and minified CSS and javascript (e.g using YUI)
* automatically generated sitemaps.org document
* integration with Google Analytics
* automatic RSS feeds
* open search support
* print css and/or print versions of content
* SEO consideration for duplicate content (e.g use of canonical tag)




## Getting Started

Download the [production version][min] or the [development version][max].


### Start the server
To start the node server you should start the mongo instance first. 

To start mongodb execute the following command:

	$ sudo sh ./bin/db.sh
	
To start node execute the following command:

	$ node server
	
Open up the default host localhost:8181



_(Coming soon)_

## Documentation
_(Coming soon)_


### Themes
Themes will be installed via bower, we will have a ui for searching and installing angular-cms themes searching by tag angular-cms.

##### Theme Structure
This is the structure of the themes.

	my-theme/
		package.json
		bower.json
		css/
			my-theme.css
		js/
			my-theme.js
		index.html
		partials/
			header.html
			sidebar.html
			footer.html
			content.html
		



### Plugins
Plugins will be installed via bower as well, keywords angular-cms.







## Examples
_(Coming soon)_

>>>>>>> b6e9992bc764ecfd6179bf6aecc046e0decf7b71


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
<<<<<<< HEAD
=======
 
>>>>>>> b6e9992bc764ecfd6179bf6aecc046e0decf7b71
