# Angular CMS 
This is a lightweight CMS built with Angular.js, Twitter Bootstrap and Node.js.

## Documentation
Follow these steps when adding features to this project.

1. **Textual scenario** - Each story will have a textual scenario that describes what should occur.
2. **GUI mock-up** - Visual mock-ups of the story will show how the UI should look. 
3. **Storyboard** - Along with the mock-ups, steps in the process will make up a storyboard. 
4. **Class diagram** - Diagrams of how modules should be constructed.
5. **Algorithm design** - Textual algorithm design will explain how the implementation should work.
6. **Implementation** - The actual development of the code will take place.
7. **Testing** - Unit and e2e testing will then verify the implementation of the story. 

##Authentication System

####  Story: User Login
As a admin I want to have user authentication for accessing the data.

**Scenario:**
Tom goes to the local farmers market to sell his products. Tom uses angular-cms to manage his sales and employees, he wants to user authentication to administor his content.

1. Tom sells a burger for $10, Tom needs to add the sale to his records.  
* Tom opens his tablets web browser and enters the url of his cms, clicks the sign in link and is presented with a login form.
* Tom enters his email and password then clicks the login button.
* Tom is then directed to the Dashboard to add the sale. 

**GUI Mock-up**: 
The following is a mock-up created from visualizing the scenario above.

![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-login.png)


**Storyboard:**

1. Enter valid user email address.
2. Enter user password.
3. Select "Stay signed in" checkbox.
4. Click "Sign in" button.
5. **Success** - Dashboard should appear after successful authentication
6. **Fail** - Alert dialog should appear stating the issue.


####Story: User Registration


**Scenario:**
Tom has hired a new employee Joe, to help manage the sales of Tom’s products. Tom uses a CMS to manage his employees sales.

1. Joe needs to register his credentials  so he can add new sales to Tom’s records.
* Joe opens his tablets web browser and enters the url of the cms, clicks the sign up link and is presented with a registration form.
* Joe enters his email and password, agrees to the terms then clicks the register button.
* Joe is then redirected back to the cms login page to sign in.


##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-register.png)





#### Story: Forgot Password
Tom’s new employee Joe just sold a burger for $10, he needs to login to the CMS to add his sale.

##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.

![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-forgotpassword.png)

**Storyboard:**

1. Joe needs to reset his password so he can add the new sale to Tom’s records.
* Joe opens his tablets web browser and enters the url of the cms, clicks the sign in link and is presented with a login form, but Joe forgot his password. He clicks the forgot password link and is presented with a reset password form.
* Joe enters his email and clicks the reset button.
* Joe is then presented with a message to check his email and follow the reset instructions.



#### Story: Reset Password
Tom’s new employee Joe receives an email to reset his password for the CMS.

##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.

![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-resetpassword.png)

**Storyboard:**

1. Joe clicks the link in his email and his web browser opens and is presented with a reset password form.
* Joe verifies his email matches the email input, then enters his new password twice to ensure they match.
* Joe then clicks the update button to save his new password.
* Joe is then directed to the CMS sign in page to login with his new credentials.



#### Scenario - Dashboard View
Tom wants to login to his CMS and see a dashboard with the daily/weekly/monthly/yearly sales, he also wants to be able to quickly add a product to his catalog. He also wants a quick way to input a new sale. He also wants to be notified if a sale is incoming so he can start to process the orders.


##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-dashboard.png)



#### Story - User Management
Tom wants to manage all of his employees information and sales, so all of Toms employees must register a new account so they can enter information, Tom wants to allow manager employees to have admin rights of content, but other employees just to be members who can only add sales. He wants to be able to manage all of the users in his CMS.


##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-users.png)



![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-users-add.png)


## Epic: Plugin Enabled


#### Story - Media
As a admin I want to upload media, and be able to choose from exisiting media when creating content, I want to be able to upload multiple files by drag and drop.


##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-media.png)


**Model:**

```
  defaults: 
    title:string
    size:int
    path:string
    url:string
    mimetype:string
```

**View:**

 * role - admin
 * route - #/admin/media
  * file - /views/admin/media.html 

**Controller:**

```
 $scope:
  uploaded:[] - Holds current uploaded files
  files:[] - Holds current pending files
  upload:(file) - Starts a upload
  deleteUpload:(file) - Removes a file from uploaded files.
  deleteFile:(file) - Removes a file from pending files
  clearFiles() - Removes all files from pending files.
  clearUploads - Removes all files from uploaded files
  isUploading:boolean - Whether or not a file is being uploaded.
```





#### Story - Plugins
As a user of the CMS being able to install and manage plugins that add aditional functionality to the CMS is required. 



##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-plugins.png)

##### Plugin Structure
This is the structure of a plugin.

	my-plugin/
		package.json
		bower.json
		my-plugin.css
		my-plugin.js
		index.html
		partials/
			header.html
			sidebar.html
			footer.html
			content.html
		


