# Angular CMS 

[![Build Status](https://travis-ci.org/jonniespratley/angular-cms.png)](https://travis-ci.org/jonniespratley/angular-cms)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

This is a lightweight CMS built with Angular.js, Twitter Bootstrap and Node.js.







## Getting Started

Download the [production version][min] or the [development version][max].


### Start the server
To start the node server you should start the mongo instance first. 

To start mongodb execute the following command:

	$ sudo sh ./bin/db.sh
	
To start node execute the following command:

	$ node server
	
Open up the default host localhost:8181

## RESTful Server
The server is a Node.js server that supports dynamic RESTful API calls to resource endpoints.

Base URL: `http://localhost:8181/api/v2`

#### Routes

HTTP  | METHOD | ENDPOINT
------------ | ------------- | ------------
 GET   |   findAll     |   /database/table
 GET   |   findById    |   /database/table/:id
 POST  |   add         |   /database/table
 PUT   |   update      |   /database/table/:id
 DELETE |  destroy     |   /database/table/:id
 
 
 
 
#### Login
This is an example request to authenticate against the default database.users collection.

Default users created are: 

**Superadmin** - Access to everything. 

* **email:** superadmin@email.com 
* **pass:** admin1234


**Admin** - Access to manage users, etc.. 

* **email:** admin@email.com 
* **pass:** admin1234


**Request:**

	POST /api/v2/angular-cms/users/login HTTP/1.1
	Host: localhost:8181
	Content-Type: application/json
	
	{ "email": "admin@email.com", "password": "admin1234" }
 
 
 **Response:**
 
	{
	    "status": true,
	    "results": {
	        "user": {
	            "_activation": "",
	            "_id": "52b25f190364e61067660a24",
	            "_key": "",
	            "active": true,
	            "created": "2013-11-19T03:31:18.934Z",
	            "email": "admin@email.com",
	            "groups": "admin",
	            "id": 0,
	            "metadata": {
	                "avatar": "",
	                "name": "Joe User"
	            },
	            "modified": "2013-11-19T03:31:18.934Z",
	            "password": "b7aa9e253f709fb3710fe05300d3056186ce92f7"
	        }
	    }
	} 



#### Register
This is an example request to register a user with the default database.users collection.
Passwords are hashed in SHA1 against configurations salt.

**Request:**

```
..
```

**Response:**


```

..

```


## Socket Server
This is a socket server implementation for "real" time analytics and other data.
This is for use with geo analytics and other backend data from the app. listen for connected clients

#### Socket Server Channels
These are the events that this socket server dispatches.


1. cms:authorization
2. cms:client:message
3. cms:client:connect
4. cms:client:disconnect
5. cms:server:message
6. cms:server:disconnect
7. cms:server:connect
8. cms:


_(Coming soon)_

## Documentation
_(Coming soon)_

Current work in progress diagrams.

![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/set.png)
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/set-1.png)
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/set-2.png)






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
 