#### Scenario - Widgets
As a user of the CMS I want to be able to add widgets to pages of my website. I want to be able to add widgets to the dashboard as well, and enable which type of user can view those widgets.


##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-widgets.png)


#### Story - Themes
As a admin of the CMS I want to be able to change the public theme, I want to install themes and activate them.


##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-themes.png)

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
		


#### Story - Settings
As a admin of the CMS I want to configure global settings, view database stats, change api and cdn locations and adjust time and date formats.


##### GUI Mock-up
The following is a mock-up created from visualizing the scenario above.
![image](https://dl.dropboxusercontent.com/u/26906414/angular-cms/docs/cms-settings.png)



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
POST /api/v2/angular-cms/users/register HTTP/1.1
Host: localhost:8181
Content-Type: application/json

{ 
 "email": "jonniedollas@email.com", 
 "password": "fred", 
 "metadata": { "avatar": "", "name": "Jonnie Dollas" } 
}
```

**Response:**


```
{
    "email": "jonniedollas@email.com",
    "password": "fred",
    "metadata": {
        "avatar": "",
        "name": "Jonnie Dollas"
    }
}

```



#### Get Users

	GET /api/v2/angular-cms/users HTTP/1.1
	Host: localhost:8181
	Cache-Control: no-cache
	Postman-Token: 2d8327e9-bf4d-7425-04d6-677da2b67673


### Create User

	POST /api/v2/angular-cms/users HTTP/1.1
	Host: localhost:8181
	Content-Type: application/json
	
	{"id":0,"email":"","password":"","active":false,"groups":"visitor","_activation":"","_key":"","created":"2013-11-19T03:31:18.934Z","modified":"2013-11-19T03:31:18.934Z","metadata":{"avatar":"","name":"Joe User"}}



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




http://exacttarget.github.io/fuelux/#datagrid


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
This is a lightweight CMS built with Angular.js, Twitter Bootstrap and Node.js.


## Documentation
_(Coming soon)_

Current work in progress diagrams.

 


#### 1.  Scenario: CMS Login

* **Start**: Tom goes to the local farmers market to sell his products. Tom uses a CMS to manage his sales.
* **Step 1**: Tom sells a burger for $10, Tom needs to add the sale to his records.  
* **Step 2**: Tom opens his tablets web browser and enters the url of his cms, clicks the sign in link and is presented with a login form.
* **Step 3**: Tom enters his email and password then clicks the login button.
* **Step 4**: Tom is then directed to the Dashboard to add the sale. 


#### 2. Scenario: CMS Registration

* Start: Tom has hired a new employee Joe, to help manage the sales of Tom’s products. Tom uses a CMS to manage his employees sales.
* Step 1: Joe needs to register his credentials  so he can add new sales to Tom’s records.
* Step 2: Joe opens his tablets web browser and enters the url of the cms, clicks the sign up link and is presented with a registration form.
* Step 3: Joe enters his email and password, agrees to the terms then clicks the register button.
* Step 4: Joe is then redirected back to the cms login page to sign in.


#### 3. Scenario: CMS Forgot Password

* Start: Tom’s new employee Joe just sold a burger for $10, he needs to login to the CMS to add his sale.
* Step 1: Joe needs to reset his password so he can add the new sale to Tom’s records.
* Step 2: Joe opens his tablets web browser and enters the url of the cms, clicks the sign in link and is presented with a login form, but Joe forgot his password. He clicks the forgot password link and is presented with a reset password form.
* Step 3: Joe enters his email and clicks the reset button.
* Step 4: Joe is then presented with a message to check his email and follow the reset instructions.


#### 4. Scenario: CMS Reset Password

* Start: Tom’s new employee Joe receives an email to reset his password for the CMS.
* Step 1: Joe clicks the link in his email and his web browser opens and is presented with a reset password form.
* Step 2: Joe verifies his email matches the email input, then enters his new password twice to ensure they match.
* Step 3: Joe then clicks the update button to save his new password.
* Step 4: Joe is then directed to the CMS sign in page to login with his new credentials.


#### 5. Scenario - CMS Dashboard






View

 role - admin
 route - #/admin/dashboard
 file - /views/admin/dashboard.html



#### Scenario - Media


**Model:**

```
  defaults: 
    title:string
    size:int
    path:string
    url:string
    mimetype:string
```

**View:**

 * role - admin
 * route - #/admin/media
  * file - /views/admin/media.html 

**Controller:**

```
 $scope:
  uploaded:[] - Holds current uploaded files
  files:[] - Holds current pending files
  upload:(file) - Starts a upload
  deleteUpload:(file) - Removes a file from uploaded files.
  deleteFile:(file) - Removes a file from pending files
  clearFiles() - Removes all files from pending files.
  clearUploads - Removes all files from uploaded files
  isUploading:boolean - Whether or not a file is being uploaded.
```


## Getting Started

Download the [production version][min] or the [development version][max].






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
 